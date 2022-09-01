import { styled } from "@mui/material/styles";
import { Button as Btn, Input as Ipt } from "@mui/material";

const Button = styled(Btn)(({ cvar = "filled" | "outlined" }) => ({
	minWidth: 170,
	maxWidth: 280,
	height: 50,
	background:
		cvar === "outlined"
			? "transaprent"
			: "linear-gradient(93.83deg, rgba(20, 70, 116, 0.2) 2.1%, rgba(0, 0, 0, 0) 100%), #5FA6E7;",
	borderRadius: 3,
	color: cvar === "filled" ? "white" : "#1386C7",

	border: cvar === "outlined" ? "2px solid #5FA6E7" : "none",

	letterSpacing: cvar === "outlined" ? "2px" : "",

	transitionDuration: 0.2,
	transitionTimingFunction: "ease-in-out",

	fontSize: 17,
	"&:hover": {
		backgroundColor: cvar === "filled" ? "#2079CE" : "",
	},

	fontFamily: "Poppins",
}));

const Input = styled(Ipt)(() => ({
	width: 300,
	fontSize: 16,
	border: `1px solid rgba(182, 182, 182, 0.72)`,
	borderLeft: "5px solid #5098DA",
	borderRadius: 5,
	padding: 10,
}));

export { Button, Input };
