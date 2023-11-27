import "dotenv/config";
import { drizzle } from "drizzle-orm/planetscale-serverless";
import { connect } from "@planetscale/database";
import { Owner, ParkingLot, User, schema } from "@/db/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

const connection = connect({
    host: process.env.DATABASE_HOST,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});

const db = drizzle(connection, { schema });

export async function GET(request) {
    const email = request.nextUrl.searchParams.get("email");

    //* Get Owner ID
    let result = await db
        .select({ id: Owner.id })
        .from(Owner)
        .where(eq(Owner.email, email));

    let { id } = result[0];

    // console.log(id);
    //* Select Owners Parking Lots
    result = await db
        .select()
        .from(ParkingLot)
        .where(eq(ParkingLot.ownerId, id));

    console.log(result);

    return NextResponse.json({ result: result });

    // const params = request.nextUrl.searchParams;

    // const result = await db
    //     .select()
    //     .from(Owner)
    //     .where(eq(Owner.email, params.get("email")));

    // if (result.length != 0) {
    //     return NextResponse.json({ result: result });
    // }

    // return NextResponse.json({ result: "not found" });
}

export async function POST(request) {
    const { name, location, spacesAvailable, price, email } =
        await request.json();

    let result = await db
        .select({ id: Owner.id })
        .from(Owner)
        .where(eq(Owner.email, email));

    let { id } = result[0];

    try {
        await db.insert(ParkingLot).values({
            name: name,
            location: location,
            spacesAvailable: parseInt(spacesAvailable),
            price: parseInt(price),
            ownerId: id,
        });
    } catch (e) {
        console.log(e);
    }

    return NextResponse.json({ result: "Created Parking Lot" });

    // const { email } = await request.json();

    // try {
    //     await db.insert(Owner).values({
    //         email: email,
    //     });
    // } catch (e) {
    //     console.log(e);
    // }

    // return NextResponse.json({ result: "Created Owner" });
}
