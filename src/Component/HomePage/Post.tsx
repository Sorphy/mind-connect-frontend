import React, { useEffect, useState } from "react";
import "./post.css";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { BsHeart } from "react-icons/bs";
import { FaRegComment } from "react-icons/fa";
import {
  HiOutlineFlag,
  HiArrowNarrowDown,
  HiArrowNarrowUp,
} from "react-icons/hi";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import CommentSection from "../CommentSection/CommentSection";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import ModalImage from "react-modal-image";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

interface PostAttributes {
  liked: any;
  image: string[];
  video: string[];
  file: FileAttributes[];
  User: UserAttributes;
  postContent: string;
  id: string;
  like: string[];
  comment: number;
  createdAt: string;
}

interface FileAttributes {
  url: string;
  name: string;
}
interface UserAttributes {
  firstName: string;
  lastName: string;
  profilePhoto: string | undefined;
}

const Post: React.FC = () => {
  const [posts, setPosts] = useState<PostAttributes[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [visiblePosts, setVisiblePosts] = useState<number>(5);
  const [isVideoModalOpen, setVideoModalOpen] = useState<boolean>(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState<string>("");
  const [showNewerPostsButton, setShowNewerPostsButton] = useState(false);
  const [showOlderPostsButton, setShowOlderPostsButton] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:4000/post/all");
        const sortedPosts = res.data.posts.sort(
          (a: PostAttributes, b: PostAttributes) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        // Update the 'liked' property in the posts
        const likedPosts = JSON.parse(
          localStorage.getItem("likedPosts") || "{}"
        );
        const updatedPosts = sortedPosts.map((post: PostAttributes) => ({
          ...post,
          liked: likedPosts[post.id] || false,
        }));
        setPosts(updatedPosts);
      } catch (error: any) {
        toast.error(error.res.data.Error);
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleShowComments = (postId: string) => {
    setSelectedPostId((post) => (post === postId ? null : postId));
  };

  const formatDate = (dateString: string): string => {
    const createdAt = new Date(dateString);
    const distance = formatDistanceToNow(createdAt, { addSuffix: true });
    return distance;
  };

  const handleLike = async (postId: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `http://localhost:4000/post/like-post/${postId}`,
        { postId }, // Pass the postId in the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);

      setPosts((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              like: res.data.numberOfLikes,
              liked: res.data.liked,
            };
          }
          return post;
        })
      );

      // Update the liked posts in local storage
      localStorage.setItem(
        "likedPosts",
        JSON.stringify({
          ...JSON.parse(localStorage.getItem("likedPosts") || "{}"),
          [postId]: res.data.liked,
        })
      );
    } catch (error: any) {
      console.log(error);
      toast.error(error.response.data.Error);
    }
  };

  const handleViewOlderPosts = () => {
    setVisiblePosts((prevVisiblePosts) => prevVisiblePosts + 5);
    setShowNewerPostsButton(true);
    setShowOlderPostsButton(false);
  };

  const handleViewNewerPosts = () => {
    setVisiblePosts((prevVisiblePosts) => Math.max(prevVisiblePosts - 5, 5));
    setShowNewerPostsButton(false);
    setShowOlderPostsButton(true);
  };

  const handleViewVideoModal = (videoUrl: string) => {
    setSelectedVideoUrl(videoUrl);
    setVideoModalOpen(true);
  };

  return (
    <div className="post">
      {posts.slice(0, visiblePosts).map((post) => (
        <div className="first-post" key={post.id}>
          <div className="top-section">
            <div className="post-user">
              <img className="post-icon" src={post.User?.profilePhoto} alt="" />

              <div className="poster">
                <div className="post-owner">
                  {post.User?.firstName} {post.User?.lastName}
                  <p>{formatDate(post.createdAt)}</p>
                </div>
              </div>
            </div>

            <div className="top-icons">
              <IoEllipsisHorizontalSharp className="elipsis" />
              <ClearIcon className="cancel" />
            </div>
          </div>
          <p className="post-details">{post.postContent}</p>
          <div className="image-grid">
            {post.image.map((imageUrl, index) => (
              <div className="image-item" key={index}>
                <ModalImage small={imageUrl} large={imageUrl} alt="" />
              </div>
            ))}
          </div>
          <div className="video-grid">
        {post.video.map((videoUrl, index) => (
          <div
            className="video-item"
            key={index}
            onClick={() => handleViewVideoModal(videoUrl)}
          >
            <video src={videoUrl} controls />
          </div>
        ))}
        {isVideoModalOpen && (
          <div className="modal-container">
            <div className="modal-content">
              <ModalVideo
                channel="custom"
                url={selectedVideoUrl}
                isOpen={isVideoModalOpen}
                onClose={() => setVideoModalOpen(false)}
              />
            </div>
          </div>
        )}
      </div>
          <div className="file-grid">
            {post.file.map((file, index) => (
              <div className="file-item" key={index}>
                <a href={file.url} download={file.name}>
                  File {index + 1}
                </a>
              </div>
            ))}
          </div>
          <div className="like-section">
            <div className="like">
              {post.like ? (
                <FcLike className="like-icon liked" />
              ) : (
                <BsHeart className="like-icon" />
              )}
              <span>{post.like.length}</span>
            </div>
            <p>{post.comment} comments</p>
          </div>
          <hr />
          <div className="comment-like-report">
            <div className="icon" onClick={() => handleLike(post.id)}>
              {post.liked ? (
                <FcLike className="icons liked" />
              ) : (
                <BsHeart className="icons" />
              )}
              <span>Like</span>
            </div>

            <div className="icon" onClick={() => handleShowComments(post.id)}>
              <FaRegComment className="icons" />
              <span>Comment</span>
            </div>
            <div className="icon">
              <HiOutlineFlag className="icons" />
              <span>Report</span>
            </div>
          </div>

          <hr />
          {selectedPostId === post.id && <CommentSection postId={post.id} />}
        </div>
      ))}

      <div className="view-posts">
        {showOlderPostsButton && (
          <div className="view-older-post" onClick={handleViewOlderPosts}>
            <p>
              View Older Posts <HiArrowNarrowDown className="down-icon" />
            </p>
          </div>
        )}

        {showNewerPostsButton && (
          <div className="view-older-post" onClick={handleViewNewerPosts}>
            <p>
              View Newer Posts <HiArrowNarrowUp className="up-icon" />
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Post;
