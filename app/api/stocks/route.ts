
// https://www.alphavantage.co/documentation/#
import { NextRequest, NextResponse } from "next/server";
// import data from "./data/techIpoSentiment.json" with {type: "json"};
import data from "./data/techIpoSentiment.json";

export async function GET(req: NextRequest) {
    return NextResponse.json(data)
}
