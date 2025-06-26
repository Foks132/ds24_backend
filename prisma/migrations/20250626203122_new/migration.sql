-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "room" (
    "id" SERIAL NOT NULL,
    "number" TEXT NOT NULL,

    CONSTRAINT "room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "booking" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "roomId" INTEGER NOT NULL,
    "isVip" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" INTEGER NOT NULL,
    "startDate" INTEGER NOT NULL,
    "lastDate" INTEGER NOT NULL,
    "isDeleted" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_phone_key" ON "user"("phone");

-- CreateIndex
CREATE INDEX "user_id_idx" ON "user"("id");

-- CreateIndex
CREATE INDEX "user_phone_idx" ON "user"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "room_number_key" ON "room"("number");

-- CreateIndex
CREATE INDEX "room_id_idx" ON "room"("id");

-- CreateIndex
CREATE INDEX "booking_id_idx" ON "booking"("id");

-- CreateIndex
CREATE INDEX "booking_userId_idx" ON "booking"("userId");

-- CreateIndex
CREATE INDEX "booking_roomId_idx" ON "booking"("roomId");

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "booking" ADD CONSTRAINT "booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
