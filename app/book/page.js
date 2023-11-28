"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Input from "@/components/input";

const Book = () => {
    const searchParams = useSearchParams();
    const [parkingData, setParkingData] = useState([]);
    const [selectedData, setSelectedData] = useState({});
    const [submitData, setSubmitData] = useState(false);
    const [formData, setFormData] = useState({
        hours: "",
    });

    const formUpdate = (event) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        setSubmitData(true);
    };

    const randNum = () => {
        return Math.floor(Math.random() * 10000 + 1);
    };

    const handleRowClick = (data) => {
        setSelectedData(data);
        const modal = document.querySelector("#bookingModal");
        modal.classList.add("modal-open");
    };

    const closeModal = () => {
        const modal = document.querySelector("#bookingModal");
        modal.classList.remove("modal-open");
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

    useEffect(() => {
        console.log(formData);
    }, [submitData]);

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
                                    <tr
                                        key={randNum()}
                                        onClick={() => handleRowClick(data)}
                                        className="hover"
                                    >
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

            <div className="modal" id="bookingModal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg underline">
                        Book Parking
                    </h3>
                    <p>Name: {selectedData?.name || "No Data"}</p>
                    <p>Location: {selectedData?.location || "No Data"}</p>
                    <p>
                        Spaces Available:{" "}
                        {selectedData?.spacesAvailable || "No Data"}
                    </p>
                    <p>Price: {selectedData?.price || "No Data"}</p>
                    <Input
                        uniqueId={1}
                        id="hours"
                        label="Enter the number of hours you would like to book for?"
                        placeholder="Type here"
                        changeHandler={formUpdate}
                    />
                    <button
                        className="btn btn-wide btn-outline btn-secondary mt-6"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                    <div className="modal-action">
                        <a
                            href="#"
                            className="btn"
                            onClick={() => closeModal()}
                        >
                            Close
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
