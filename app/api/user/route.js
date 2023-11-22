import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { User, schema } from "@/db/schema";
import { NextResponse } from "next/server";

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(connection, { schema });

export async function GET(request) {
    const result = await db.select().from(User);

    return NextResponse.json(result);
}

export async function POST(request) {
    // create the connection

    const { firstName, lastName, licensePlate } = await request.json();
    console.log(firstName, lastName, licensePlate);

    await db.insert(User).values({
        firstName: firstName,
        lastName: lastName,
        licensePlate: licensePlate,
    });
    // const { Hello } = await request.json();

    // console.log("POST: Called");

    // console.log(Hello);

    return NextResponse.json({ response: "Created User" });
}
