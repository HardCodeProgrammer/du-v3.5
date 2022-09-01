import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "../styles/navbar.css";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";

function Navbar() {
	const [extend, setExtend] = useState(false);
	const navigate = useNavigate();

	const id = window.sessionStorage.getItem("user");

	const user = useSelector((state) => state.root.data.users[id]);
	const loading = useSelector((state) => state.root.meta.loading);
	const [isAdmin, setIsAdmin] = useState(false);

	useEffect(() => {
		if (!id) navigate("/login");
		if (loading) return;

		setIsAdmin(user.powers === "admin");
		//eslint-disable-next-line
	}, [loading, user]);

	useEffect(() => {
		window.addEventListener("mouseup", function (event) {
			var navbar = document.getElementById("navbar");
			if (
				event.target !== navbar &&
				event.target.parentNode.parentNode !== navbar
			) {
				setExtend(false);
			}
		});

		return window.removeEventListener("mouseup", () => {});
	}, [extend]);

	return (
		<div id="navbar" className={`navbar ${extend && "nav-extended"}`}>
			<div
				className={`nav-extend ${extend && "nav-extend-extended"}`}
				onClick={() => setExtend(!extend)}
			>
				<img src="./assets/icons/navextend.svg" alt="" className="icon" />
			</div>

			<div
				className={`nav-container ${extend && "nav-container-extended"}`}
				id="navbar-cont"
			>
				{!loading && (
					<>
						<Link to="/" className="link nav-link">
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Home" placement="right">
										<img
											src="./assets/icons/homeIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									HOME
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.vessels.pmi.fareast === "hide" &&
									user.vessels.pmi.other_sectors === "hide" &&
									user.vessels.ecl.import === "hide" &&
									user.vessels.ecl.export === "hide" &&
									"none",
							}}
							to="/vessel-status"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Vessel Status" placement="right">
										<img
											src="./assets/icons/vesselsIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									VESSEL STATUS
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.cargo.prospects === "hide" &&
									user.cargo.fixed_by_us === "hide" &&
									user.cargo.fixed_by_others === "hide" &&
									user.cargo.general_competition === "hide" &&
									"none",
							}}
							to="/cargo"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Cargo Status" placement="right">
										<img
											src="./assets/icons/cargoIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									CARGO STATUS
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.vessel_list.eci === "hide" &&
									user.vessel_list.wci === "hide" &&
									"none",
							}}
							to="/vessel_list"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Vessel List" placement="right">
										<img
											src="./assets/icons/vessel-list.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									VESSEL LIST
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.competitors.granite === "hide" &&
									user.competitors.non_granite === "hide" &&
									user.competitors.other_sectors === "hide" &&
									user.competitors.tonnages_open === "hide" &&
									user.competitors.tonnages_loading === "hide" &&
									"none",
							}}
							to="/competitors"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Competitors" placement="right">
										<img
											src="./assets/icons/competitorsIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									COMPETITORS
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.branch_follow_ups === "hide" &&
									"none",
							}}
							to="/branch_follow_ups"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Branch Follow ups" placement="right">
										<img
											src="./assets/icons/branchIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									BRANCH FOLLOW UPS
								</div>
							</div>
						</Link>

						<Link
							style={{
								display:
									!loading &&
									!isAdmin &&
									user.ho_follow_ups === "hide" &&
									"none",
							}}
							to="/ho_follow_ups"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="HO Follow ups" placement="right">
										<img
											src="./assets/icons/hoIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									HO FOLLOW UPS
								</div>
							</div>
						</Link>

						<Link
							style={{
								display: !loading && !isAdmin && "none",
							}}
							to="/archives"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Archives" placement="right">
										<img
											src="./assets/icons/archivesIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									ARCHIVES
								</div>
							</div>
						</Link>

						<Link
							style={{
								display: !loading && !isAdmin && "none",
							}}
							to="/users"
							className="link nav-link"
						>
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Users" placement="right">
										<img
											src="./assets/icons/usersIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									USERS
								</div>
							</div>
						</Link>

						<Link to="/profile" className="link nav-link">
							<div className="nav-item">
								<div className="nav-icon">
									<Tooltip title="Profile Settings" placement="right">
										<img
											src="./assets/icons/settingsIcon.svg"
											alt=""
											className="icon"
										/>
									</Tooltip>
								</div>
								<div className={`nav-txt ${extend && "nav-txt-extended"}`}>
									PROFILE SETTINGS
								</div>
							</div>
						</Link>
					</>
				)}
			</div>
		</div>
	);
}

export default Navbar;
