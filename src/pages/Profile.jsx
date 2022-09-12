import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import "../styles/vessels.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { Input, Button } from "../components/Mui";
import {
	Alert,
	AlertTitle,
	CircularProgress,
	Icon,
	IconButton,
	Snackbar,
	Tooltip,
} from "@mui/material";
import Close from "@mui/icons-material/Close";
import Neon from "../utils/api/neon";

function Profile() {
	const id = window.sessionStorage.getItem("user");
	document.title = "Your Profile | Daily Updates";

	const user = useSelector((state) => state.root.data.users[id]);
	const loading = useSelector((state) => state.root.meta.loading);
	const [edit, setEdit] = useState(false);
	const [openBar, setOpenBar] = useState(false);
	const [visible, setVisible] = useState(false);
	const [msg, setMsg] = useState("Profile Updated");
	const [severity, setSeverity] = useState("success");
	const [changed, setChanged] = useState(false);

	const [data, setData] = useState({
		fullname: "",
		username: "",
		email: "",
		password: "",
	});

	useEffect(() => {
		if (loading) return;

		if (
			data.fullname !== user.fullname ||
			data.username !== user.username ||
			data.password !== user.password ||
			data.email !== user.email
		) {
			setChanged(true);
		} else {
			setChanged(false);
		}

		//eslint-disable-next-line
	}, [loading, data]);

	function submit() {
		setEdit(false);
		Neon.put(`/users/${id}`, {
			...user,
			fullname: data.fullname,
			username: data.username,
			email: data.email,
			password: data.password,
		})
			.then((_) => {
				setOpenBar(true);
			})
			.catch((_) => {
				setMsg("Something went wrong :(");
				setSeverity("error");
				setOpenBar(true);
			});
	}

	useEffect(() => {
		if (loading) return;
		if (changed) return;

		setData({
			fullname: user.fullname,
			username: user.username,
			email: user.email,
			password: user.password,
		});

		//eslint-disable-next-line
	}, [loading, edit]);

	return (
		<div className="container main-page">
			<Snackbar
				open={openBar}
				autoHideDuration={4000}
				onClose={() => setOpenBar(false)}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
			>
				<Alert onClose={() => setOpenBar(false)} severity={severity}>
					<AlertTitle>{severity.toUpperCase()}</AlertTitle>
					{msg}
				</Alert>
			</Snackbar>
			<Navbar />
			<div className="main-header">
				<h1>Your Profile</h1>
			</div>

			<div className="main-contents">
				{loading ? (
					<div className="loading">
						<CircularProgress thickness={4} />
					</div>
				) : (
					<form className="login-form" onSubmit={(e) => e.preventDefault()}>
						<Tooltip title={edit ? "Cancel Edit" : "Edit Profile"}>
							<IconButton onClick={() => setEdit(!edit)}>
								<Icon>{edit ? <Close /> : <EditIcon />}</Icon>
							</IconButton>
						</Tooltip>

						<div className="login-form profile">
							<div className="login-username">
								<div className="placeholder">
									<p>Display Name</p>
								</div>
								<div className="logininput">
									<Input
										type="text"
										disabled={!edit}
										autoComplete="false"
										value={data.fullname}
										onChange={(e) =>
											setData({ ...data, fullname: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="login-username">
								<div className="placeholder">
									<p>Username</p>
								</div>
								<div className="logininput">
									<Input
										type="text"
										disabled={!edit}
										autoComplete="false"
										value={data.username}
										onChange={(e) =>
											setData({ ...data, username: e.target.value })
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
										type="email"
										disabled={!edit}
										autoComplete="false"
										value={data.email}
										onChange={(e) =>
											setData({ ...data, email: e.target.value })
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
										disabled={!edit}
										placeholder="●●●●●●●●●●●●●●●"
										value={data.password}
										autoComplete="false"
										onChange={(e) =>
											setData({ ...data, password: e.target.value })
										}
									/>
									<IconButton
										aria-label="View/Hide Password"
										onClick={() => setVisible(!visible)}
									>
										{visible ? <VisibilityOffIcon /> : <VisibilityIcon />}
									</IconButton>
								</div>
							</div>
							<Button
								disabled={!changed}
								cvar="filled"
								startIcon={<CheckCircleIcon />}
								onClick={submit}
							>
								Submit
							</Button>
						</div>
					</form>
				)}
			</div>
		</div>
	);
}

export default Profile;
