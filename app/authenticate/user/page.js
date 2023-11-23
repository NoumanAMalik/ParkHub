"use client";
import { useState, useEffect } from "react";
import Input from "@/components/input";

const User = () => {
    const [modeToggle, setModeToggle] = useState("");
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        licensePlate: "",
    });
    const [submitData, setSubmitData] = useState(false);

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

    useEffect(() => {
        const get = async () => {
            const { firstName, lastName, licensePlate } = formData;

            let body = {};

            if (modeToggle == "Create") {
                body = {
                    firstName: firstName,
                    lastName: lastName,
                    licensePlate: licensePlate,
                };
            } else {
                body = {
                    licensePlate: licensePlate,
                };
            }

            const res = await fetch(`/api/user?` + new URLSearchParams(body), {
                method: "GET",
            });
        };

        get();
    }, [submitData]);

    useEffect(() => {
        console.log(formData);
    }, [formData]);

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="mb-auto flex flex-row gap-8">
                <button
                    className={`btn btn-wide btn-outline btn-primary ${
                        modeToggle == "Create" ? "btn-active" : ""
                    }`}
                    onClick={() => setModeToggle("Create")}
                >
                    First Time User
                </button>

                <button
                    className={`btn btn-wide btn-outline btn-primary ${
                        modeToggle == "Login" ? "btn-active" : ""
                    }`}
                    onClick={() => setModeToggle("Login")}
                >
                    Find Account
                </button>
            </div>

            {modeToggle == "Create" && (
                <div className="flex flex-col items-center">
                    <Input
                        id="firstName"
                        label="Enter your First Name"
                        placeholder="Type here"
                        changeHandler={formUpdate}
                    />

                    <Input
                        id="lastName"
                        label="Enter is your Last Name"
                        placeholder="Type Here"
                        changeHandler={formUpdate}
                    />

                    <Input
                        id="licensePlate"
                        label="Enter is your License Plate Number"
                        placeholder="Type Here"
                        changeHandler={formUpdate}
                    />

                    <button
                        className="btn btn-wide btn-outline btn-secondary mt-6"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}

            {modeToggle == "Login" && (
                <div className="flex flex-col items-center">
                    <Input
                        id="licensePlate"
                        label="Enter is your License Plate Number"
                        placeholder="Type Here"
                        changeHandler={formUpdate}
                    />

                    <button
                        className="btn btn-wide btn-outline btn-secondary mt-6"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default User;
