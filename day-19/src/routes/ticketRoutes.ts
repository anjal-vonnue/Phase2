import { Router, type Response } from "express";
import {
  addAssigneeDB,
  createTicketDB,
  deleteTicketDB,
  getTicketByIdDB,
  listTicketsDB,
  updateTicketStatusDB,
} from "../db/database.js";
import {
  idSchema,
  ticketQuerySchema,
  ticketSchema,
} from "../utils/validation.js";
import {
  authenticate,
  type AuthRequest,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

/**
 * @openapi
 * /tickets:
 *   post:
 *     summary: Create a ticket
 *     requestBody:
 *      description: ticket creation payload
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - title
 *              - description
 *              - priority
 *            properties:
 *              title:
 *                type: string
 *              description:
 *                type: string
 *              priority:
 *                type: string
 *                enum:
 *                  - high
 *                  - medium
 *                  - low
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Ticket created
 *   get:
 *     summary: List tickets with pagination
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Paginated ticket list
 */
router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const result = ticketSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten(),
      });
    }

    const ticket = await createTicketDB(result.data, req.userId!, req.role!);

    return res.status(201).json({ ticket });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res
        .status(403)
        .json({ message: "you are not allowed to create tickets" });
    }
    return res.status(500).json({ message: "failed to create tickets" });
  }
});

router.get("/", async (req: AuthRequest, res: Response) => {
  try {
    const validationResult = ticketQuerySchema.safeParse(req.query);
    if (!validationResult.success) {
      return res.status(400).json({
        error: validationResult.error.flatten(),
      });
    }

    const result = await listTicketsDB(
      validationResult.data,
      req.userId!,
      req.role!,
    );
    return res.status(200).json({
      data: result.tickets,
      pagination: {
        page: validationResult.data.page,
        pageSize: validationResult.data.pageSize,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch tickets" });
  }
});

/**
 * @openapi
 * /tickets/{id}:
 *   get:
 *     summary: Get a ticket by id
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket found
 */
router.get("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const result = idSchema.safeParse(req.params.id);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten(),
      });
    }

    const ticket = await getTicketByIdDB(result.data, req.userId!, req.role!);

    if (!ticket) {
      return res.status(404).json({ message: "ticket not found" });
    }

    return res.status(200).json({ ticket });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to get the specific ticket" });
  }
});

/**
 * @openapi
 * /tickets/{id}/status:
 *   patch:
 *     summary: Change ticket status
 *     requestBody:
 *      description: update status payload
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - status
 *            properties:
 *              status:
 *                type: string
 *                enum:
 *                  - open
 *                  - closed
 *                  - resolve
 *                  - in_progress
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Status updated
 */
router.patch("/:id/status", async (req: AuthRequest, res: Response) => {
  try {
    const { status } = req.body;
    if (!["open", "in_progress", "resolve", "closed"].includes(status)) {
      return res.status(400).json({ error: "invalid status" });
    }

    const result = idSchema.safeParse(req.params.id);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten(),
      });
    }

    const ticket = await updateTicketStatusDB(
      result.data,
      status,
      req.userId!,
      req.role!,
    );

    return res.status(200).json({ ticket });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res.status(403).json({
        message: "you are not allowed to edit this ticket",
      });
    }

    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(500).json({ message: "failed to update ticket status" });
  }
});

/**
 * @openapi
 * /tickets/{id}/assignee:
 *   patch:
 *     summary: Assign a ticket to an admin or agent
 *     requestBody:
 *      description: add assignee payload
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            required:
 *              - assignee
 *            properties:
 *              assignee:
 *                type: string
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Assignment updated
 */
router.patch("/:id/assignee", async (req: AuthRequest, res: Response) => {
  try {
    const { assignee } = req.body;
    if (!assignee && typeof assignee !== "string") {
      return res.status(400).json({ error: "invalid assingee" });
    }

    const result = idSchema.safeParse(req.params.id);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten(),
      });
    }

    const ticket = await addAssigneeDB(result.data, assignee, req.role!);

    if (!ticket) {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(200).json({ ticket });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res
        .status(403)
        .json({ message: "you are not allowed to assignee tickets" });
    }

    if (error instanceof Error && error.message === "NOT_FOUND") {
      return res.status(404).json({ message: "user not found" });
    }

    return res.status(500).json({ message: "failed to add assignee" });
  }
});

/**
 * @openapi
 * /tickets/{id}:
 *   delete:
 *     summary: Delete a ticket
 *     tags: [Tickets]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Ticket deleted
 */
router.delete("/:id", async (req: AuthRequest, res: Response) => {
  try {
    const result = idSchema.safeParse(req.params.id);
    if (!result.success) {
      return res.status(400).json({
        error: result.error.flatten(),
      });
    }

    const success = await deleteTicketDB(result.data, req.userId!, req.role!);
    if (!success) {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(200).json({ message: "ticket deleted" });
  } catch (error) {
    if (error instanceof Error && error.message === "FORBIDDEN") {
      return res
        .status(403)
        .json({ message: "you are not allowed to delete ticket" });
    }
    return res.status(500).json({ message: "failed to delete ticket" });
  }
});

export default router;
