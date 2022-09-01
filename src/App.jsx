import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";
import Vessels from "./pages/Vessels";
import DVessels from "./pages/Details/DVessels";
import Cargo from "./pages/Cargo";
import DCargo from "./pages/Details/DCargo";
import Branch from "./pages/Branch";
import DBranch from "./pages/Details/DBranch";
import HO from "./pages/Ho";
import DHo from "./pages/Details/DHo";
import VesselList from "./pages/VesselList";
import DList from "./pages/Details/DList";
import Competitors from "./pages/Competitors";
import DCompetitors from "./pages/Details/DCompetitors";
import Archives from "./pages/Archives";
import Users from "./pages/Users";
import DUsers from "./pages/Details/DUsers";
import Forgot from "./pages/Forgot";
import Reset from "./pages/Reset";
import Forbidden from "./pages/Forbidden";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

function App() {
	const location = useLocation();
	return (
		<AnimatePresence exitBeforeEnter>
			<Routes key={location.pathname} location={location}>
				<Route path="/login" element={<Login />} />
				<Route path="/" element={<Home />} />

				<Route path="/vessel-status" element={<Vessels />} />
				<Route path="/vessel-status/*" element={<DVessels />} />
				<Route path="/archives/vessel-status/*" element={<DVessels />} />

				<Route path="/cargo" element={<Cargo />} />
				<Route path="/cargo/*" element={<DCargo />} />
				<Route path="/archives/cargo/*" element={<DCargo />} />

				<Route path="/branch_follow_ups" element={<Branch />} />
				<Route path="/branch_follow_ups/*" element={<DBranch />} />

				<Route path="/ho_follow_ups" element={<HO />} />
				<Route path="/ho_follow_ups/*" element={<DHo />} />

				<Route path="/vessel_list" element={<VesselList />} />
				<Route path="/vessel_list/*" element={<DList />} />

				<Route path="/competitors" element={<Competitors />} />
				<Route path="/competitors/*" element={<DCompetitors />} />
				<Route path="/archives/competitors/*" element={<DCompetitors />} />

				<Route path="/archives" element={<Archives />} />

				<Route path="/users" element={<Users />} />
				<Route path="/users/*" element={<DUsers />} />

				<Route path="/profile" element={<Profile />} />

				<Route path="/forgot-password" element={<Forgot />} />
				<Route path="/reset/:id" element={<Reset />} />
				<Route path="/forbidden" element={<Forbidden />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</AnimatePresence>
	);
}

export default App;
