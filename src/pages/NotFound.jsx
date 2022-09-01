import React from "react";
import animationData from "../assets/images/Lottie404.json";
import Lottie from "react-lottie";
import { Button } from "../components/Mui";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from "react-router-dom";

export default function NotFound() {
	const navigate = useNavigate();
	return (
		<div className="container vertical all-center">
			<Lottie
				height={500}
				width={500}
				options={{
					loop: true,
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
