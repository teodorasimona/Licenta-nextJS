import prisma from "@/server/config/db";
import { trails } from "@prisma/client";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   if (req.method === "GET") {
//     const trails = await prisma.trails.findMany();
//     res.json(trails);
//   } else if (req.method === "POST") {
//     const { name, type, difficulty, distance_km } = req.body;
//     const newTrail = await prisma.trails.create({
//       data: {
//         name,
//         type,
//         difficulty,
//         distance_km,
//       },
//     });
//     res.json(newTrail);
//   }
// }

export async function GET() {
  const dbTrails = await prisma.trails.findMany();
  const trails = (await prisma.trails.findMany()).map(parseTrail);
  return Response.json(trails);
}

function parseTrail(trail: trails) {
  return {
    ...trail,
    route: parseRoute(trail.route ? JSON.parse(trail.route) : []),
  };
}

function parseRoute(route: [string, string][]): [number, number][] {
  return route.map((coord) => [parseFloat(coord[0]), parseFloat(coord[1])]);
}

export async function POST(req: Request) {
  const { name, type, difficulty, distance_km } = req.body as any;
  const newTrail = await prisma.trails.create({
    data: {
      name,
      type,
      difficulty,
      distance_km,
    },
  });
  return newTrail;
}
