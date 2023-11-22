import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { schema } from "@/db/schema";
import { NextResponse } from "next/server";

export async function POST(request) {
    // create the connection
    const connection = connect({
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
    });

    const db = drizzle(connection, { schema });

    const { Hello } = await request.json();

    console.log("POST: Called");

    console.log(Hello);

    return NextResponse.json({ response: "Working" });
}
