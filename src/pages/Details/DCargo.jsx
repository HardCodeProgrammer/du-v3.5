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
import CargoTemplate from "../../utils/templates/cargo";

function DCargo() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");

	const [processing, setProcessing] = useState(false);
	const [opens_bar, setOpens_bar] = useState(false);

	const isArchives = window.location.href.includes("archives");

	const dispatch = useDispatch();

	const u_Data = useSelector((s) => s.root.data.users[user]);

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	const tab_index = path[path.length - 1];
	path.pop();

	const state = useSelector((s) => s.root.data.cargo);
	const archives = useSelector((s) => s.root.data.archives.cargo);

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
		enq_date: "",
		offer_bid: "",
		source: "",
		shipper: "",
		port: "",
		npc: "",
		cargo_particulars: "",
		quantity: "",
		lay_can: "",
		freight_indication: "",
		followups: "",
		name: "",
		dwt: "",
		open: "",
		built: "",
		owners: "",
		date: "",
		hire: "",
		ops_remarks: "",
		created_at: "",
		last_updated: "",
	});

	useEffect(() => {
		if (!loading && id && isArchives) {
			let cargo = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, archives);

			setData(cargo);
			return;
		}

		if (!loading && id) {
			let cargo = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, state);

			setData(cargo);
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
	}, [loading, u_Data]);

	function submit() {
		setProcessing(true);
		if (id) {
			dispatch(
				editData({
					path: `cargo/${path[0]}${path[1] ? `/${path[1]}` : ""}/${id}`,
					data: {
						...data,
						last_updated: `${dateFormat(
							new Date(),
							"dd-mm-yyyy HH:MM:ss"
						)} by ${u_Data.fullname}`,
					},
				})
			);
			Neon.put(`cargo/${path[0]}${path[1] ? `/${path[1]}` : ""}/${id}`, {
				...data,
				last_updated: `${dateFormat(new Date(), "dd-mm-yyyy HH:MM:ss")} by ${
					u_Data.fullname
				}`,
			})
				.then((_) => {
					window.sessionStorage.setItem("action", "Cargo Edited successfully");

					navigate("/cargo?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `cargo/${path[0]}${path[1] ? `/${path[1]}` : ""}/${_id}`,
					data: data,
				})
			);

			Neon.put(`/cargo/${path[0]}${path[1] ? `/${path[1]}` : ""}/${_id}`, data)
				.then((_) => {
					window.sessionStorage.setItem("action", "Cargo Added successfully");
					Neon.mail(
						"no-reply@puyvast-dailyupdates.co.in",
						["operations@puyvast.co.in"],
						"Prudent@2512",
						"Alert - New Cargo Enquiry",
						CargoTemplate(
							data,
							"puyvast-dailyupdates.co.in/cargo?val=" + tab_index
						)
					);
					navigate("/cargo?val=" + tab_index);
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
								<p>CARGO</p>
								<h2>{!id ? "New Cargo" : data.cargo_particulars}</h2>
								<p>{`Created at ${data.created_at}` || ""}</p>
								<p>
									{data.last_updated !== "" &&
										`Last updated at ${data.last_updated}`}
								</p>
							</div>

							<Tooltip title="Cargo Priority" placement="left">
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
								<Tooltip title={!processing ? "Cancel Edit" : "Edit Cargo"}>
									<IconButton onClick={() => setProcessing(!processing)}>
										<Icon style={{ color: "white" }}>
											{!processing ? <Close /> : <EditIcon />}
										</Icon>
									</IconButton>
								</Tooltip>
							)}
						</div>

						<div className="details-content">
							<div className="cargo-details">
								<TextField
									disabled={processing}
									required
									label="PIC"
									value={data.pic}
									onChange={(e) => setData({ ...data, pic: e.target.value })}
								/>

								<DateTimePicker
									disabled={processing}
									clearable
									variant="dialog"
									ampm={false}
									label="Enquiry Date"
									value={data.enq_date || null}
									onChange={(date) => {
										setData({
											...data,
											enq_date: date || null,
										});
									}}
									inputFormat="dd/MM/yyyy"
									renderInput={(params) => <TextField {...params} />}
								/>

								<DateTimePicker
									disabled={processing}
									clearable
									variant="dialog"
									ampm={false}
									label="Offer bid Due Date & Time"
									value={data.offer_bid || null}
									onChange={(date) => {
										setData({
											...data,
											offer_bid: date || null,
										});
									}}
									inputFormat="dd/MM/yyyy HH:mm"
									renderInput={(params) => <TextField {...params} />}
								/>

								<TextField
									disabled={processing}
									required
									label="Source"
									value={data.source}
									onChange={(e) => setData({ ...data, source: e.target.value })}
								/>
								<TextField
									disabled={processing}
									label="Shipper / Charter"
									value={data.shipper}
									onChange={(e) =>
										setData({ ...data, shipper: e.target.value })
									}
								/>
								<Autocomplete
									disabled={processing}
									disablePortal
									value={data.port}
									freeSolo
									options={inputPorts.sort()}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Load Port"
											value={data.port}
											sx={{ width: 220 }}
											onChange={(e) =>
												setData({ ...data, port: e.target.value })
											}
										/>
									)}
								/>

								<Autocomplete
									disabled={processing}
									disablePortal
									value={data.npc}
									freeSolo
									options={inputPorts.sort()}
									renderInput={(params) => (
										<TextField
											{...params}
											label="Disport"
											value={data.npc}
											onChange={(e) =>
												setData({ ...data, npc: e.target.value })
											}
											sx={{ width: 220 }}
										/>
									)}
								/>

								<TextField
									disabled={processing}
									label="Cargo Particulars"
									required
									value={data.cargo_particulars}
									sx={{ width: 320 }}
									onChange={(e) =>
										setData({ ...data, cargo_particulars: e.target.value })
									}
								/>
								<TextField
									disabled={processing}
									label="Quantity"
									value={data.quantity}
									onChange={(e) =>
										setData({ ...data, quantity: e.target.value })
									}
								/>

								<TextField
									disabled={processing}
									label="Freight Offered"
									value={data.freight_indication}
									onChange={(e) =>
										setData({ ...data, freight_indication: e.target.value })
									}
								/>

								<TextField
									disabled={processing}
									label={"Follow ups / Remarks"}
									multiline
									required
									rows={5}
									sx={{ width: "90%" }}
									value={data.followups}
									onChange={(e) =>
										setData({ ...data, followups: e.target.value })
									}
								/>
							</div>

							<div className="suit-ves">
								<div className="suit-ves-head-txt">
									<h3>SUITABLE VESSELS</h3>
									<p>For Multiple vessels enter in the next line</p>
								</div>
								<div className="suit-ves-content">
									<TextField
										disabled={processing}
										label="Vessel Name"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 275 }}
										value={data.name}
										onChange={(e) => setData({ ...data, name: e.target.value })}
									/>

									<TextField
										disabled={processing}
										label="DWT / Crane"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 150 }}
										value={data.dwt}
										onChange={(e) => setData({ ...data, dwt: e.target.value })}
									/>

									<TextField
										disabled={processing}
										label="Built"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 100 }}
										value={data.built}
										onChange={(e) =>
											setData({ ...data, built: e.target.value })
										}
									/>

									<TextField
										disabled={processing}
										label="Owners / Source"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 200 }}
										value={data.owners}
										onChange={(e) =>
											setData({ ...data, owners: e.target.value })
										}
									/>

									<TextField
										disabled={processing}
										label="Open Area"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 150 }}
										value={data.open}
										onChange={(e) => setData({ ...data, open: e.target.value })}
									/>

									<TextField
										disabled={processing}
										label="Open Date"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 150 }}
										value={data.date}
										onChange={(e) => setData({ ...data, date: e.target.value })}
									/>

									<TextField
										disabled={processing}
										label="Operations Remarks"
										variant="outlined"
										multiline
										rows={4}
										style={{ minWidth: 350 }}
										value={data.ops_remarks}
										onChange={(e) =>
											setData({ ...data, ops_remarks: e.target.value })
										}
									/>
								</div>
							</div>

							<div className="details-btns">
								{!isArchives && (
									<Button
										disabled={
											processing ||
											data.pic === "" ||
											data.source === "" ||
											data.cargo_particulars === "" ||
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
											navigate(
												`${isArchives ? "/archives?val=" : "/cargo?val="}` +
													tab_index
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

export default DCargo;
