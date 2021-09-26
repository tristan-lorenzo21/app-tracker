import { useState, useEffect } from "react";
import axios from "axios";
import DisplayApplicationsChild from "./DisplayApplicationsChild";
// import "./PrivateScreen.css";

const DisplayApplications = ({ history }) => {
    const [error, setError] = useState("");
    const [applications, setApplications] = useState("");

    useEffect(() => {
        const fetchApplications = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/applications/displayApplications", config);
                setApplications(data.userApplications);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized please login");
            }
        };

        fetchApplications();
    }, []);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        history.push("/login");
    }

    return error ? (
        <span className="error-message">{error}</span>
    ) : (
        <>
            {/* <div style={{ background: "green", color: "white" }}>{applications}</div> */}
            <DisplayApplicationsChild applications={applications} />
            {/* <div>
                <tr>
                    <td>{applications[0].company}</td>
                    <td>{applications[0].position}</td>
                    <td>{applications[0].status}</td>
                </tr>
            </div> */}
            <button onClick={logoutHandler}>Logout</button>
        </>
    );
};

export default DisplayApplications;