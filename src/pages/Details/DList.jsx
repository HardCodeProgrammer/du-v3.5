import {
	Alert,
	AlertTitle,
	CircularProgress,
	Icon,
	IconButton,
	Snackbar,
	TextField,
	Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
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

function DList() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");
	const u_Data = useSelector((s) => s.root.data.users[user]);

	const [opens_bar, setOpens_bar] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");

	const [processing, setProcessing] = useState(false);

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	const tab_index = path[path.length - 1];
	path.pop();

	const state = useSelector((s) => s.root.data.vessel_list);
	const loading = useSelector((s) => s.root.meta.loading);

	const [data, setData] = useState({
		u_id: user,
		vessel: "",
		open_area: "",
		open_dates: "",
		dwt: "",
		built: "",
		loa: "",
		beam: "",
		draft: "",
		gear: "",
		source: "",
		remark: "",
		month: "",
		created_at: "",
		last_updated: "",
	});

	/* 	useEffect(() => {
		if (!u_Data) return;
		setProcessing(
			u_Data.vessels[path[0]][path[1] === "fareast" ? "far_east" : path[1]] ===
				"view_edit"
		);
		// eslint-disable-next-line
	}, [u_Data]); */

	useEffect(() => {
		if (!loading && id) {
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
					path: `vessel_list/${path[0]}/${id}`,
					data: {
						...data,
						last_updated: `${dateFormat(
							new Date(),
							"dd-mm-yyyy HH:MM:ss"
						)} by ${u_Data.fullname}`,
					},
				})
			);
			Neon.put(`/vessel_list/${path[0]}/${id}`, {
				...data,
				last_updated: `${dateFormat(new Date(), "dd-mm-yyyy HH:MM:ss")} by ${
					u_Data.fullname
				}`,
			})
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Edited successfully");
					navigate("/vessel_list?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `vessel_list/${path[0]}/${_id}`,
					data: data,
				})
			);

			Neon.put(`/vessel_list/${path[0]}/${_id}`, data)
				.then((_) => {
					window.sessionStorage.setItem("action", "Vessel Added successfully");
					navigate("/vessel_list?val=" + tab_index);
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
								<h2>{!id ? "New Vessel" : data.vessel}</h2>
								<p>{`Created at ${data.created_at}` || ""}</p>
								<p>
									{data.last_updated !== "" &&
										`Last updated at ${data.last_updated}`}
								</p>
							</div>

							<Tooltip title={!processing ? "Cancel Edit" : "Edit Vessel"}>
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
								label="Vessel Name"
								value={data.vessel}
								onChange={(e) => setData({ ...data, vessel: e.target.value })}
							/>

							<DatePicker
								disabled={processing}
								clearable
								openTo="month"
								views={["year", "month"]}
								variant="dialog"
								ampm={false}
								label="Month"
								value={data.month || null}
								onChange={(date) => {
									setData({
										...data,
										month: date || null,
									});
								}}
								renderInput={(params) => <TextField {...params} />}
							/>
							<TextField
								disabled={processing}
								label="Open Area"
								value={data.open_area}
								onChange={(e) =>
									setData({ ...data, open_area: e.target.value })
								}
							/>

							<TextField
								disabled={processing}
								label="Open Dates"
								value={data.open_dates}
								onChange={(e) =>
									setData({ ...data, open_dates: e.target.value })
								}
							/>
							<TextField
								disabled={processing}
								label="DWT"
								value={data.dwt}
								onChange={(e) => setData({ ...data, dwt: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Built"
								value={data.built}
								onChange={(e) => setData({ ...data, built: e.target.value })}
							/>
							<TextField
								disabled={processing}
								label="LOA"
								value={data.loa}
								onChange={(e) => setData({ ...data, loa: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Beam"
								value={data.beam}
								onChange={(e) => setData({ ...data, beam: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Draft"
								value={data.draft}
								onChange={(e) => setData({ ...data, draft: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Gear"
								value={data.gear}
								onChange={(e) => setData({ ...data, gear: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Source"
								value={data.source}
								onChange={(e) => setData({ ...data, source: e.target.value })}
							/>

							<TextField
								disabled={processing}
								label="Remarks"
								multiline
								rows={5}
								sx={{ width: "90%" }}
								value={data.remark}
								onChange={(e) => setData({ ...data, remark: e.target.value })}
							/>

							<div className="details-btns">
								<Button
									disabled={
										processing || data.vessel === "" 
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
									onClick={() => navigate("/vessel_list?val=" + tab_index)}
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

export default DList;
