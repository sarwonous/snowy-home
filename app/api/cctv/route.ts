import { rooms } from "@/libs/cctv";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    return NextResponse.json({
        rooms
    });
}