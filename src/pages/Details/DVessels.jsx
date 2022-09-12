import {
	Alert,
	AlertTitle,
	Autocomplete,
	CircularProgress,
	Icon,
	IconButton,
	MenuItem,
	Select,
	Snackbar,
	TextField,
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
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

function DVessels() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");
	const u_Data = useSelector((s) => s.root.data.users[user]);

	const isArchives = window.location.href.includes("archives");

	const [opens_bar, setOpens_bar] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");

	const [processing, setProcessing] = useState(false);

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	const tab_index = path[path.length - 1];
	path.pop();

	const state = useSelector((s) => s.root.data.vessels);
	const archives = useSelector((s) => s.root.data.archives.vessels);
	const loading = useSelector((s) => s.root.meta.loading);

	const inputPorts = [
		"Kolkata",
		"Kandla",
		"Yangoon",
		"Mongla",
		"Chennai",
		"Kattupalli",
		"Krishnapatnam",
		"Vizag",
		"Gangavaram",
		"Singapore",
		"Kakinada",
		"Haldia",
		"Paradip",
		"Goa",
		"Mumbai",
		"Xiamen",
	];

	const [data, setData] = useState({
		u_id: user,
		status: "none",
		pic: "",
		name: "",
		dwt: "",
		port: "",
		npc: "",
		hire: "",
		cargo: "",
		arrived: "",
		berthed: "",
		total_qty: "",
		completed: "",
		balance: "",
		etcd: "",
		comments: "",
		followups: "",
		created_at: "",
		last_updated: "",
	});

	useEffect(() => {
		if (!u_Data) return;
		setProcessing(
			u_Data.vessels[path[0]][path[1] === "fareast" ? "far_east" : path[1]] ===
				"view_edit"
		);
		// eslint-disable-next-line
	}, [u_Data]);

	useEffect(() => {
		if (!loading && id && isArchives) {
			let vessels = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, archives);

			setData(vessels);
			return;
		}

		if (!loading && id && !isArchives) {
			let vessels = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, state);

			setData(vessels);
		}

		if (!id) {
			if (!u_Data) return;
			setData({
				...data,
				created_at: `${dateFormat(new Date(), "dd/mm/yyyy HH:MM:ss")} by ${
					u_Data.fullname
				}`,
			});
		}

		// eslint-disable-next-line
	}, [loading, u_Data, processing]);


	function submit() {
		setProcessing(true);
		if (id) {
			dispatch(
				editData({
					path: `vessels/${path[0]}/${path[1]}/${path[2]}/${id}`,
					data: {
						...data,
						last_updated: `${dateFormat(
							new Date(),
							"dd-mm-yyyy HH:MM:ss"
						)} by ${u_Data.fullname}`,
					},
				})
			);
			Neon.put(`/vessels/${path[0]}/${path[1]}/${path[2]}/${id}`, {
				...data,
				last_updated: `${dateFormat(new Date(), "dd-mm-yyyy HH:MM:ss")} by ${
					u_Data.fullname
				}`,
			})
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Edited successfully");
					navigate("/vessel-status?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `vessels/${path[0]}/${path[1]}/${path[2]}/${_id}`,
					data: data,
				})
			);

			Neon.put(`/vessels/${path[0]}/${path[1]}/${path[2]}/${_id}`, data)
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Added successfully");
					navigate("/vessel-status?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		}
	}

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
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
								<p>VESSEL</p>
								<h2>{!id ? "New Vessel" : data.name}</h2>
								<p>{`Created at ${data.created_at}` || ""}</p>
								<p>
									{data.last_updated !== "" &&
										`Last updated at ${data.last_updated}`}
								</p>
							</div>

							<Tooltip title="Vessel Status" placement="left">
								<Select
									onChange={(e) => setData({ ...data, status: e.target.value })}
									value={data.status || "none"}
									disabled={processing}
									variant="standard"
									disableUnderline
									style={{
										width: 70,
										textAlign: "center",
										display: "flex",
										justifyContent: "center",
										alignItems: "center",
										height: 80,
									}}
									IconComponent={"div"}
									MenuProps={{
										style: {
											padding: 0,
											display: "flex",
											justifyContent: "center",
										},
									}}
								>
									<MenuItem value="red">
										<span className="status-wrapper red"></span>
									</MenuItem>
									<MenuItem value="yellow">
										<span className="status-wrapper yellow"></span>
									</MenuItem>
									<MenuItem value="green">
										<span className="status-wrapper green"></span>
									</MenuItem>
									<MenuItem value="none">
										<span className="status-wrapper none"></span>
									</MenuItem>
								</Select>
							</Tooltip>

							{!isArchives && (
								<Tooltip title={!processing ? "Cancel Edit" : "Edit Vessel"}>
									<IconButton onClick={() => setProcessing(!processing)}>
										<Icon style={{ color: "white" }}>
											{!processing ? <Close /> : <EditIcon />}
										</Icon>
									</IconButton>
								</Tooltip>
							)}
						</div>

						<div className="details-content">
							<TextField
								disabled={processing}
								required
								label="PIC"
								value={data.pic}
								onChange={(e) => setData({ ...data, pic: e.target.value })}
							/>
							<TextField
								disabled={processing}
								required
								label="Vessel Name"
								value={data.name}
								onChange={(e) => setData({ ...data, name: e.target.value })}
							/>
							<TextField
								disabled={processing}
								label="DWT & Crane"
								value={data.dwt}
								onChange={(e) => setData({ ...data, dwt: e.target.value })}
							/>
							<Autocomplete
								disabled={processing}
								value={data.port}
								disablePortal
								freeSolo
								options={inputPorts.sort()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="Current Port"
										value={data.port}
										sx={{ width: 220 }}
										onChange={(e) => setData({ ...data, port: e.target.value })}
									/>
								)}
							/>

							<Autocomplete
								disabled={processing}
								value={data.npc}
								disablePortal
								freeSolo
								options={inputPorts.sort()}
								renderInput={(params) => (
									<TextField
										{...params}
										label={
											path[2] === "fixed" ? "Arriving Port" : "NPC / Redely"
										}
										value={data.npc}
										onChange={(e) => setData({ ...data, npc: e.target.value })}
										sx={{ width: 220 }}
									/>
								)}
							/>

							<Autocomplete
								disabled={processing}
								disablePortal
								value={data.hire}
								freeSolo
								options={["TC", "VC"].sort()}
								renderInput={(params) => (
									<TextField
										{...params}
										label="CP"
										value={data.hire}
										sx={{ width: 100 }}
										onChange={(e) => setData({ ...data, hire: e.target.value })}
									/>
								)}
							/>

							<TextField
								disabled={processing}
								label="Cargo Particulars"
								required
								value={data.cargo}
								sx={{ width: 320 }}
								onChange={(e) => setData({ ...data, cargo: e.target.value })}
							/>
							<TextField
								disabled={processing}
								label="Total Quantity"
								value={data.total_qty}
								onChange={(e) =>
									setData({ ...data, total_qty: e.target.value })
								}
							/>

							<DateTimePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label={
									path[2] === "fixed"
										? "ETA"
										: path[2] === "berthed"
										? "Arrived"
										: "ETA/Arrived"
								}
								value={data.arrived || null}
								onChange={(date) => {
									setData({
										...data,
										arrived: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy HH:mm"
								renderInput={(params) => <TextField {...params} />}
							/>

							<DateTimePicker
								clearable
								variant="dialog"
								ampm={false}
								label={
									path[2] === "fixed"
										? "ETB"
										: path[2] === "berthed"
										? "Berthed"
										: "ETB/Berthed"
								}
								value={data.berthed || null}
								onChange={(date) => {
									setData({
										...data,
										berthed: date || null,
									});
								}}
								disabled={processing}
								inputFormat="dd/MM/yyyy HH:mm"
								renderInput={(params) => <TextField {...params} />}
							/>

							<DateTimePicker
								clearable
								disabled={processing}
								variant="dialog"
								ampm={false}
								label="ETCD"
								value={data.etcd || null}
								onChange={(date) => {
									setData({
										...data,
										etcd: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy HH:mm"
								renderInput={(params) => <TextField {...params} />}
							/>

							<TextField
								disabled={processing}
								label={
									path[2] === "fixed" ? "Pre Arr SOP" : "Completed Quantity"
								}
								value={data.completed}
								onChange={(e) =>
									setData({ ...data, completed: e.target.value })
								}
							/>
							<TextField
								disabled={processing}
								label={path[2] === "fixed" ? "Pre Arr SOP" : "Balance Quantity"}
								value={data.balance}
								onChange={(e) => setData({ ...data, balance: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label={
									path[2] === "enroute"
										? "Post Voyage Follow Ups"
										: "Follow ups / Remarks"
								}
								multiline
								required
								rows={5}
								sx={{ width: "90%" }}
								value={data.followups}
								onChange={(e) =>
									setData({ ...data, followups: e.target.value })
								}
							/>

							<div className="details-btns">
								{!isArchives && (
									<Button
										disabled={
											processing ||
											data.pic === "" ||
											data.name === "" ||
											data.cargo === "" ||
											data.followups === ""
										}
										cvar="filled"
										startIcon={<CheckCircleIcon />}
										onClick={submit}
									>
										Submit
									</Button>
								)}
								<Button
									cvar="outlined"
									startIcon={<ArrowBackIcon />}
									onClick={() =>
										navigate(
											`${
												isArchives ? "/archives?val=" : "/vessel-status?val="
											}` + tab_index
										)
									}
								>
									Back
								</Button>
							</div>
						</div>
					</>
				)}
			</div>
		</LocalizationProvider>
	);
}

export default DVessels;
