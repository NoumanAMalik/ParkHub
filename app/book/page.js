"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Book = () => {
    const searchParams = useSearchParams();
    const [parkingData, setParkingData] = useState([]);

    const randNum = () => {
        return Math.floor(Math.random() * 10000 + 1);
    };

    useEffect(() => {
        const getParkingLotData = async () => {
            const res = await fetch(`/api/parkinglot`, {
                method: "GET",
            });

            const response = await res.json();

            setParkingData(response.result);
        };

        getParkingLotData();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center">
            <h1>Booking Page</h1>
            {searchParams.get("firstName")}
            <br></br>
            {searchParams.get("lastName")}
            <br></br>
            {searchParams.get("licensePlate")}
            <br></br>
            <br></br>
            <p>Available Parking Lots</p>

            <div className="flex flex-col items-center mt-8">
                <div className="overflow-x-auto">
                    <table className="table table-zebra">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Location</th>
                                <th>Spaces Available</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parkingData.map((data) => {
                                return (
                                    <tr key={randNum()}>
                                        <th key={randNum()}>{data.id}</th>
                                        <td key={randNum()}>{data.name}</td>
                                        <td key={randNum()}>{data.location}</td>
                                        <td key={randNum()}>
                                            {data.spacesAvailable}
                                        </td>
                                        <td key={randNum()}>{data.price}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Book;
