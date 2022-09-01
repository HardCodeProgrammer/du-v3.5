import React from "react";
import Lottie from "react-lottie";
import animationData from "../assets/images/access denied.json";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/Mui";

function Forbidden() {
	const navigate = useNavigate();
	return (
		<div className="container vertical all-center">
			<h2>Access Denied</h2>

			<Lottie
				height={250}
				width={250}
				options={{
					loop: false,
					autoplay: true,
					animationData: animationData,
					rendererSettings: {
						preserveAspectRatio: "xMidYMid slice",
					},
				}}
			/>
			<Button
				onClick={() => navigate("/")}
				cvar="outlined"
				startIcon={<ArrowBackIcon />}
			>
				Back to Home
			</Button>
		</div>
	);
}

export default Forbidden;
