import {
	Alert,
	AlertTitle,
	CircularProgress,
	IconButton,
	Slide,
	Snackbar,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Input } from "../components/Mui";
import Neon from "../utils/api/neon";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useSelector } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useNavigate, useParams } from "react-router-dom";

function Reset() {
	const navigate = useNavigate();
	const params = useParams();
	const id = params.id;
	document.title = "Reset Password | Daily Updates";

	const [visible, setVisible] = useState(false);

	const [processing, setProcessing] = useState(false);

	const [inputs, setInputs] = useState({
		pass: "",
		conf_pass: "",
	});

	const user = useSelector((state) => state.root.data.users[id]);
	const loading = useSelector((state) => state.root.meta.loading);

	useEffect(() => {
		if (loading) return;

		if (!user) navigate("/login");

		// eslint-disable-next-line
	}, [loading]);

	function submit() {
		if (inputs.pass !== inputs.conf_pass) {
			setInputs({
				pass: "",
				conf_pass: "",
			});

			setSeverity("error");
			setMsg("Passwords do not match");
			setOpen(true);
			return;
		}

		setProcessing(true);

		Neon.put(`/users/${id}`, { ...user, password: inputs.pass })
			.then((_) => {
				setOpen(true);
			})
			.catch((_) => {
				setSeverity("error");
				setMsg("Something went wrong :(");
				setOpen(true);
				return;
			});
	}

	const [msg, setMsg] = useState("Password Changed successfully");
	const [severity, setSeverity] = useState("success");
	const [open, setOpen] = useState(false);
	return (
		<div className="container vertical">
			<Snackbar
				open={open}
				autoHideDuration={4000}
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
				<p>Hello {user && user.fullname}, Change your password</p>
			</div>

			{loading ? (
				<div className="loading">
					<CircularProgress thickness={4} />
				</div>
			) : (
				<form className="login-form" onSubmit={(e) => e.preventDefault()}>
					<div className="login-pass">
						<div className="placeholder">
							<p>New Password</p>
						</div>
						<div className="logininput password">
							<Input
								type={visible ? "text" : "password"}
								placeholder="●●●●●●●●●●●●●●●"
								value={inputs.pass}
								disabled={processing}
								autoComplete="false"
								onChange={(e) => setInputs({ ...inputs, pass: e.target.value })}
							/>
							<IconButton
								aria-label="View/Hide Password"
								onClick={() => setVisible(!visible)}
							>
								{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
							</IconButton>
						</div>
					</div>

					<div className="login-username">
						<div className="placeholder">
							<p>Confirm Password</p>
						</div>
						<div className="logininput">
							<Input
								type={visible ? "text" : "password"}
								required
								autoComplete="false"
								disabled={processing}
								placeholder="●●●●●●●●●●●●●●●"
								value={inputs.conf_pass}
								onChange={(e) =>
									setInputs({ ...inputs, conf_pass: e.target.value })
								}
							/>
						</div>
					</div>

					<div className="login-btn">
						<Button
							type="submit"
							cvar="filled"
							onClick={() => submit()}
							disabled={!inputs.pass || !inputs.conf_pass || processing}
							startIcon={<ChevronRightIcon />}
						>
							Submit
						</Button>
					</div>
				</form>
			)}
		</div>
	);
}

export default Reset;
