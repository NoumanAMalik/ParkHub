"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Home() {
    useEffect(() => {
        const post = async () => {
            const res = await fetch(`/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    firstName: "Nouman",
                    lastName: "Malik",
                    licensePlate: "CLXK646",
                }),
            });

            return res.json();
        };

        const get = async () => {
            const res = await fetch(`/api/user`, {
                method: "GET",
            });

            return res.json();
        };

        // (async () => {
        //     console.log(await post());
        //     console.log(await get());
        // })();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center">
            <h1 className="">Hello World!</h1>

            <div className="my-auto flex flex-row gap-8">
                <Link href="/authenticate/user">
                    <button className="btn btn-wide btn-outline btn-primary">
                        Find Parking
                    </button>
                </Link>

                <Link href="/authenticate/owner">
                    <button className="btn btn-wide btn-outline btn-primary">
                        List Parking Lot
                    </button>
                </Link>
            </div>
        </main>
    );
}
