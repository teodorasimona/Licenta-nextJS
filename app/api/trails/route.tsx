import prisma from "@/server/config/db"; // Importarea instanței Prisma pentru acces la baza de date.
import { NextResponse } from "next/server"; // Importarea NextResponse pentru gestionarea răspunsurilor HTTP în Next.js.

// Funcție pentru gestionarea cererilor GET de la client.
export async function GET(req: Request) {
  try {
    const url = new URL(req.url); // Obținerea URL-ului cererii.
    const type = url.searchParams.get("type") || undefined; // Extrage tipul traseului din parametrii URL-ului sau setează ca undefined.
    const difficulty = url.searchParams.get("difficulty") || undefined; // Extrage dificultatea traseului din parametrii URL-ului sau setează ca undefined.
    const maxDistance = url.searchParams.get("distance") // Extrage distanța maximă din parametrii URL-ului sau setează ca undefined.
      ? parseInt(url.searchParams.get("distance")!, 10) // Convertirea valorii în număr întreg.
      : undefined;
    const searchTerm = url.searchParams.get("search") || undefined; // Extrage termenul de căutare din parametrii URL-ului sau setează ca undefined.

    const filters: any = {}; // Obiect pentru filtrele de căutare.
    if (type) filters.type = type; // Adaugă filtrul pentru tipul traseului.
    if (difficulty) filters.difficulty = difficulty; // Adaugă filtrul pentru dificultatea traseului.
    if (maxDistance) filters.distance_km = { lte: maxDistance }; // Adaugă filtrul pentru distanța maximă.
    if (searchTerm)
      filters.name = { contains: searchTerm, mode: "insensitive" }; // Adaugă filtrul pentru căutarea după nume.

    const dbTrails = await prisma.trails.findMany({
      // Interogare către baza de date pentru a găsi traseele conform filtrelor.
      where: filters,
    });

    const trails = dbTrails.map(parseTrail); // Transformă fiecare traseu în formatul dorit și returnează un răspuns JSON cu status 200.
    return NextResponse.json(trails, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch trails:", error); // În caz de eroare, afișează un mesaj de eroare în consolă.
    return NextResponse.json(
      { error: "Failed to fetch trails" }, // Returnează un răspuns JSON cu mesajul de eroare și status 500 (Internal Server Error).
      { status: 500 }
    );
  }
}

// Funcție pentru gestionarea cererilor POST de la client pentru adăugarea unui nou traseu.
export async function POST(req: Request) {
  try {
    const { name, type, difficulty, distance_km, lat, lng } = await req.json(); // Extrage datele necesare pentru crearea noului traseu din corpul cererii POST.
    const coordinates = `${lat},${lng}`; // Construiește coordonatele traseului.
    const newTrail = await prisma.trails.create({
      // Crează un nou traseu în baza de date folosind Prisma.
      data: {
        name,
        type,
        difficulty,
        distance_km,
        coordinates,
        route: JSON.stringify([]), // Inițializează ruta traseului ca un șir JSON gol.
      },
    });

    return NextResponse.json(newTrail, { status: 201 }); // Returnează noul traseu creat în format JSON cu status 201 (Created).
  } catch (error) {
    console.error("Failed to create trail:", error); // În caz de eroare, afișează un mesaj de eroare în consolă.
    return NextResponse.json(
      { error: "Failed to create trail" }, // Returnează un răspuns JSON cu mesajul de eroare și status 500 (Internal Server Error).
      { status: 500 }
    );
  }
}

// Funcție pentru gestionarea cererilor DELETE de la client pentru ștergerea unui traseu existent.
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url); // Obține URL-ul cererii DELETE.
    const id = parseInt(url.pathname.split("/").pop()!, 10); // Extrage ID-ul traseului din URL și convertește în număr întreg.

    await prisma.trails.delete({
      // Șterge traseul din baza de date folosind Prisma.
      where: { id },
    });

    return NextResponse.json({ message: "Trail deleted" }, { status: 200 }); // Returnează un răspuns JSON cu mesajul de confirmare și status 200 (OK).
  } catch (error) {
    console.error("Failed to delete trail:", error); // În caz de eroare, afișează un mesaj de eroare în consolă.
    return NextResponse.json(
      { error: "Failed to delete trail" }, // Returnează un răspuns JSON cu mesajul de eroare și status 500 (Internal Server Error).
      { status: 500 }
    );
  }
}

// Funcție pentru a transforma un traseu din formatul bazei de date în formatul dorit pentru client.
function parseTrail(trail: any) {
  return {
    ...trail,
    route: parseRoute(trail.route ? JSON.parse(trail.route) : []), // Aplică funcția parseRoute pentru a transforma ruta traseului în formatul dorit.
  };
}

// Funcție pentru a transforma ruta traseului dintr-un șir de perechi de coordonate într-o listă de perechi de numere.
function parseRoute(route: [string, string][]): [number, number][] {
  return route.map((coord) => [parseFloat(coord[0]), parseFloat(coord[1])]); // Transformă fiecare pereche de coordonate în numere în virgulă mobilă.
}
