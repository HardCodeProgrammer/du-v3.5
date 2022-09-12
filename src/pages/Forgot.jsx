import {
	Alert,
	AlertTitle,
	CircularProgress,
	Slide,
	Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../components/Mui";
import Neon from "../utils/api/neon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ForgotTemplate from "../utils/templates/forgot";
import { useSelector } from "react-redux";
import { publicIpv4 } from "public-ip";
import { useNavigate } from "react-router-dom";

function Forgot() {
	const navigate = useNavigate();
	const [inputs, setInputs] = useState({
		username: "",
		email: "",
	});

	const users = useSelector((state) => state.root.data.users);
	const loading = useSelector((state) => state.root.meta.loading);
	const [ip, setIp] = useState();

	useEffect(() => {
		publicIpv4().then((ip) => setIp(ip));
	}, []);

	function submit() {
		for (let user in users) {
			if (
				users[user].username === inputs.username &&
				users[user].email === inputs.email
			) {
				Neon.mail(
					"no-reply@puyvast-dailyupdates.co.in",
					[users[user].email],
					"Prudent@2512",
					"Alert - Change Password",
					ForgotTemplate(
						users[user].fullname,
						ip,
						`https://www.puyvast-dailyupdates.co.in/reset/${user}`
					)
				).catch((_) => {
					setSeverity("error");
					setMsg("Something went wrong :(");
					setOpen(true);
					return;
				});

				setMsg("Reset link is sent to " + inputs.email);
				setOpen(true);
				return;
			}
		}

		setInputs({
			username: "",
			email: "",
		});

		setSeverity("error");
		setMsg("User name or Email is incorrect");
		setOpen(true);
	}

	const [msg, setMsg] = useState("");
	const [severity, setSeverity] = useState("success");
	const [open, setOpen] = useState(false);
	return (
		<div className="container vertical">
			<Snackbar
				open={open}
				autoHideDuration={6000}
				TransitionComponent={Slide}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
				onClose={() => {
					setOpen(false);
					if (severity === "error") return;
					navigate("/login");
				}}
			>
				<Alert
					severity={severity}
					onClose={() => {
						setOpen(false);
						if (severity === "error") return;
						navigate("/login");
					}}
				>
					<AlertTitle>{severity.toUpperCase()}</AlertTitle>
					{msg}
				</Alert>
			</Snackbar>

			<div className="forgot-pass-header">
				<h1>DAILY UDPATES AND VESSEL STATUS</h1>
				<p>Please fill the details to initiate password reset</p>
			</div>

			{loading ? (
				<div className="loading">
					<CircularProgress thickness={4} />
				</div>
			) : (
				<form className="login-form" onSubmit={(e) => e.preventDefault()}>
					<div className="login-username">
						<div className="placeholder">
							<p>Username</p>
						</div>
						<div className="logininput">
							<Input
								type="text"
								autoFocus
								required
								autoComplete="false"
								placeholder="Enter Username"
								value={inputs.username}
								onChange={(e) =>
									setInputs({ ...inputs, username: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="login-username">
						<div className="placeholder">
							<p>Email Address</p>
						</div>
						<div className="logininput">
							<Input
								type="text"
								required
								autoComplete="false"
								placeholder="Enter Email Address"
								value={inputs.email}
								onChange={(e) =>
									setInputs({ ...inputs, email: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="login-btn">
						<Button
							type="submit"
							cvar="filled"
							onClick={() => submit()}
							disabled={!inputs.email || !inputs.username}
							startIcon={<ChevronRightIcon />}
						>
							Proceed
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Forgot;
