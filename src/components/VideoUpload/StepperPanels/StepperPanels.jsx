import React, { useState } from 'react';
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { FiHelpCircle } from "react-icons/fi";
import Popover from '../../Popover/Popover';

import "./stepperpanels.scss";

const genres = ["Cajun", "Zydeco", "Blues", "Jazz", "Swing", "Dance hall", "Country & Western", "Honky Tonk", "Western Swing", "Rhythm & Blues", "Dixieland"];
const instruments = ["Piano", "Fiddle", "Pedal Steel", "Lap Steel", "Trumpet", "Saxophone", "Clarinet", "Double Bass Guitar", "Electric Bass Guitar", "Electric Guitar", "Acoustic Guitar", "Drums", "Accordion", "Cornet", "Organ"];
const maxLengthTitle = 100;
const maxLengthDesc = 300;

const Panels = (props) => {
  const { step } = props;
  const stepsMap = {
    details: <VideoDetails title="Details" formHandlers={props} />,
    elements: <VideoElements title="Video Elements" />,
    visibility: <VideoVisibility title="Visibility" />
  };

  return (
    <div className={`panel video-${step}-panel`}>
      {stepsMap[step]}
    </div>
  );
};

function VideoDetails({ title, formHandlers }) {
  const { handleScroll, videoDetails, hasError, handleVideoDetails, handleTags } = formHandlers;
  const [titleInputHasFocus, setTitleInputHasFocus] = useState(false);
  const [descInputHasFocus, setDescInputHasFocus] = useState(false);

  const { video: { videoDetails: { videoUrl } } } = useSelector(state => state);

  return (
    <div className="video-details">
      <div className="form" onScroll={handleScroll}>
        <div className="panel-header">{title}</div>
        <div className={`textbox-container ${titleInputHasFocus && (hasError ? "required" : "focused")} ${hasError && "error"}`}>
          <label htmlFor="title">
            <span className="input-title">Title (required)</span>
            <Popover>
              <FiHelpCircle size={23} className="help-tooltip" />
            </Popover>
          </label>
          <textarea
            onFocus={() => setTitleInputHasFocus(true)}
            className="textbox"
            name="title"
            placeholder="Add a title that describes this video"
            value={videoDetails.title}
            onChange={handleVideoDetails}
            maxLength={maxLengthTitle}
            onBlur={() => setTitleInputHasFocus(false)}
          ></textarea>
          <div className="char-count">
            {titleInputHasFocus && (
              !hasError ? (
                `${videoDetails.title.length}/${maxLengthTitle}`
              ) : (
                `0/${maxLengthTitle}`
              )
            )}
          </div>
        </div>

        <div className={`textbox-container ${descInputHasFocus && "focused"}`}>
          <label htmlFor="title">
            <span className="input-title">Description</span>
            <Popover>
              <FiHelpCircle size={23} className="help-tooltip" />
            </Popover>
          </label>
          <textarea
            onFocus={() => setDescInputHasFocus(true)}
            className="textbox"
            required
            name="desc"
            rows="4"
            placeholder="Tell students about this video"
            value={handleVideoDetails.desc}
            onChange={handleVideoDetails}
            maxLength={maxLengthDesc}
            onBlur={() => setDescInputHasFocus(false)}
          ></textarea>
          <div className="char-count">
            {descInputHasFocus && (
              videoDetails.desc ? (
                `${videoDetails.desc.length}/${maxLengthDesc}`
              ) : (
                `0/${maxLengthDesc}`
              )
            )}
          </div>
        </div>

        <div className="title">Thumbnail</div>
        <p>Select or upload a picture that shows what's in your video. A good thumbnail stands out and draws viewers' attention. <a>Learn more</a></p>

        <div className="title">Genre</div>
        <div className="select-input genre">
          <select className="select-input__field" name="genre" value={handleVideoDetails.genre} onChange={handleVideoDetails}>
            {genres.map((genre, i) => (
              <option key={i}>{genre}</option>
            ))}
          </select>
          <div className="select-input__arrow"></div>
        </div>

        <div className="title">Instrument</div>
        <div className="select-input instrument">
          <select className="select-input__field" name="instrument" value={handleVideoDetails.instrument} onChange={handleVideoDetails}>
            {instruments.map((instrument, i) => (
              <option key={i}>{instrument}</option>
            ))}
          </select>
          <div className="select-input__arrow"></div>
        </div>

        <div className="title">Tags</div>
        <p>Tags play a minimal role in helping viewers find your video. Learn more</p>
        <label htmlFor="tags"></label>
        <input
          className="textbox"
          type="text"
          name="tags"
          placeholder="Add Tag"
          onChange={handleTags}
        />
        <p>Enter a comma after each tag</p>
      </div>

      <div className="video-player">
        <div className="heading loading">
          <ReactPlayer
            controls
            url={videoUrl}
            width="100%"
            height="245px"
            loop={true}
          />
          <div className="content">
            <div className="info"></div>
            <p>video card content</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function VideoElements({ title }) {
  return (
    <div className="content">
      <div>{title}</div>
    </div>
  );
}

function VideoVisibility({ title }) {
  return (
    <div className="content">
      <div>{title}</div>
    </div>
  );
}

export default Panels;
