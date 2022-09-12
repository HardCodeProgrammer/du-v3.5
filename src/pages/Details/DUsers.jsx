import {
	Alert,
	AlertTitle,
	Checkbox,
	CircularProgress,
	FormControl,
	Icon,
	IconButton,
	InputLabel,
	ListItemText,
	MenuItem,
	OutlinedInput,
	Select,
	Snackbar,
	TextField,
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Mui";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import "../../styles/details.css";
import uuid from "react-uuid";
import dateFormat from "dateformat";
import { useDispatch } from "react-redux/es/exports";
import { addData, editData } from "../../utils/redux/reducers";
import Neon from "../../utils/api/neon";
import Close from "@mui/icons-material/Close";

function DUsers() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");
	const u_Data = useSelector((s) => s.root.data.users[user]);

	const [opens_bar, setOpens_bar] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");
	const branches = [
		"Chennai",
		"Chennai FFT",
		"Krishnapatnam",
		"Vizag",
		"Karwar",
		"Mangalore",
	];

	const sectors = [
		"Far East / SEA / BOB",
		"Europe",
		"PG",
		"Africa/America",
		"Coastal",
		"Cargo Heads up",
		"Cargo Prospects - ex TN & AP",
	];

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	path.pop();

	const state = useSelector((s) => s.root.data.users);
	const loading = useSelector((s) => s.root.meta.loading);

	const [processing, setProcessing] = useState(id);

	const [data, setData] = useState({
		user: user,
		fullname: "",
		username: "",
		email: "",
		powers: "",
		vessels: {
			pmi: {
				fareast: "",
				other_sectors: "",
			},
			ecl: {
				import: "",
				export: "",
			},
		},
		cargo: {
			prospects: "",
			sectors: [],
			fixed_by_us: "",
			fixed_by_others: "",
			general_competition: "",
		},
		branch_follow_ups: "",
		branches: [],
		ho_follow_ups: "",
		vessel_list: {
			eci: "",
			wci: "",
		},
		competitors: {
			granite: "",
			non_granite: "",
			other_sectors: "",
			tonnages_open: "",
			tonnages_loading: "",
		},
		recent_activity: {},
		notifications: {},
		status: "Active",
		date_created: "",
		password: "",
		id: user,
		last_login: "",
	});

	useEffect(() => {
		if (data.powers !== "admin") return;
		setData({
			...data,
			vessels: {
				pmi: {
					fareast: "view_edit",
					other_sectors: "view_edit",
				},
				ecl: {
					import: "view_edit",
					export: "view_edit",
				},
			},
			cargo: {
				prospects: "view_edit",
				fixed_by_us: "view_edit",
				sectors: sectors,
				fixed_by_others: "view_edit",
				general_competition: "view_edit",
			},
			branch_follow_ups: "view_edit",
			branches: branches,
			ho_follow_ups: "view_edit",
			vessel_list: {
				eci: "view_edit",
				wci: "view_edit",
			},
			competitors: {
				granite: "view_edit",
				non_granite: "view_edit",
				other_sectors: "view_edit",
				tonnages_open: "view_edit",
				tonnages_loading: "view_edit",
			},
		});
		// eslint-disable-next-line
	}, [data.powers]);

	useEffect(() => {
		if (!loading && id) {
			let user = state[id];

			setData(user);
		}

		if (!id) {
			if (!u_Data) return;
			setData({
				...data,
				date_created: `${dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss")}`,
			});
		}

		// eslint-disable-next-line
	}, [loading, u_Data, processing]);

	function submit() {
		setProcessing(true);
		if (id) {
			dispatch(
				editData({
					path: `users/${id}`,
					data: data,
				})
			);
			Neon.put(`/users/${id}`, data)
				.then((_) => {
					window.sessionStorage.setItem("action", "User Edited successfully");
					navigate("/users");
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `users/${_id}`,
					data: { ...data, user: _id, id: _id },
				})
			);

			Neon.put(`/users/${_id}`, { ...data, user: _id, id: _id })
				.then((_) => {
					window.sessionStorage.setItem("action", "Users Added successfully");
					navigate("/users");
				})
				.catch((err) => setOpens_bar(true));
		}
	}

	return (
		<>
			<Snackbar
				open={opens_bar}
				autoHideDuration={4000}
				anchorOrigin={{ horizontal: "right", vertical: "top" }}
			>
				<Alert severity="error">
					<AlertTitle>ERROR</AlertTitle>
					Something went wrong !! Please try again later
				</Alert>
			</Snackbar>
			<div className="container vertical">
				{loading ? (
					<div className="loading">
						<CircularProgress thickness={4} />
					</div>
				) : (
					<>
						<div className="details-header">
							<div className="details-header-txt">
								<p>USER</p>
								<h2>{!id ? "New User" : data.fullname}</h2>
								<p>{`Created at ${data.date_created}` || ""}</p>
							</div>

							<Tooltip title={!processing ? "Cancel Edit" : "Edit User"}>
								<IconButton onClick={() => setProcessing(!processing)}>
									<Icon style={{ color: "white" }}>
										{!processing ? <Close /> : <EditIcon />}
									</Icon>
								</IconButton>
							</Tooltip>
						</div>

						<div className="details-content">
							<TextField
								disabled={processing}
								required
								label="Display Name"
								value={data.fullname}
								onChange={(e) => setData({ ...data, fullname: e.target.value })}
							/>
							<TextField
								disabled={processing}
								required
								label="User name"
								value={data.username}
								onChange={(e) => setData({ ...data, username: e.target.value })}
							/>

							<TextField
								disabled={processing}
								required
								label="Email Address"
								value={data.email}
								onChange={(e) => setData({ ...data, email: e.target.value })}
							/>

							<FormControl>
								<InputLabel id="admin-id" style={{ marginLeft: 10 }}>
									Type of Account *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing}
									value={data.powers}
									onChange={(e) => setData({ ...data, powers: e.target.value })}
									label="Type of Account"
								>
									<MenuItem value="admin">Admin</MenuItem>
									<MenuItem value="none">General User</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									PMI Far east Vessels *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									required
									value={data.vessels.pmi.fareast}
									onChange={(e) =>
										setData({
											...data,
											vessels: {
												...data.vessels,
												pmi: {
													...data.vessels.pmi,
													fareast: e.target.value,
												},
											},
										})
									}
									label="PMI Far east Vessels"
									defaultValue="View Only"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									PMI Other Sectors Vessels *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.vessels.pmi.other_sectors}
									onChange={(e) =>
										setData({
											...data,
											vessels: {
												...data.vessels,
												pmi: {
													...data.vessels.pmi,
													other_sectors: e.target.value,
												},
											},
										})
									}
									label="PMI Other sectors Vessels"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									ECL Import Vessels *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.vessels.ecl.import}
									onChange={(e) =>
										setData({
											...data,
											vessels: {
												...data.vessels,
												ecl: {
													...data.vessels.ecl,
													import: e.target.value,
												},
											},
										})
									}
									label="ECL Import Vessels"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									ECL Export Vessels *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.vessels.ecl.export}
									onChange={(e) =>
										setData({
											...data,
											vessels: {
												...data.vessels,
												ecl: {
													...data.vessels.ecl,
													export: e.target.value,
												},
											},
										})
									}
									label="ECL Export Vessels"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Cargo Prospects *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.cargo.prospects}
									onChange={(e) =>
										setData({
											...data,
											cargo: {
												...data.cargo,
												prospects: e.target.value,
											},
										})
									}
									label="Cargo Prospects"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="demo-multiple-checkbox-label">
									Cargo Prospects - Sectors
								</InputLabel>
								<Select
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									style={{ width: 300 }}
									disabled={
										processing ||
										data.powers === "admin" ||
										data.cargo.prospects === "hide"
									}
									multiple
									value={data.cargo.sectors || []}
									onChange={(event) => {
										const {
											target: { value },
										} = event;
										setData({
											...data,
											cargo: {
												...data.cargo,

												sectors:
													typeof value === "string" ? value.split(",") : value, // On autofill we get a stringified value.
											},
										});
									}}
									input={<OutlinedInput label="Cargo Prospects - Sectors" />}
									renderValue={(selected) => selected.join(", ")}
								>
									{sectors.map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox
												checked={data.cargo.sectors.indexOf(name) > -1}
											/>
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Cargo Fixed By Us *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.cargo.fixed_by_us}
									onChange={(e) =>
										setData({
											...data,
											cargo: {
												...data.cargo,
												fixed_by_us: e.target.value,
											},
										})
									}
									label="Cargo Fixed By Us"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Cargo Offered & Lost to Others *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									required
									disabled={processing || data.powers === "admin"}
									variant="outlined"
									value={data.cargo.fixed_by_others}
									onChange={(e) =>
										setData({
											...data,
											cargo: {
												...data.cargo,
												fixed_by_others: e.target.value,
											},
										})
									}
									label="Cargo Offered & Lost to Others"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Cargo General Competition *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.cargo.general_competition}
									onChange={(e) =>
										setData({
											...data,
											cargo: {
												...data.cargo,
												general_competition: e.target.value,
											},
										})
									}
									label="Cargo Fixed By Others"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									HO Follow ups *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.ho_follow_ups}
									onChange={(e) =>
										setData({
											...data,
											ho_follow_ups: e.target.value,
										})
									}
									label="HO Follow ups"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Branch Follow ups *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.branch_follow_ups}
									onChange={(e) =>
										setData({
											...data,
											branch_follow_ups: e.target.value,
										})
									}
									label="HO Follow ups"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="demo-multiple-checkbox-label">
									Branches
								</InputLabel>
								<Select
									labelId="demo-multiple-checkbox-label"
									id="demo-multiple-checkbox"
									style={{ width: 300 }}
									disabled={
										processing ||
										data.powers === "admin" ||
										data.branch_follow_ups === "hide"
									}
									multiple
									value={data.branches || []}
									onChange={(event) => {
										const {
											target: { value },
										} = event;
										setData({
											...data,
											branches:
												typeof value === "string" ? value.split(",") : value, // On autofill we get a stringified value.
										});
									}}
									input={<OutlinedInput label="Branches" />}
									renderValue={(selected) => selected.join(", ")}
								>
									{branches.sort().map((name) => (
										<MenuItem key={name} value={name}>
											<Checkbox checked={data.branches.includes(name)} />
											<ListItemText primary={name} />
										</MenuItem>
									))}
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Vessel List ECi *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.vessel_list.eci}
									onChange={(e) =>
										setData({
											...data,
											vessel_list: {
												...data.vessel_list,
												eci: e.target.value,
											},
										})
									}
									label="Vessel List ECI"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Vessel List WCI *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.vessel_list.wci}
									onChange={(e) =>
										setData({
											...data,
											vessel_list: {
												...data.vessel_list,
												wci: e.target.value,
											},
										})
									}
									label="Vessel List WCI"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access </MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Competitors Granite *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.competitors.granite}
									onChange={(e) =>
										setData({
											...data,
											competitors: {
												...data.competitors,
												granite: e.target.value,
											},
										})
									}
									label="Competitors - Granite Vessels"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Competitors Non Granite *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.competitors.non_granite}
									onChange={(e) =>
										setData({
											...data,
											competitors: {
												...data.competitors,
												non_granite: e.target.value,
											},
										})
									}
									label="Competitors - Non Granite Vessels"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Competitors Other Sectors *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									label="Competitors Other Sectors"
									variant="outlined"
									value={data.competitors.other_sectors}
									onChange={(e) =>
										setData({
											...data,
											competitors: {
												...data.competitors,
												other_sectors: e.target.value,
											},
										})
									}
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Non Granite Tonnages Open *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.competitors.tonnages_open}
									onChange={(e) =>
										setData({
											...data,
											competitors: {
												...data.competitors,
												tonnages_open: e.target.value,
											},
										})
									}
									label="Non Granite Tonnages Open"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<FormControl>
								<InputLabel id="age-id" style={{ marginLeft: 10 }}>
									Tonnages Loading *
								</InputLabel>
								<Select
									style={{ width: 300 }}
									disabled={processing || data.powers === "admin"}
									required
									variant="outlined"
									value={data.competitors.tonnages_loading}
									onChange={(e) =>
										setData({
											...data,
											competitors: {
												...data.competitors,
												tonnages_loading: e.target.value,
											},
										})
									}
									label="Tonnages Loading"
								>
									<MenuItem value="hide">Hide</MenuItem>
									<MenuItem value="view_only">Limited Access</MenuItem>
									<MenuItem value="view_edit">Full Access</MenuItem>
								</Select>
							</FormControl>

							<div className="details-btns">
								<Button
									disabled={
										processing ||
										data.fullname === "" ||
										data.username === "" ||
										data.email === ""
									}
									cvar="filled"
									startIcon={<CheckCircleIcon />}
									onClick={submit}
								>
									Submit
								</Button>
								<Button
									cvar="outlined"
									startIcon={<ArrowBackIcon />}
									onClick={() => navigate("/users")}
								>
									Back
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</>
	);
}

export default DUsers;
