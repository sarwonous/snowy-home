import { getCCTVByRoom } from "@/libs/cctv";
import { NextResponse } from "next/server";

export async function GET(req: Request, {
    params: {
        kelas
    }
}: { params: { kelas: string } }) {
    const cctv = getCCTVByRoom(kelas);
    if (cctv) {
        return NextResponse.json({
            cctv
        });
    }

    return NextResponse.json({
        cctv: "",
    }, {
        status: 404,
        statusText: "CCTV Not Found"
    })
}