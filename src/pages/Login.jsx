import React, { useEffect, useState } from "react";
import { Button, Input } from "../components/Mui";
import "../styles/login.css";
import { useSelector } from "react-redux";
import {
	Alert,
	AlertTitle,
	CircularProgress,
	Slide,
	Snackbar,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { motion } from "framer-motion";

function Login() {
	const users = useSelector((state) => state.root.data.users);
	const loading = useSelector((state) => state.root.meta.loading);
	const navigate = useNavigate();

	const [msg, setMsg] = useState(null);
	const [visible, setVisible] = useState(false);

	const [inputs, setInputs] = useState({
		username: "",
		password: "",
	});
	const [remember, setRemember] = useState(false);

	useEffect(() => {
		if (loading) return;

		const user = window.localStorage.getItem("id");

		if (user !== null) {
			window.sessionStorage.setItem("user", user);
			navigate("/");
		}
		// eslint-disable-next-line
	}, [loading, users]);

	useEffect(() => {
		window.addEventListener("offline", () => setMsg("You are Offline :("));

		return window.removeEventListener("offline", () => {});
	}, []);

	function Login() {
		if (inputs.username === "") {
			setMsg("Username cannot be empty");
			return;
		}

		if (inputs.password === "") {
			setMsg("Password cannot be empty");
			return;
		}

		for (let user in users) {
			if (
				users[user].username === inputs.username &&
				users[user].password === inputs.password
			) {
				if (remember) window.localStorage.setItem("id", user);

				window.sessionStorage.setItem("user", user);
				navigate("/");

				return;
			} else if (
				users[user].email === inputs.username &&
				users[user].password === inputs.password
			) {
				if (remember) window.localStorage.setItem("id", user);

				window.sessionStorage.setItem("user", JSON.stringify(users[user]));
				navigate("/");

				return;
			}
		}

		setInputs({
			username: "",
			password: "",
		});
		setMsg("Username or Password is incorrect");
	}

	return (
		<motion.div
			initial={{ scale: 1, opacity: 1 }}
			animate={{ scale: 1, opacity: 1 }}
			exit={{
				opacity: 0,
				position: "absolute",
				translateX: 200,
				overflow: "none",
			}}
			transition={{ duration: 0.2 }}
			className="container"
		>
			<Snackbar
				open={msg}
				autoHideDuration={6000}
				TransitionComponent={Slide}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
				onClose={() => setMsg(null)}
			>
				<Alert severity="error" onClose={() => setMsg(null)}>
					<AlertTitle>Error</AlertTitle>
					{msg}
				</Alert>
			</Snackbar>

			{/* Left side */}
			<div className="login-left">
				<div className="login-left-header">
					<h1>Welcome Back</h1>
					<p>Please Login to your account</p>
				</div>
				<div className="login-gif-container"></div>
			</div>

			{/* Right Side */}
			<motion.div
				initial={{ display: "none", opacity: 0, translateX: -100 }}
				animate={{ display: "flex", opacity: 1, translateX: 0 }}
				transition={{ duration: 0.5 }}
				className="login-right"
			>
				<div className="login-header">
					<div className="login-header-imgs">
						<img src="./assets/images/PMI Logo.jpg" alt="" />
						<img src="./assets/images/ECL Logo.jpg" alt="" />
					</div>
					<div className="login-header-text">
						<h1>DAILY UPDATES AND VESSEL STATUS</h1>
					</div>
				</div>

				{loading ? (
					<CircularProgress thickness={4} />
				) : (
					<form className="login-form" onSubmit={(e) => e.preventDefault()}>
						<div className="login-username">
							<div className="placeholder">
								<p>Username or Email Address</p>
							</div>
							<div className="logininput">
								<Input
									type="text"
									autoFocus
									autoComplete="false"
									placeholder="Enter Username or Email Address"
									value={inputs.username}
									onChange={(e) =>
										setInputs({ ...inputs, username: e.target.value })
									}
								/>
							</div>
						</div>
						<div className="login-pass">
							<div className="placeholder">
								<p>Password</p>
							</div>
							<div className="logininput password">
								<Input
									type={visible ? "text" : "password"}
									placeholder="●●●●●●●●●●●●●●●"
									value={inputs.password}
									autoComplete="false"
									onChange={(e) =>
										setInputs({ ...inputs, password: e.target.value })
									}
								/>
								<IconButton
									aria-label="View/Hide Password"
									onClick={() => setVisible(!visible)}
								>
									{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
								</IconButton>
							</div>
							<div className="log-pass-contents">
								<Link className="link" to="/forgot-password">
									Forgot Password
								</Link>
								<FormControlLabel
									control={
										<Checkbox
											value={remember}
											onChange={() => setRemember(!remember)}
										/>
									}
									label="Keep me signed in"
									labelPlacement="end"
								/>
							</div>
						</div>
						<div className="login-btn">
							<Button
								type="submit"
								cvar="filled"
								onClick={() => Login()}
								startIcon={
									<img
										width={45}
										height={30}
										src="./assets/icons/LoginBtn.svg"
										alt=""
									/>
								}
							>
								Login
							</Button>
						</div>
					</form>
				)}
			</motion.div>
		</motion.div>
	);
}

export default Login;
