-- CreateTable: AppearanceSettings
-- This table was defined in schema.prisma but was never included in a migration.
-- The absence of this table is the primary cause of all "Internal Server Error"
-- responses from PUT /api/appearance.

CREATE TABLE "AppearanceSettings" (
    "id"          SERIAL       NOT NULL,
    "userId"      INTEGER      NOT NULL,
    "theme"       TEXT         NOT NULL DEFAULT 'system',
    "accentColor" TEXT         NOT NULL DEFAULT 'indigo',
    "density"     TEXT         NOT NULL DEFAULT 'comfortable',
    "animations"  BOOLEAN      NOT NULL DEFAULT true,
    "updatedAt"   TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppearanceSettings_pkey" PRIMARY KEY ("id")
);

-- Unique constraint: exactly one record per user
CREATE UNIQUE INDEX "AppearanceSettings_id_key"     ON "AppearanceSettings"("id");
CREATE UNIQUE INDEX "AppearanceSettings_userId_key" ON "AppearanceSettings"("userId");

-- Foreign key → User (cascade delete when the user is removed)
ALTER TABLE "AppearanceSettings"
    ADD CONSTRAINT "AppearanceSettings_userId_fkey"
    FOREIGN KEY ("userId")
    REFERENCES "User"("id")
    ON DELETE CASCADE
    ON UPDATE CASCADE;

-- Also add clerkId column to User if it is not already present
-- (safe: ALTER TABLE IF NOT EXISTS column is Postgres 9.6+)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_name = 'User' AND column_name = 'clerkId'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "clerkId" TEXT;
        CREATE UNIQUE INDEX "User_clerkId_key" ON "User"("clerkId");
    END IF;
END $$;
