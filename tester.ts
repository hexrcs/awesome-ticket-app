import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.user.deleteMany({});
