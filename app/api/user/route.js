import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { User, schema } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(connection, { schema });

export async function GET(request) {
    const params = request.nextUrl.searchParams;
    for (const [key, value] of params) {
        if (value != "") {
            const result = await db
                .select()
                .from(User)
                .where(eq(User.licensePlate, value));

            console.log(result);
            return NextResponse.json({ result: result });
        }
    }

    return NextResponse.json({ result: ["empty"] });

    // const result = await db.select().from(User);
}

export async function POST(request) {
    // create the connection

    // const { firstName, lastName, licensePlate } = await request.json();

    // await db.insert(User).values({
    //     firstName: firstName,
    //     lastName: lastName,
    //     licensePlate: licensePlate,
    // });
    // const { Hello } = await request.json();

    // console.log("POST: Called");

    // console.log(Hello);

    return NextResponse.json({ response: "Created User" });
}
