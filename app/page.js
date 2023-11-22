"use client";

import { useEffect } from "react";

export default function Home() {
    useEffect(() => {
        const test = async () => {
            const res = await fetch(`/api/user`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ Hello: "World" }),
            });
        };

        test();
    }, []);

    return (
        <main className="flex min-h-screen flex-col items-center justify-between">
            <h1>Hello World!</h1>
        </main>
    );
}
