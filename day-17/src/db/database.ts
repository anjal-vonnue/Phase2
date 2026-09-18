import { UserRole, type TicketStatus } from "../generated/prisma/enums.js";
import type { Priority } from "../types/ticket.js";
import prisma from "./prisma.js";

export async function listTicketsDB(
  validationResult: any,
  userId: number,
  role: UserRole,
) {
  try {
    const {
      page,
      pageSize,
      status,
      priority,
      assignee,
      search,
      sortField,
      sortDirection,
    } = validationResult;

    const where = {
      ...(role === UserRole.customer && { customerId: userId }),
      ...(role === UserRole.agent && {
        assignments: {
          some: {
            userId: userId,
          },
        },
      }),
      ...(status && { status: status }),
      ...(priority && { priority: priority }),
      ...(assignee && {
        assignments: {
          some: { userId: assignee },
        },
      }),
      ...(search && {
        title: {
          contains: search,
          mode: "insensitive",
        },
      }),
    };

    const skip = (page - 1) * pageSize;

    const total = await prisma.ticket.count({
      where: where,
    });

    const tickets = await prisma.ticket.findMany({
      where: where,
      skip: skip,
      take: pageSize,
      orderBy: {
        [sortField]: sortDirection,
      },
    });

    const totalPages = Math.ceil(total / pageSize);

    return {
      total,
      totalPages,
      tickets,
    };
  } catch (error) {
    console.error("ListTicketDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function createTicketDB(
  data: {
    title: string;
    description: string;
    priority: Priority;
    customer_id: number;
    category_id: number;
  },
  userId: number,
  role: UserRole,
) {
  if (role === UserRole.admin || role === UserRole.customer) {
    const ticket = await prisma.ticket.create({
      data: {
        title: data.title,
        description: data.description,
        priority: data.priority,
        customerId: userId,
        categoryId: data.category_id,
      },
    });
    return ticket;
  } else {
    throw new Error("FORBIDDEN");
  }
}

export async function getTicketByIdDB(id: number) {
  try {
    const ticket = await prisma.ticket.findUnique({
      where: { id },
    });
    return ticket;
  } catch (error) {
    console.error("getTicketByIdDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function updateTicketStatusDB(id: number, status: TicketStatus) {
  try {
    const ticket = await prisma.ticket.update({
      where: { id },
      data: {
        status: status,
        updatedAt: new Date(),
      },
    });

    return ticket;
  } catch (error) {
    console.error("updateTicketStatusDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function deleteTicketDB(id: number) {
  try {
    const ticket = await prisma.ticket.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error("deleteTicketDB error: ", error);
    throw new Error("database operation failed");
  }
}

export async function addAssigneeDB(id: number, assignee: string) {
  try {
    const user = await prisma.user.findFirst({
      where: { name: assignee },
    });

    if (!user) {
      throw new Error("user not found");
    }
    const assignment = await prisma.assignment.create({
      data: {
        ticketId: id,
        userId: user.id,
      },
    });
    return assignment;
  } catch (error) {
    console.error("addAssigneeDB error: ", error);
    throw new Error("database operation failed");
  }
}
