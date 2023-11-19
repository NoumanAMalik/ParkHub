import {
    mysqlEnum,
    mysqlTable,
    bigint,
    uniqueIndex,
    varchar,
} from "drizzle-orm/mysql-core";

// Parking System
// Parking Lot:
//      id, name, location, spaces available, price per space
// User:
//      id, name, license plate
// Parked:
//      id, license plate, location id, duration
// Transcatoins:
//      id, payment to, payment from, payment amount, date, payment method, parking id,
//

// declaring enum in database
export const countries = mysqlTable(
    "countries",
    {
        id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
        name: varchar("name", { length: 256 }),
    },
    (countries) => ({
        nameIndex: uniqueIndex("name_idx").on(countries.name),
    }),
);

export const cities = mysqlTable("cities", {
    id: bigint("id", { mode: "number" }).primaryKey().autoincrement(),
    name: varchar("name", { length: 256 }),
    popularity: mysqlEnum("popularity", ["unknown", "known", "popular"]),
});
