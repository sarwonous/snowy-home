import { getHealth } from "@/libs/data";
import { NextResponse } from "next/server";

export async function GET(req: Request, {
    params
}: { params: { app: string } }) {
    const { app } = params;
    const health = await getHealth('private', app);
    return NextResponse.json({
        app,
        health
    })
}