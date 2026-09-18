import { Router, type Response } from "express";
import {
  addAssigneeDB,
  createTicketDB,
  deleteTicketDB,
  getTicketByIdDB,
  listTicketsDB,
  updateTicketStatusDB,
} from "../db/database.js";
import { validateQuery, validateTicket } from "../utils/validation.js";
import {
  authenticate,
  type AuthRequest,
} from "../middlewares/auth.middleware.js";

const router = Router();

router.use(authenticate);

router.post("/", async (req: AuthRequest, res: Response) => {
  try {
    const error = validateTicket(req.body);
    if (error) {
      return res.status(400).json({ error: error });
    }

    const ticket = await createTicketDB(req.body, req.userId!, req.role!);

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
    const validationResult = validateQuery(req.query);
    if (validationResult.errors.length > 0) {
      return res.status(400).json({ error: validationResult.errors });
    }

    const result = await listTicketsDB(
      validationResult,
      req.userId!,
      req.role!,
    );
    return res.status(200).json({
      data: result.tickets,
      pagination: {
        page: validationResult.page,
        pageSize: validationResult.pageSize,
        total: result.total,
        totalPages: result.totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "failed to fetch tickets" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const ticket = await getTicketByIdDB(Number(req.params.id));

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

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["open", "in_progress", "resolve", "closed"].includes(status)) {
      return res.status(400).json({ error: "invalid status" });
    }

    const ticket = await updateTicketStatusDB(Number(req.params.id), status);

    if (!ticket) {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(200).json({ ticket });
  } catch (error) {
    return res.status(500).json({ message: "failed to update ticket status" });
  }
});

router.patch("/:id/assignee", async (req, res) => {
  try {
    const { assignee } = req.body;
    if (!assignee && typeof assignee !== "string") {
      return res.status(400).json({ error: "invalid assingee" });
    }

    const ticket = await addAssigneeDB(Number(req.params.id), assignee);

    if (!ticket) {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(200).json({ ticket });
  } catch (error) {
    return res.status(500).json({ message: "failed to add assignee" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const success = await deleteTicketDB(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ error: "ticket not found" });
    }

    return res.status(200).json({ message: "ticket deleted" });
  } catch (error) {
    return res.status(500).json({ message: "failed to delete ticket" });
  }
});

export default router;
