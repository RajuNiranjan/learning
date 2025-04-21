-- CreateTable
CREATE TABLE "Tile_Prisma_table" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "extent" DOUBLE PRECISION[],
    "center" DOUBLE PRECISION[],
    "zoom" DOUBLE PRECISION[],
    "projection" TEXT NOT NULL,
    "thumbnailBase64Img" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Tile_Prisma_table_pkey" PRIMARY KEY ("id")
);
