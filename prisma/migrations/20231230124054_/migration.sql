-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "Comapny" TEXT NOT NULL DEFAULT 'Rumsan',
    "roles" "Role"[] DEFAULT ARRAY['USER']::"Role"[],
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isBlocked" BOOLEAN NOT NULL DEFAULT false,
    "lastLoggedIn" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" SERIAL NOT NULL,
    "company" TEXT NOT NULL,
    "user" TEXT NOT NULL,
    "time" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "action" TEXT NOT NULL,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
