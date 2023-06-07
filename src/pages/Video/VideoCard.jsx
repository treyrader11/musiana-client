import React, { useState, useEffect } from "react";
import "./styles/video.css";
import { dp } from "../../assets";
import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import shortenText from "../../utils/shortenText";
import Skeleton from "./Skeleton/Skeleton";

const VideoCard = ({ video }) => {
  console.log('video', video);
  const [hovering, setHovering] = useState(false);
  const [loading, setLoading] = useState(true);
  const [thumbnail, setThumbnail] = useState(null);

{/* Temporary loader */}
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="video">
      <div className="card">
        {loading ? (
          <Skeleton />
        ) : (
        <>
          <div
            className="thumbnail"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            <Link to={`video/${video._id}`}>
                <ReactPlayer
                  playbackRate={0.7}
                  playing={hovering}
                  muted={true}
                  loop={true}
                  url={video?.videoUrl}
                />
            </Link>
          </div>
          <div className="info">
            <div className="details">
              <h3>{video?.title}</h3>
              <h5>{shortenText(video?.desc, 35)}</h5>
              <p>{video?.author}</p>
              <p>{video?.createdAt}</p>
              <p>{`${video?.views} views`}</p>
              <p>{`${video?.subscribers} subscribers`}</p>
            </div>
          </div>
        </>
        )}
      </div>
    </div>
  );
};

export default VideoCard;
