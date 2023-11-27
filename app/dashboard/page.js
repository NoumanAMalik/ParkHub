"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
    const searchParams = useSearchParams();

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Owner Dashboard Page</h1>
            {searchParams.get("email")}
        </div>
    );
};

export default Dashboard;
