import { CircularProgress } from "@mui/material";
import { Button } from "../components/Mui";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "../styles/home.css";
import Navbar from "../components/Navbar";
import StatusBar from "../components/StatusBar";

function Home() {
	const id = window.sessionStorage.getItem("user");
	const loading = useSelector((state) => state.root.meta.loading);
	const user = useSelector((state) => state.root.data.users[id]);
	document.title = "Daily Updates";

	useEffect(() => {
		if (id === null) {
			window.location.href = "/login";
		}
	}, [id]);

	function Logout() {
		window.sessionStorage.removeItem("user");
		window.localStorage.removeItem("user");

		window.location.href = "/login";
	}

	return (
		<div className="container">
			{loading ? (
				<CircularProgress
					thickness={4}
					style={{ position: "absolute", top: "50%", left: "50%" }}
				/>
			) : (
				<div className="home">
					<div className="home-header">
						<h2>👋 Welcome back, {user.fullname}</h2>
					</div>
					<div className="home-content">
						<Navbar />
						<div className="home-left">
							<div className="home-left-contents">
								<div className="home-prf-head">
									<div className="home-prf-img"></div>
									<div className="home-prf-head-txt">
										<h3>{user.fullname}</h3>
									</div>
								</div>
								<div className="home-prf-details">
									<div className="home-detail">
										<div className="home-detail-label">
											<span>User Name</span>
											<span>@</span>
										</div>
										<div className="home-detail-txt">{user.username}</div>
									</div>
									<div className="home-detail">
										<div className="home-detail-label">
											<span>Email Address</span>
											<img src="./assets/icons/email.svg" alt="" />
										</div>
										<div className="home-detail-txt">{user.email}</div>
									</div>
								</div>
								<div className="home-prf-btn">
									<Button
										startIcon={
											<img
												width={45}
												height={30}
												src="./assets/icons/sign off.svg"
												alt=""
											/>
										}
										cvar="outlined"
										onClick={() => Logout()}
									>
										Sign Off
									</Button>
								</div>
							</div>
						</div>
						<div className="home-right">
							<div className="home-right-contents">
								<div className="home-content-img">
									<img src="./assets/images/ECL Logo.jpg" alt="" />
									<img src="./assets/images/PMI Logo.jpg" alt="" />
								</div>
								<div className="home-content-txt">
									<h1>DAILY UPDATES AND VESSEL STATUS</h1>
									<p>Please select a page to view</p>
								</div>
								<div className="home-contents-btn">
									<Button
										startIcon={
											<img
												width={45}
												height={30}
												src="./assets/icons/sign off.svg"
												alt=""
											/>
										}
										cvar="outlined"
										onClick={() => Logout()}
									>
										Sign Off
									</Button>
								</div>
							</div>
						</div>
					</div>
					<StatusBar />
				</div>
			)}
		</div>
	);
}

export default Home;
