// export default process.env.NODE_ENV === "development"
// 	? "http://localhost:5001"
// 	: "https://musiane.onrender.com/";

export default process.env.NODE_ENV === process.env.BACKEND_URL;
