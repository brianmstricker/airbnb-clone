-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "Place" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "type" TEXT NOT NULL,
    "beds" INTEGER NOT NULL,
    "baths" INTEGER NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "description" TEXT NOT NULL,
    "checkInTime" TEXT NOT NULL,
    "checkOutTime" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "trending" BOOLEAN NOT NULL DEFAULT true,
    "view" BOOLEAN NOT NULL DEFAULT false,
    "omg" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" TEXT NOT NULL,
    "url" VARCHAR(512) NOT NULL,
    "index" INTEGER NOT NULL DEFAULT 0,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Perk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Perk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Reserve" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "guests" INTEGER NOT NULL DEFAULT 1,
    "checkInDate" TEXT NOT NULL,
    "checkOutDate" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "reserveStatus" TEXT NOT NULL DEFAULT 'reserved',

    CONSTRAINT "Reserve_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rating" (
    "id" TEXT NOT NULL,
    "placeId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "rating" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "Rating_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Account_userId_provider_key" ON "Account"("userId", "provider");

-- CreateIndex
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "Session_userId_sessionToken_key" ON "Session"("userId", "sessionToken");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- CreateIndex
CREATE UNIQUE INDEX "Place_userId_name_key" ON "Place"("userId", "name");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_placeId_url_key" ON "Photo"("placeId", "url");

-- CreateIndex
CREATE UNIQUE INDEX "Perk_placeId_name_key" ON "Perk"("placeId", "name");

-- CreateIndex
CREATE INDEX "Favorite_placeId_idx" ON "Favorite"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_userEmail_placeId_key" ON "Favorite"("userEmail", "placeId");

-- CreateIndex
CREATE INDEX "Reserve_placeId_idx" ON "Reserve"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Reserve_userEmail_placeId_key" ON "Reserve"("userEmail", "placeId");

-- CreateIndex
CREATE INDEX "Rating_placeId_idx" ON "Rating"("placeId");

-- CreateIndex
CREATE UNIQUE INDEX "Rating_userEmail_placeId_key" ON "Rating"("userEmail", "placeId");
