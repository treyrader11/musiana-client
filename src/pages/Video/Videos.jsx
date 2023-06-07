import { useDispatch, useSelector } from "react-redux";
import "./styles/video.css";
//import useConfirmation from "../../components/Confirmation/useConfirmation";
import Input from "../../components/Input/Input";
import { useEffect } from "react";
import { getVideos } from "../../features/videoSlice";
import VideoCard from "./VideoCard";
import GoBackButton from "../../components/Buttons/GoBackButton";
import { dummyVideos } from "./DummyData/dummyVideos";

const Videos = ({ type }) => {
  //const [selectedCategory, setSelectedCategory] = useState(type);
  const dispatch = useDispatch();
  const { videos } = useSelector(state => state.video);
  // console.log('videos', dummyVideos);

  useEffect(() => {
    const fetchVideos = async () => {
      await dispatch(getVideos(type));
    };
    fetchVideos();
  }, [type, dispatch]);

  return (
		<div className="videos__page">
      <section className="video-grid">
        {videos.map((video) => (
          <VideoCard key={video._id} video={video} />
        ))}
        {/* {dummyVideos.map((video, i) => (
          <VideoCard key={i} video={video} />
        ))} */}
			</section>
		</div>
	);
}


export default Videos;