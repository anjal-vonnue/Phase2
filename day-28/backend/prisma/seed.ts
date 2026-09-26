import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../src/generated/prisma/client";
import { issues } from "../src/data/issues";
import { projects } from "../src/data/projects";

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

console.log(issuesReturned);
console.log(projectsReturned);

await prisma.$disconnect();
