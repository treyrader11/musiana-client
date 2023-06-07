export default process.env.NODE_ENV === "development"
	? "http://localhost:5001"
	: "https://amie.up.railway.app";
