/*
  Warnings:

  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_genresId_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedMovies" DROP CONSTRAINT "_UserLikedMovies_A_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedMovies" DROP CONSTRAINT "_UserLikedMovies_B_fkey";

-- DropForeignKey
ALTER TABLE "_UserLikedSeries" DROP CONSTRAINT "_UserLikedSeries_B_fkey";

-- DropTable
DROP TABLE "Movie";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "seriesId" INTEGER,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Movies" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "releaseYear" INTEGER NOT NULL,
    "poster_img" TEXT NOT NULL,
    "genresId" INTEGER,
    "score" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Movies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- AddForeignKey
ALTER TABLE "Movies" ADD CONSTRAINT "Movies_genresId_fkey" FOREIGN KEY ("genresId") REFERENCES "Genres"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedMovies" ADD CONSTRAINT "_UserLikedMovies_A_fkey" FOREIGN KEY ("A") REFERENCES "Movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedMovies" ADD CONSTRAINT "_UserLikedMovies_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserLikedSeries" ADD CONSTRAINT "_UserLikedSeries_B_fkey" FOREIGN KEY ("B") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
