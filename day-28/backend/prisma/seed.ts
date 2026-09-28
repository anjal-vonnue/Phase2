import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient, UserRole } from "../src/generated/prisma/client";
import { issues } from "../src/data/issues";
import { projects } from "../src/data/projects";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({ adapter });

const issuesReturned = await prisma.issue.createManyAndReturn({
  data: issues,
});

const projectsReturned = await prisma.project.createManyAndReturn({
  data: projects,
});

const passwordHash = await bcrypt.hash("password123", 12);

const users = await prisma.user.createManyAndReturn({
  data: [
    {
      name: "Anjal",
      email: "anjal@vonnue.com",
      passwordHash,
      role: UserRole.admin,
    },
    {
      name: "Yasin",
      email: "yasin@vonnue.com",
      passwordHash,
      role: UserRole.agent,
    },
    {
      name: "Gauresh",
      email: "gauresh@vonnue.com",
      passwordHash,
      role: UserRole.customer,
    },
  ],
});

console.log(issuesReturned);
console.log(projectsReturned);
console.log(users);

await prisma.$disconnect();
