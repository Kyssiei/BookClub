import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import "../styles/Login.css"; 
import loginPic from "../assets/Gisele Murias.jpg";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const response = await fetch("http://localhost:3000/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.message || "Login failed");

            // Store the token in local storage
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));

            // Redirect user after login
            navigate("/profile");
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div>
            <NavBar />
             <div className="login-container">
            {/* Left Side - Form */}
            <div className="login-form-section">
                <div className="login-box">
                    <h2 className="login-title">Welcome Back!</h2>
                    <p className="login-subtitle">Sign in to continue your journey.</p>

                    {error && <p className="login-error">{error}</p>}

                    <form className="login-form" onSubmit={handleLogin}>
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="login-input"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="login-input"
                        />
                        <button type="submit" className="login-button">Login</button>
                    </form>

                    <div className="forgot-password">
                        <a href="/forgot-password">Forgot Password?</a>
                    </div>

                    <p className="login-footer">
                        Not a member? <a href="/register">Register now</a>
                    </p>
                </div>
            </div>

            {/* Right Side - Image */}
            <div className="login-image-section">
                <img src={loginPic} alt="Login Illustration" className="login-image" />
            </div>
        </div>
        </div>
       
    );
};

export default Login;