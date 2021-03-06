import { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            history.push("/");
        }
    }, [history]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
                "Content-Type": "application/json"
            }
        }

        if (password !== confirmPassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const { data } = await axios.post("/api/auth/register", { username, firstName, lastName, email, password }, config);

            localStorage.setItem("authToken", data.token);
            localStorage.setItem("username", data.data.username);

            history.pushState("/displayApplications");
        } catch (error) {
            setError("Error with registering");
            setTimeout(() => {
                setError("");
            }, 5000)
        }
    }

    return (
        <div className="register-screen">
            <form onSubmit={registerHandler} className="register-screen__form">
                <h3 className="register-screen__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="name">Username:</label>
                    <input type="text" required id="name" placeholder="Enter username:" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="name">First Name:</label>
                    <input type="text" required id="firstName" placeholder="Enter first name:" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="name">Last Name:</label>
                    <input type="text" required id="lastName" placeholder="Enter last name:" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input type="email" required id="email" placeholder="Enter email:" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Enter password:</label>
                    <input type="password" required id="password" placeholder="Enter password:" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div className="form-group">
                    <label htmlFor="confirmPassword">Confirm password:</label>
                    <input type="password" required id="confirmPassword" placeholder="Confirm password:" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Register</button>

                <span className="register-screen__subtext">Already have an account? <Link to="/login">Login</Link></span>
            </form>
        </div>
    );
}

export default RegisterScreen;