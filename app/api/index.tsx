// pages/api/trails/index.ts
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/server/config/db";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const trails = await prisma.trails.findMany();
    res.json(trails);
  } else if (req.method === "POST") {
    const { name, type, difficulty, distance_km } = req.body;
    const newTrail = await prisma.trails.create({
      data: {
        name,
        type,
        difficulty,
        distance_km,
      },
    });
    res.json(newTrail);
  }
}
