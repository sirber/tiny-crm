import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const route = searchParams.get("route") || null;

  const regex = /^\w+\/\d+$/;

  if (null === route || !regex.test(route)) {
    return NextResponse.json(
      { error: 'Missing or invalid "route" query parameter' },
      { status: 400 },
    );
  }

  const extras = await prisma.extra.findFirst({
    where: { route },
  });

  if (!extras) {
    return NextResponse.json(
      { error: "No extras found for the given route" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    links: extras.links,
    notes: extras.notes,
    followups: extras.followups,
  });
}
