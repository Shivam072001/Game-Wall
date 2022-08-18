import {axiosInstance} from "../config";
import { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { Context } from "../context/Context";
import "./login.css";

export default function Login() {
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, dispatch, isFetching } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch({ type: "LOGIN_START" });
        console.log(dispatch);
        console.log(isFetching);
        try {
            const res = await axiosInstance.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            console.log(userRef.current.value);
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
        } catch (err) {
            dispatch({ type: "LOGIN_FAILURE" });
        }
    };
    console.log(isFetching);
    return (
        <div className="login">
            <span className="loginTitle">Login</span>
            <form className="loginForm" onSubmit={handleSubmit}>
                <label>Username</label>
                <input
                    type="text"
                    className="loginInput"
                    placeholder="Enter your username..."
                    ref={userRef}
                />
                <label>Password</label>
                <input
                    type="password"
                    className="loginInput"
                    placeholder="Enter your password..."
                    ref={passwordRef}
                />
                <button className="loginButton" type="submit" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className="loginRegisterButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    );
}