import "dotenv/config";
import {
  PrismaClient,
  TicketPriority,
  TicketStatus,
} from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const users = await prisma.user.createManyAndReturn({
    data: [
      { name: "Anjal", email: "anjal@vonnue.com" },
      { name: "Yasin", email: "yasin@vonnue.com" },
      { name: "Chirsto", email: "christo@vonnue.com" },
    ],
  });

  const customers = await prisma.customer.createManyAndReturn({
    data: [
      { name: "Gauresh", email: "gauresh@vonnue.com" },
      { name: "Akshay", email: "akshay@vonnue.com" },
      { name: "Hawas", email: "hawas@vonnue.com" },
    ],
  });

  const categories = await prisma.category.createManyAndReturn({
    data: [{ name: "Technical" }, { name: "Billing" }, { name: "Account" }],
  });

  const tickets = await prisma.ticket.createManyAndReturn({
    data: [
      {
        customerId: customers[0].id,
        categoryId: categories[0].id,
        title: "login problem",
        description: "cannot login",
        priority: TicketPriority.high,
        status: TicketStatus.open,
      },
      {
        customerId: customers[1].id,
        categoryId: categories[1].id,
        title: "wrong invoice",
        description: "invoice amount is incorrect",
        priority: TicketPriority.high,
        status: TicketStatus.in_progress,
      },
      {
        customerId: customers[2].id,
        categoryId: categories[2].id,
        title: "update account",
        description: "need to update the account details",
        priority: TicketPriority.low,
        status: TicketStatus.resolve,
      },
      {
        customerId: customers[0].id,
        categoryId: categories[0].id,
        title: "api error",
        description: "api returns 500",
        priority: TicketPriority.low,
        status: TicketStatus.resolve,
      },
      {
        customerId: customers[1].id,
        categoryId: categories[2].id,
        title: "password reset",
        description: "password reset not working",
        priority: TicketPriority.low,
        status: TicketStatus.open,
      },
    ],
  });

  await prisma.assignment.createMany({
    data: tickets.map((ticket, index) => ({
      ticketId: ticket.id,
      userId: users[index % users.length].id,
    })),
  });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
