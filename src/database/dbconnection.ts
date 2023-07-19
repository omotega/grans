import { PrismaClient } from "@prisma/client";
import "dotenv/config";

const db = new PrismaClient();

export default db
