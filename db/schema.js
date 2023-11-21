import { mysqlTable, bigint, varchar, timestamp } from "drizzle-orm/mysql-core";

// Parking System
// Parking Lot:
//      id, name, location, spaces available, price per space
// User:
//      id, name, license plate
// Parked:
//      id, license plate, location id, duration
// Transcations:
//      id, payment to, payment from, payment amount, date, payment method, parking id,
//

export const ParkingLot = mysqlTable("ParkingLot", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name"),
    location: varchar("location"),
    spacesAvailable: bigint("spacesAvailable", { mode: "number" }),
    price: bigint("price", { mode: "number" }),
});

export const User = mysqlTable("User", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    firstName: varchar("firstName"),
    lastName: varchar("lastName"),
    licensePlate: varchar("licensePlate"),
});

export const Parked = mysqlTable("Parked", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    licensePlate: varchar("licensePlate").references(() => User.licensePlate),
    lotId: bigint("lotId", { mode: "number" }).references(() => ParkingLot.id),
    duration: bigint("duration", { mode: "number" }),
});

export const Transcations = mysqlTable("Transactions", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    paymentTo: bigint("paymentTo", { mode: "number" }).references(
        () => ParkingLot.id
    ),
    paymentFrom: varchar("paymentFrom").references(() => User.id),
    paymentAmount: bigint("paymentAmount", { mode: "number" }),
    timestamp: timestamp("timestamp").defaultNow(),
    parkingId: bigint("parkingId", { mode: "number" }).references(Parked.id),
});
