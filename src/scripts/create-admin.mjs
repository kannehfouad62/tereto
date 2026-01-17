import "dotenv/config";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = "admin@tereto.org";
  const plainPassword = "ChangeMe123!";
  const passwordHash = await bcrypt.hash(plainPassword, 12);

  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    await prisma.user.update({
      where: { email },
      data: { role: "ADMIN", passwordHash, name: "Tereto Admin" },
    });
    console.log("✅ Admin existed — updated role/password.");
  } else {
    await prisma.user.create({
      data: {
        email,
        name: "Tereto Admin",
        role: "ADMIN",
        passwordHash,
      },
    });
    console.log("✅ Admin created.");
  }

  console.log("Login credentials:", { email, password: plainPassword });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error("❌ Failed:", e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
