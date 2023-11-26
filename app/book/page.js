"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Book = () => {
    const searchParams = useSearchParams();

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Booking Page</h1>
            {searchParams.get("firstName")}
            {searchParams.get("lastName")}
            {searchParams.get("licensePlate")}
        </div>
    );
};

export default Book;
