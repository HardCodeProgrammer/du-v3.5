import {
	Alert,
	AlertTitle,
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

function DBranch() {
	const params = useParams();
	const user = window.sessionStorage.getItem("user");
	const u_Data = useSelector((s) => s.root.data.users[user]);

	const [opens_bar, setOpens_bar] = useState(false);

	const dispatch = useDispatch();

	const navigate = useNavigate();

	const target = params["*"];

	const path = target.split("/");
	const [canEdit, setCanEdit] = useState(false);

	const [processing, setProcessing] = useState(false);

	const id = path[path.length - 2] !== "new" && path[path.length - 2];
	const tab_index = path[path.length - 1];
	path.pop();

	const state = useSelector((s) => s.root.data.branch_follow_ups);
	const loading = useSelector((s) => s.root.meta.loading);

	const [data, setData] = useState({
		u_id: user,
		status: "none",
		pic: "",
		task: "",
		start_date: "",
		target_date: "",
		comments: "",
		created_at: "",
		last_updated: "",
	});

	useEffect(() => {
		if (!u_Data) return;
		setProcessing(u_Data.branch_follow_ups !== "view_edit");
		setCanEdit(u_Data.branch_follow_ups === "view_edit");
	}, [u_Data]);
	useEffect(() => {
		if (!loading && id) {
			let followup = path.reduce((p, c) => {
				p = p[c];
				return p;
			}, state);

			setData(followup);
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
					path: `branch_follow_ups/${path[0]}/${id}`,
					data: {
						...data,
						last_updated: `${data.last_updated}\n${dateFormat(
							new Date(),
							"dd-mmm-yyyy HH:MM:ss"
						)} by ${u_Data.fullname}`,
					},
				})
			);
			Neon.put(`/branch_follow_ups/${path[0]}/${id}`, {
				...data,
				last_updated: `${data.last_updated}\n${dateFormat(
					new Date(),
					"dd-mmm-yyyy HH:MM:ss"
				)} by ${u_Data.fullname}`,
			})
				.then((_) => {
					window.sessionStorage.setItem(
						"action",
						"Follow up Edited successfully"
					);
					navigate("/branch_follow_ups?val=" + tab_index);
				})
				.catch((err) => setOpens_bar(true));
		} else {
			var _id = uuid();

			dispatch(
				addData({
					path: `branch_follow_ups/${path[0]}/${_id}`,
					data: data,
				})
			);

			Neon.put(`/branch_follow_ups/${path[0]}/${_id}`, data)
				.then((_) => {
					window.sessionStorage.setItem(
						"action",
						"Follow up Added successfully"
					);
					navigate("/branch_follow_ups?val=" + tab_index);
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
								<p>TASK</p>
								<h2>
									{!id
										? "New Task"
										: `${data.task.substring(0, 45)}${
												data.task.length > 45 ? "...." : ""
										  }`}
								</h2>
								<p>{`Created at ${data.created_at}` || ""}</p>
							</div>

							<Tooltip title="Follow up Status" placement="left">
								<Select
									onChange={(e) => setData({ ...data, status: e.target.value })}
									value={data.status || "none"}
									disabled={processing || !canEdit}
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

							{canEdit && (
								<Tooltip title={!processing ? "Cancel Edit" : "Edit Task"}>
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
								style={{ width: 400 }}
								label="Task"
								value={data.task}
								onChange={(e) => setData({ ...data, task: e.target.value })}
							/>

							<DatePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label="Start Date"
								value={data.start_date || null}
								onChange={(date) => {
									setData({
										...data,
										start_date: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy"
								renderInput={(params) => <TextField {...params} />}
							/>

							<DatePicker
								disabled={processing}
								clearable
								variant="dialog"
								ampm={false}
								label="Target Date"
								value={data.target_date || null}
								onChange={(date) => {
									setData({
										...data,
										target_date: date || null,
									});
								}}
								inputFormat="dd/MM/yyyy"
								renderInput={(params) => <TextField {...params} />}
							/>

							<TextField
								disabled={processing}
								label="Status Updates / Comments / Next Follow ups"
								multiline
								rows={5}
								sx={{ width: "90%" }}
								value={data.comments}
								onChange={(e) => setData({ ...data, comments: e.target.value })}
							/>

							<div className="details-btns">
								<Button
									disabled={processing || data.pic === "" || data.task === ""}
									cvar="filled"
									startIcon={<CheckCircleIcon />}
									onClick={submit}
								>
									Submit
								</Button>
								<Button
									cvar="outlined"
									startIcon={<ArrowBackIcon />}
									onClick={() =>
										navigate("/branch_follow_ups?val=" + tab_index)
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

export default DBranch;
