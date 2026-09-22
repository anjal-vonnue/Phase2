import express from "express";
import router from "./routes/ticketRoutes.js";
import authRoute from "./module/auth/auth.route.js";
import userRoute from "./module/me/me.route.js";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import prisma from "./db/prisma.js";
import {
  requestIdMiddleware,
  type IdRequest,
} from "./middlewares/requestId.middleware.js";
import morgan from "morgan";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { logger } from "./utils/logger.js";
import { pinoHttp } from "pino-http";

const app = express();

const swaggerSpec = swaggerJsdoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Ticket Management",
      version: "1.0.0",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
  },
  apis: ["src/module/**/*.ts", "src/routes/**/*.ts"],
});

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  message: "too many request form this ip, please try again after 15 min",
  standardHeaders: "draft-7",
  legacyHeaders: false,
});

const authLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 5,
  message: "too many authentication attempts, please try again in an hour",
});

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(limiter);
app.use(requestIdMiddleware);
// app.use(morgan("dev"));

app.use(
  pinoHttp({
    logger,

    serializers: {
      req: (req) => {
        return {
          method: req.method,
          url: req.url,
          requestId: req.raw.requestId,
        };
      },
      res: (res) => ({
        statusCode: res.statusCode,
      }),
    },
  }),
);

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/tickets", router);
app.use("/auth", authLimiter, authRoute);
app.use("/me", userRoute);
app.use("/health", async (_request, response, next) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    response.json({
      status: "ok",
      database: "connected",
    });
  } catch (error) {
    response.status(500).json({ message: "database not connected" });
  }
});

app.use(
  (
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.status(404).json({
      error: {
        code: "NOT_FOUND",
        message: "route not found",
      },
    });
  },
);

export default app;
