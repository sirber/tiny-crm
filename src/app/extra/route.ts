import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/database";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const route = searchParams.get("route") || null;

  if (null === route) {
    return NextResponse.json(
      { error: 'Missing "route" query parameter' },
      { status: 400 },
    );
  }

  const extras = await prisma.extra.findFirst({
    where: { route },
  });

  if (!extras) {
    return NextResponse.json({
      links: [],
      notes: [],
      followups: [],
    });
  }

  return NextResponse.json({
    links: extras.links,
    notes: extras.notes,
    followups: extras.followups,
  });
}
