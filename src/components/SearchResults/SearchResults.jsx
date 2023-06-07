import React from "react";
import { Link } from "react-router-dom";
// import VideoCard from "../../pages/Video/VideoCard";
import "./searchresult.css";

const SearchResults = ({ searchResult, reset }) => {
	console.log('searchResult', searchResult);
	return (
		<div className="search-results">
			<div className="search-result-container">
				{(searchResult.users?.length !== 0 && searchResult.users) && (
					<div className="content-header">
						<h4>Teachers</h4>
					</div>
				)}
				{searchResult.users?.map(user => (
					<div className="search-result-content">
						<hr />
						<Link to={`/user/${user._id}`} key={user._id}>
							<p onClick={reset}>{user.name}</p>
						</Link>
					</div>
				))}
			</div>
			<div className="search-result-container">
				{searchResult.prevSearchedVideos && (
					<div className="content-header">
						<h4>Videos watched recently</h4>
						<span>
							<Link to="/videos">
								<h4 onClick={reset} style={{color: "#2450c2"}}>Show all</h4>
							</Link>
						</span>
					</div>
				)}
				{searchResult.prevSearchedVideos?.map(video => (
					<>
					<hr />
					<div className="search-result-content">
						{/* <Link to={`/video/${video._id}`} key={video._id}>
							<p onClick={reset}>{video.title}</p>
						</Link> */}
						<div className="video">
							<img width="170" height="105" src={video.thumbnail || "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcRwoHakgGTqlar3_h2DRmvkFnLUIc9Cg_dXZsuCYic-tLREtkM2"} />
						</div>
						<div>
							<p className="title">{video.title}</p>
							<p className="desc">{video.desc}</p>
						</div>
						<div>
							<p className="createdAt">{video.createdAt}</p>
							<p>Uploaded</p>
						</div>
						{/* <VideoCard video={video} size={{width: 150, height: 180}} /> */}
					</div>
					</>
				))}
			</div>
			<div className="search-result-container">
				{(searchResult.posts?.length !== 0 && searchResult.posts) && <h4>Posts</h4>}
				{searchResult.posts?.map(post => (
					<div className="search-result-content">
						<hr />
						<Link to={`/post/${post._id}`} key={post._id}>
							<p onClick={reset}>{post.caption}</p>
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default SearchResults;
