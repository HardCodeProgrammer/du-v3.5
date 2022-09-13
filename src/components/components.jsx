import {
	Alert,
	AlertTitle,
	Checkbox,
	CircularProgress,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControlLabel,
	Icon,
	IconButton,
	MenuItem,
	Radio,
	RadioGroup,
	Select,
	Snackbar,
	Tooltip,
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../styles/components.css";

import { Button } from "../components/Mui";

import DeleteIcon from "@mui/icons-material/Delete";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import dateFormat from "dateformat";
import ExportExcel from "../utils/excel";
import Neon from "../utils/api/neon";

import { useNavigate } from "react-router-dom";
import { deleteData, moveData } from "../utils/redux/reducers";

function TabPanel({ tab_list = [], index = 1, onChange }) {
	return (
		<div className="app-bar">
			{tab_list.map(
				(tab, i) =>
					tab && (
						<div
							className={`app-bar-tab ${index - 1 === i && "active-tab"}`}
							onClick={() => onChange(i)}
							key={i}
						>
							{tab}
						</div>
					)
			)}
		</div>
	);
}

function Tab({ children, index, value }) {
	return (
		index === value - 1 && <div className="table-container">{children}</div>
	);
}

function DataTable({
	data = {}, // The data for the table
	title = "", // The title of the table
	headings = [], // The heading in the correct order corresponding to the keys
	key_order = [], // The order of keys to be displayed in the table
	details_page = "", // Link to the details page
	list = false,
	archives = false,
	half = false,
	searchMeta,
	followups = false,
	sortMeta,
	checked,
	filters = [],
	defaultSortKey,
	target_data = "",
	MoveOptions = [],
	xlFilename,
	tab_index = 0,
}) {
	let rows = [];

	const loading = useSelector((state) => state.root.meta.loading);
	const id = window.sessionStorage.getItem("user");
	const user = useSelector((state) => state.root.data.users[id]);

	const [searchOpen, setSearchOpen] = useState(false);
	const [sortOpen, setSortOpen] = useState(false);
	const [selected, setSelected] = useState(defaultSortKey);
	const [can_edit, setCan_edit] = useState();

	const [_checked, set_checked] = useState(checked);

	const [q, setq] = useState("");

	const [Filters, setFilters] = useState([]);

	for (let id in data) {
		rows.push({ id, ...data[id] });
	}

	const Search = (data) => {
		return data.filter((row) =>
			Filters.some(
				(filter) =>
					row[filter].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
			)
		);
	};

	useEffect(() => {
		if (loading) return;

		const path = target_data.split("/");
		let table_edit;

		if (
			!archives &&
			!path.includes("branch_follow_ups") &&
			!path.includes("prospects")
		) {
			table_edit = path.reduce((p, c) => {
				return p[c === "far_east" ? "fareast" : c];
			}, user);
		}

		if (!archives && path.includes("branch_follow_ups")) {
			table_edit = user.branch_follow_ups;
		}

		if (
			!archives &&
			!path.includes("branch_follow_ups") &&
			path.includes("prospects")
		) {
			table_edit = user.cargo.prospects;
		}

		setCan_edit(user.powers === "admin" || table_edit === "view_edit");

		// eslint-disable-next-line
	}, [loading]);

	//* Handle Change in Filters
	useEffect(() => {
		const selectedFilters = [];
		filters.forEach((filter) => {
			if (_checked[filter]) {
				selectedFilters.push(filter);
			}
			setFilters(selectedFilters);
		});
		// eslint-disable-next-line
	}, [_checked]);

	//* Sort Data
	const sortData = (key, data) => {
		let raw_data = Search(data);
		let sorted_data;

		sorted_data = raw_data.sort(function (a, b) {
			if (!a[key] || !b[key]) return 1;
			if (key === "dwt") {
				if (Number(a[key]) < Number(b[key])) return -1;
			} else if (
				key === "arrived" ||
				key === "berthed" ||
				key === "sailed" ||
				key === "offer_bid" ||
				key === "etcd" ||
				key === "enq_date" ||
				key === "start_date" ||
				key === "target_date" ||
				key === "month"
			) {
				if (Date.parse(a[key]) < Date.parse(b[key])) return -1;
			} else if (a[key].toLowerCase() < b[key].toLowerCase()) return -1;

			return 1;
		});

		return sorted_data || [];
	};

	return (
		<div className={`table-wrapper ${half && "table-half"}`}>
			<div className="table-head">
				<div className="table-search">
					<input
						type="text"
						className="search-txt-box"
						placeholder="Search"
						value={q}
						onChange={(e) => setq(e.target.value)}
					/>
					<img
						src="./assets/icons/searchIcon.svg"
						alt=""
						className="table-icon"
					/>
				</div>
				<div className="table-header-txt">
					<p>{title}</p>
				</div>
				<div className="table-head-btns">
					<Tooltip
						title={
							sortData(selected, rows).length === 0
								? "No data to export"
								: "Export as Excel"
						}
						placement="top"
					>
						<span>
							<IconButton
								disabled={sortData(selected, rows).length === 0}
								onClick={() =>
									ExportExcel(
										sortData(selected, rows),
										target_data.includes("cargo/prospects")
											? [
													...headings,
													"Vessel Name",
													"DWT/Crane",
													"Built",
													"Owners/Source",
													"Open Area",
													"Open Date",
													"Operations Remarks",
											  ]
											: headings,
										target_data.includes("cargo/prospects")
											? [
													...key_order,
													"name",
													"dwt",
													"built",
													"owners",
													"open",
													"date",
													"ops_remarks",
											  ]
											: key_order,
										xlFilename,
										list
									)
								}
							>
								<img
									src="./assets/icons/exportExcel.svg"
									alt=""
									className="table-icon"
								/>
							</IconButton>
						</span>
					</Tooltip>

					<Tooltip title="Sort Options" placement="top">
						<IconButton onClick={() => setSortOpen(true)}>
							<img
								src="./assets/icons/sortIcon.svg"
								alt=""
								className="table-icon"
							/>
						</IconButton>
					</Tooltip>

					<Tooltip title="Search Options" placement="top">
						<IconButton onClick={() => setSearchOpen(true)}>
							<img
								src="./assets/icons/searchSettingsIcon.svg"
								alt=""
								className="table-icon"
							/>
						</IconButton>
					</Tooltip>

					{!archives && (
						<Tooltip title="Add" placement="top">
							<Link to={`${details_page}/new/${tab_index}`}>
								<IconButton>
									<img
										src="./assets/icons/addIcon.svg"
										alt=""
										className="table-icon"
									/>
								</IconButton>
							</Link>
						</Tooltip>
					)}
				</div>
			</div>
			<div className="table">
				{loading ? (
					<CircularProgress style={{ marginTop: 20 }} thickness={4} />
				) : sortData(selected, rows).length !== 0 ? (
					<table cellPadding={0} cellSpacing={0}>
						<thead>
							<tr>
								{!list && (
									<th
										style={{
											minWidth: 6,
											maxWidth: 10,
										}}
										className="status-header"
									></th>
								)}
								<th
									style={{
										minWidth: 6,
									}}
								></th>
								{headings.map((heading, i) => (
									<th key={i}>{heading}</th>
								))}
								<th className="options-header"></th>
							</tr>
						</thead>

						<tbody>
							{sortData(selected, rows).map((r, x) => (
								<Row
									r={r}
									followups={followups}
									list={list}
									can_edit={can_edit || r.u_id === id}
									id={r.id}
									user={id}
									target={target_data}
									index={x}
									key_order={key_order}
									mvOpts={MoveOptions}
									key={x}
									details_page={details_page}
									tab_index={tab_index}
								/>
							))}
						</tbody>
					</table>
				) : (
					"No Data to display"
				)}
			</div>

			<SearchDialog
				meta={searchMeta}
				open={searchOpen}
				onClose={() => setSearchOpen(false)}
				onChange={(e) =>
					set_checked({ ..._checked, [e.target.name]: e.target.checked })
				}
				checked={_checked}
			/>

			<SortDialog
				meta={sortMeta}
				open={sortOpen}
				onClose={() => setSortOpen(false)}
				onChange={(e) => setSelected(e.target.name)}
				selected={selected}
			/>
		</div>
	);
}

function Row({
	r,
	id,
	user,
	followups,
	list,
	can_edit,
	key_order,
	index,
	target,
	mvOpts = [],
	details_page,
	tab_index,
}) {
	const [openMove, setOpenMove] = useState(false);
	const [openDel, setOpenDel] = useState(false);

	const navigate = useNavigate();

	return (
		<tr className="table-row">
			{!list && (
				<td
					style={{
						minWidth: 10,
						/* borderRadius: "4px 0px 0px 4px", */
					}}
					className={`status-td ${r.status || "none"}`}
				></td>
			)}
			<td
				style={{
					minWidth: 6,
				}}
			>
				{index + 1}.
			</td>
			{key_order.map((key, i) => (
				<td
					onClick={() => navigate(`${details_page}/${id}/${tab_index}`)}
					style={{
						textAlign:
							(key === "followups" ||
								key === "comments" ||
								key === "last_updated" ||
								key === "remarks") &&
							"justify",
						textJustify:
							(key === "followups" ||
								key === "comments" ||
								key === "last_updated" ||
								key === "remarks") &&
							"inter-word",
						whiteSpace:
							(key === "followups" ||
								key === "comments" ||
								key === "last_updated" ||
								key === "remarks") &&
							"pre-line",
						width: (key === "followups" || key === "remarks") && "99%",
						margin: 3,
					}}
					key={i}
				>
					{r[key]
						? (key === "arrived" && !list) ||
						  (key === "berthed" && !list) ||
						  key === "etcd" ||
						  key === "offer_bid"
							? dateFormat(r[key], "dd/mm/yy @ HH:MM") + " Hrs"
							: key === "enq_date" ||
							  (key === "arrived" && list) || // for competitors vessels
							  (key === "berthed" && list) || // for competitors vessels
							  key === "start_date" ||
							  key === "target_date" ||
							  key === "sailed"
							? dateFormat(r[key], "dd/mm/yy")
							: key === "month"
							? dateFormat(r[key], "mmm yy")
							: key === "powers"
							? r[key] === "admin"
								? "Admin"
								: "General User"
							: r[key]
						: "-"}
				</td>
			))}
			<td
				style={{
					minWidth: 10,
				}}
				className="options-td"
			>
				{can_edit && (
					<Tooltip title="Delete" placement="left">
						<IconButton onClick={() => setOpenDel(true)}>
							<Icon>
								<DeleteIcon sx={{ color: "tomato" }} />
							</Icon>
						</IconButton>
					</Tooltip>
				)}

				{!followups && can_edit && (
					<Tooltip title="Move" placement="left">
						<IconButton onClick={() => setOpenMove(true)}>
							<Icon color="primary">
								<MoveDownIcon />
							</Icon>
						</IconButton>
					</Tooltip>
				)}
			</td>

			<DeleteDialog
				open={openDel}
				onClose={() => setOpenDel(false)}
				target={`${target}/${r.id}`}
				name={
					r.name ||
					r.cargo_particulars ||
					r.task ||
					r.vessel ||
					(r.fullname && `${r.fullname}'s user account`) ||
					""
				}
			/>
			<MoveDialog
				open={openMove}
				onClose={() => setOpenMove(false)}
				target={`${target}/${id}`}
				r={r}
				name={r.name || r.cargo_particulars || r.vessel || ""}
				options={mvOpts}
			/>
		</tr>
	);
}

function DeleteDialog({ open, target, name = "", onClose }) {
	const [loading, setLoading] = useState(false);
	const dispatch = useDispatch();

	function del() {
		setLoading(true);
		Neon.delete(`/${target}`)
			.then((_) => {
				dispatch(deleteData({ path: `${target}` }));
				onClose();
			})
			.catch((_) => {
				alert("Something went wrong :(");
				onClose();
			});
		setLoading(false);
	}

	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle sx={{ fontColor: "tomato" }}>
					DELETE{" "}
					<Icon>
						<DeleteIcon sx={{ color: "tomato" }} />
					</Icon>
				</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Are you sure that you want to delete{" "}
						<b>
							{name.substring(0, 25)} {name.length > 25 && "....."}
						</b>{" "}
						permanently ?
					</DialogContentText>
					<DialogActions>
						<Button
							onClick={del}
							disabled={loading}
							cvar="filled"
							color="secondary"
							startIcon={<DeleteIcon />}
						>
							Delete
						</Button>
						<Button disabled={loading} cvar="outlined" onClick={onClose}>
							Cancel
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>
		</>
	);
}

function MoveDialog({ open, target, options = [], name, onClose, r }) {
	const [msg, setMsg] = useState("Moved successfully");
	const [msg_open, setMsg_open] = useState(false);
	const [severity, setSeverity] = useState("success");

	const dispatch = useDispatch();

	const [dest, setDest] = useState("");

	function move() {
		if (target === `${dest}/${r.id}`) {
			setSeverity("error");
			setMsg("Please select a different table to move");
			setMsg_open(true);
			return;
		}
		setMsg_open(true);
		onClose();
		dispatch(moveData({ origin: target, dest: `${dest}/${r.id}`, data: r }));
		Neon.delete(`/${target}`)
			.then((_) => {
				Neon.put(`/${dest}/${r.id}`, r);
			})
			.catch((_) => {
				setMsg("Something Went wrong :(");
				setSeverity("error");
				setMsg_open(true);
				onClose();
			});
	}

	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle sx={{ fontColor: "tomato" }}>
					MOVE{" "}
					<Icon>
						<MoveDownIcon color="primary" />
					</Icon>
				</DialogTitle>

				<DialogContent>
					<DialogContentText>
						Select a table to move{" "}
						<b>
							{name.substring(0, 25)} {name.length > 25 && "....."}
						</b>{" "}
						<Select
							value={dest}
							onChange={(e) => setDest(e.target.value)}
							sx={{
								width: 400,
							}}
						>
							{options.map((o, i) => (
								<MenuItem key={i} value={o.val}>
									{o.label}
								</MenuItem>
							))}
						</Select>
					</DialogContentText>
					<DialogActions>
						<Button onClick={move} cvar="filled" startIcon={<MoveDownIcon />}>
							Move
						</Button>
						<Button cvar="outlined" onClick={onClose}>
							Cancel
						</Button>
					</DialogActions>
				</DialogContent>
			</Dialog>

			<Snackbar
				open={msg_open}
				onClose={() => setMsg_open(false)}
				autoHideDuration={5000}
				anchorOrigin={{ vertical: "top", horizontal: "right" }}
			>
				<Alert severity={severity}>
					<AlertTitle>{severity.toUpperCase()}</AlertTitle>
					{msg}
				</Alert>
			</Snackbar>
		</>
	);
}

function SearchDialog({
	meta = [], // Contains the key and label [{key: "", label: "", checked=false}] !! ORDER !!
	checked = {}, // contains the checked keys and bool values
	open = false, // The open trigger for the dialog
	onClose = function () {}, // called onClose
	onChange = function (event) {},
}) {
	return (
		<Dialog open={open} onClose={onClose} maxWidth="md">
			<DialogTitle>Search Options</DialogTitle>
			<DialogContent>
				<div style={{ display: "flex", flexDirection: "column" }}>
					{meta.map((m, i) => (
						<FormControlLabel
							key={i}
							label={m.label}
							control={
								<Checkbox
									checked={checked[m.key]}
									name={m.key}
									onChange={(e) => {
										onChange(e);
										onClose();
									}}
								/>
							}
						/>
					))}
				</div>
				<Button cvar="filled" onClick={onClose}>
					Done
				</Button>
			</DialogContent>
		</Dialog>
	);
}

function SortDialog({
	meta = [], // contains the key label pair and the selected key for sorting
	selected = "", // The selected key to sort
	open = false, // open triger for the Dialog
	onClose = function () {}, // Handle Dialog close
	onChange = function () {}, // Handle changes in the RadioGroup
}) {
	return (
		<Dialog open={open} onClose={onClose}>
			<DialogTitle>Sort Options</DialogTitle>
			<DialogContent>
				<RadioGroup
					value={selected}
					onChange={(e) => {
						onChange(e);
						onClose();
					}}
				>
					{meta.map((k, i) => (
						<FormControlLabel
							key={i}
							value={k.key}
							control={<Radio />}
							label={k.label}
							name={k.key}
						/>
					))}
				</RadioGroup>

				<Button cvar="filled" onClick={onClose}>
					Done
				</Button>
			</DialogContent>
		</Dialog>
	);
}

function useQuery() {
	const { search } = useLocation();

	return React.useMemo(() => new URLSearchParams(search), [search]);
}

export { TabPanel, Tab, DataTable, SearchDialog, SortDialog, useQuery };
