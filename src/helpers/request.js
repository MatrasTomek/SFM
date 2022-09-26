import axios from "axios";

const request = axios.create({
	baseURL: "http://localhost:8000",
	// baseURL: "https://sfm-backend.herokuapp.com/",
	validateStatus: false,
});

export default request;
