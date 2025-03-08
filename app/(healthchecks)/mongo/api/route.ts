import ImageModel from "@/mongo/models/image.model";
import { NextResponse } from "next/server";

const updateImageCollection = async () => {
    await ImageModel.updateMany({}, { type: "painting"})
}

export async function GET() {
    const res = await updateImageCollection()
    return NextResponse.json({ res })
}