import { Router } from "express";
import {
  addAssignee,
  deleteTicket,
  validateTicket,
} from "../services/ticketServices.js";
import {
  createTicketDB,
  deleteTicketDB,
  getTicketByIdDB,
  listTicketsDB,
  updateTicketStatusDB,
} from "../db/database.js";

const router = Router();

router.post("/tickets", async (req, res) => {
  try {
    const error = validateTicket(req.body);
    if (error) {
      res.status(400).json({ error: error });
    }

    const ticket = await createTicketDB(req.body);

    res.status(201).json({ ticket });
  } catch (error) {
    res.status(500).json({ message: "failed to create tickets" });
  }
});

router.get("/tickets", async (req, res) => {
  try {
    const tickets = await listTicketsDB();
    res.status(200).json(tickets);
  } catch (error) {
    res.status(500).json({ message: "failed to fetch tickets" });
  }
});

router.get("/tickets/:id", async (req, res) => {
  try {
    const ticket = await getTicketByIdDB(Number(req.params.id));

    if (!ticket) {
      return res.status(404).json({ message: "ticket not found" });
    }

    return res.status(200).json(ticket);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "failed to get the specific ticket" });
  }
});

router.patch("/tickets/:id/status", async (req, res) => {
  try {
    const { status } = req.body;
    if (!["open", "in-progress", "resolved", "closed"].includes(status)) {
      res.status(400).json({ error: "invalid status" });
    }

    const ticket = await updateTicketStatusDB(Number(req.params.id), status);

    if (!ticket) {
      res.status(404).json({ error: "ticket not found" });
    }

    res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "failed to update ticket status" });
  }
});

// need to change
router.patch("/tickets/:id/assignee", async (req, res) => {
  const { assignee } = req.body;
  if (!assignee && typeof assignee !== "string") {
    res.status(400).json({ error: "invalid assingee" });
  }

  const ticket = await addAssignee(Number(req.params.id), assignee);

  if (!ticket) {
    res.status(404).json({ error: "ticket not found" });
  }

  res.status(200).json(ticket);
});

router.delete("/tickets/:id", async (req, res) => {
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
