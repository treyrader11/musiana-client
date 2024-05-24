import React from "react";
import { AiOutlineTwitter } from "react-icons/ai";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsFacebook } from "react-icons/bs";
import { FaLinkedinIn } from "react-icons/fa";
import { ImEmbed } from "react-icons/im";
import { useDispatch } from "react-redux";
import { showModal } from "../../features/modalSlice";

const ShareItem = ({ item }) => {
  const { onClick, Icon, title, id } = item;
  return (
    <div className="share__item buttons-container" onClick={onClick}>
      <div className="button animated spin" id={id}>
        <Icon className="icon" />
      </div>
      <p>{title}</p>
    </div>
  );
};

const Share = ({ post }) => {
  const dispatch = useDispatch();

  const copyURL = () => {
    window.navigator.clipboard.writeText(
      `https://musiana.vercel.app/post/${post._id}`
    );
    dispatch(showModal({ msg: "URL copied to clipboard" }));
  };

  const copyEmbed = () => {
    window.navigator.clipboard.writeText(
      `<iframe
				src="https://musiana.vercel.app/post/${post._id}?embed=true"
				width="500"
				height="700"
				title="Musiane"
			></iframe>`
    );
    dispatch(showModal({ msg: "Copied embed code to clipboard" }));
  };

  const shareToUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${post.caption}&url=https://musiana.vercel.app/post/${post._id}`,
    facebook: `https://www.facebook.com/dialog/share?
		app_id=287203076842060
		&display=popup
		&href=https://musiana.vercel.app/${post._id}
		&redirect_uri=https://musiana.vercel.app/${post._id}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=https://musiana.vercel.app/post/${post._id}`,
    whatsapp: `https://api.whatsapp.com/send/?text=${post.caption} Link: https://musiana.vercel.app/post/${post._id}`,
  };

  const shareTo = (dest) => {
    window.open(shareToUrls[dest], "_blank");
  };

  const shareItems = [
    {
      title: "Embed",
      onClick: copyEmbed,
      Icon: ImEmbed,
      id: "embed",
    },
    {
      title: "Whatsapp",
      onClick: () => shareTo("whatsapp"),
      Icon: IoLogoWhatsapp,
      id: "whatsapp",
    },
    {
      title: "Facebook",
      onClick: () => shareTo("facebook"),
      Icon: BsFacebook,
      id: "facebook",
    },
    {
      title: "Twitter",
      onClick: () => shareTo("twitter"),
      Icon: AiOutlineTwitter,
      id: "twitter",
    },
    {
      title: "Linked In",
      onClick: () => shareTo("linkedin"),
      Icon: FaLinkedinIn,
      id: "linkedin",
    },
  ];

  return (
    <article className="share">
      <h2>Share</h2>
      <div className="share__items">
        {shareItems.map((item, i) => (
          <ShareItem item={item} key={i} />
        ))}
      </div>
      <div className="share__url">
        {post._id}
        <button className="btn" onClick={copyURL}>
          Copy URL
        </button>
      </div>
    </article>
  );
};

export default Share;
