import {
	Alert,
	AlertTitle,
	Autocomplete,
	CircularProgress,
	Icon,
	IconButton,
	Snackbar,
	TextField,
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
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

function DCompetitors() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");
	const u_Data = useSelector((s) => s.root.data.users[user]);

	const [opens_bar, setOpens_bar] = useState(false);

	const isArchives = window.location.href.includes("archives");

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");

	const [processing, setProcessing] = useState(false);

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	const tab_index = path[path.length - 1];
	path.pop();

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

	const [canEdit, setCanEdit] = useState(false);

	const state = useSelector((s) => s.root.data.competitors);
	const archives = useSelector((s) => s.root.data.archives.competitors);

	const loading = useSelector((s) => s.root.meta.loading);

	const [data, setData] = useState({
		u_id: user,
		pic: "",
		line: "",
		name: "",
		dwt: "",
		port: "",
		npc: "",
		arrived: "",
		berthed: "",
		lay_can: "",
		sailed: "",
		total_qty: "",
		remarks: "",
		cargo: "",
		created_at: "",
		last_updated: "",
	});

	useEffect(() => {
		if (!u_Data) return;
		setCanEdit(u_Data.competitors[path[0]] === "view_edit");
		setProcessing(u_Data.competitors[path[0]] !== "view_edit");

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

		if (!loading && id) {
			let vessel = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, state);

			setData(vessel);
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
					path: `competitors/${path[0]}${path[1] ? `/${path[1]}` : ""}/${id}`,
					data: {
						...data,
						last_updated: `${dateFormat(
							new Date(),
							"dd-mmm-yyyy HH:MM:ss"
						)} by ${u_Data.fullname}`,
					},
				})
			);
			Neon.put(`/competitors/${path[0]}${path[1] ? `/${path[1]}` : ""}/${id}`, {
				...data,
				last_updated: `${dateFormat(new Date(), "dd-mmm-yyyy HH:MM:ss")} by ${
					u_Data.fullname
				}`,
			})
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Edited successfully");
					navigate("/competitors?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `competitors/${path[0]}${path[1] ? `/${path[1]}` : ""}/${_id}`,
					data: data,
				})
			);

			Neon.put(
				`/competitors/${path[0]}${path[1] ? `/${path[1]}` : ""}/${_id}`,
				data
			)
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Added successfully");
					navigate("/competitors?val=" + tab_index);
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
								<p>Vessel</p>
								<h2>{!id ? "New Vessel" : data.name}</h2>
								<p>{`Created at ${data.created_at}` || ""}</p>
								<p>
									{data.last_updated !== "" &&
										`Last updated at ${data.last_updated}`}
								</p>
							</div>

							{!isArchives &&
								(canEdit ? (
									<Tooltip title={!processing ? "Cancel Edit" : "Edit Vessel"}>
										<IconButton onClick={() => setProcessing(!processing)}>
											<Icon style={{ color: "white" }}>
												{!processing ? <Close /> : <EditIcon />}
											</Icon>
										</IconButton>
									</Tooltip>
								) : (
									""
								))}
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
								style={{ width: 400 }}
								label="Line"
								value={data.line}
								onChange={(e) => setData({ ...data, line: e.target.value })}
							/>

							<TextField
								disabled={processing}
								required
								style={{ width: 400 }}
								label="Vessel Name"
								value={data.name}
								onChange={(e) => setData({ ...data, name: e.target.value })}
							/>

							<TextField
								disabled={processing}
								style={{ width: 400 }}
								label="dwt"
								value={data.dwt}
								onChange={(e) => setData({ ...data, dwt: e.target.value })}
							/>

							<DesktopDatePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label="Arrived On"
								value={data.arrived || null}
								onChange={(date) => {
									setData({
										...data,
										arrived: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy"
								renderInput={(params) => <TextField {...params} />}
							/>

							<DesktopDatePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label="Berthed On"
								value={data.berthed || null}
								onChange={(date) => {
									setData({
										...data,
										berthed: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy"
								renderInput={(params) => <TextField {...params} />}
							/>

							<DesktopDatePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label="Sailed On"
								value={data.sailed || null}
								onChange={(date) => {
									setData({
										...data,
										sailed: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy"
								renderInput={(params) => <TextField {...params} />}
							/>

							<TextField
								disabled={processing}
								style={{ width: 400 }}
								label="Qty Loaded"
								value={data.total_qty}
								onChange={(e) =>
									setData({ ...data, total_qty: e.target.value })
								}
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
										label="Load Port"
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
										label="Disport"
										value={data.npc}
										onChange={(e) => setData({ ...data, npc: e.target.value })}
										sx={{ width: 220 }}
									/>
								)}
							/>

							<TextField
								disabled={processing}
								label="Remarks"
								multiline
								rows={5}
								sx={{ width: "90%" }}
								value={data.remarks}
								onChange={(e) => setData({ ...data, remarks: e.target.value })}
							/>

							<div className="details-btns">
								{!isArchives && (
									<Button
										disabled={processing || data.pic === "" || data.name === ""}
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
											navigate(
												`${
													isArchives ? "/archives?val=" : "/competitors?val="
												}` + tab_index
											)
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

export default DCompetitors;
