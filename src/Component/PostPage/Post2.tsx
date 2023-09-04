import React, { useEffect, useState } from "react";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { FiEdit, FiEyeOff } from "react-icons/fi";
import { RiDeleteBinLine } from "react-icons/ri";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";
import { toast } from "react-toastify";
import { HiArrowNarrowDown, HiArrowNarrowUp } from "react-icons/hi";
import ModalImage from "react-modal-image";
import ModalVideo from "react-modal-video";
import "react-modal-video/scss/modal-video.scss";

interface UserAttributes {
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

interface CommentAttributes {
  comments: [string];
}

interface PostAttributes {
  image: string[];
  video: string[];
  User: UserAttributes;
  postContent: string;
  like: [string];
  id: string;
  comments: CommentAttributes;
  createdAt: string;
  visible: boolean; // Added "visible" property
}

const token = localStorage.getItem("token");
console.log(token);

const Post2 = () => {
  const [postsWithComments, setPostsWithComments] = useState<PostAttributes[]>(
    []
  );
  const [visiblePostsCount, setVisiblePostsCount] = useState(5);
  const [showAllPosts, setShowAllPosts] = useState(false);
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [selectedVideoUrl, setSelectedVideoUrl] = useState("");

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.get("http://localhost:4000/post/userId", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const posts = response.data.posts;
  
      const commentPromises = posts.map(async (post: any) => {
        const commentsResponse = await axios.get(
          `http://localhost:4000/comment?postId=${post.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const comments = commentsResponse.data;
        return { ...post, comments };
      });
  
      const postsWithComments = await Promise.all(commentPromises);
  
      const sortedPosts = postsWithComments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  
      setPostsWithComments(sortedPosts);
      console.log(sortedPosts);
    } catch (error: any) {
      console.error(error);
      toast.error(error.commentsResponse?.data?.Error);
    }
  };
  

  useEffect(() => {
    fetchData();
  }, []);

  const formatDate = (dateString: string): string => {
    const createdAt = new Date(dateString);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  };

  const handleVisibility = async (postId: string) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/post/toggle-visibility/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
      console.log(res);

      // Update the visibility of the post locally
      setPostsWithComments((prevPosts) =>
        prevPosts.map((post) => {
          if (post.id === postId) {
            const updatedPost = { ...post, visible: !post.visible };
            return updatedPost;
          }
          return post;
        })
      );
    } catch (error: any) {
      toast.error(error.response.data.Error);
      console.error(error);
    }
  };

  const handleDelete = async (postId: string) => {
    try {
      const res = await axios.delete(
        `http://localhost:4000/post/deletePost/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(res.data.message);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response.data.Error);
    }
  };

  const handleViewMore = () => {
    setVisiblePostsCount(postsWithComments.length);
    setShowAllPosts(true);
  };

  const handleViewLess = () => {
    setVisiblePostsCount(5);
    setShowAllPosts(false);
  };

  const visiblePosts = showAllPosts
    ? postsWithComments.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
    : postsWithComments
        .slice(0, visiblePostsCount)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  return (
    <div className="post">
      <div className="postbg">
        <h1>Your Posts</h1>
        <div className="poster">
          {visiblePosts.map((post) => (
            <div className="first-posts" key={post.id}>
              {post.visible ? (
                <>
                  <div className="top-section">
                    <div className="post-user">
                      <img
                        className="post-icon"
                        src={post.User?.profilePhoto}
                        alt=""
                      />
                      <div className="poster">
                        <div className="post-owner">
                          {post.User.firstName} {post?.User?.lastName}
                          <p>{formatDate(post.createdAt)}</p>
                        </div>
                      </div>
                    </div>
                    <div className="top-icons">
                      <IoEllipsisHorizontalSharp className="elipsis" />
                      <ClearIcon className="cancel" />
                    </div>
                  </div>
                  <p className="post-details">{post?.postContent}</p>
                  {post.image && post.image.length > 0 && (
                    <div className="image">
                      {post.image.map((imageUrl, index) => (
                        <ModalImage key={index} small={imageUrl} large={imageUrl} alt="" />
                      ))}
                    </div>
                  )}

                  {post.video && post.video.length > 0 && (
                    <div className="videos">
                      {post.video.map((videoUrl, index) => (
                        <div
                          key={index}
                          className="video-item"
                          onClick={() => {
                            setSelectedVideoUrl(videoUrl);
                            setVideoModalOpen(true);
                          }}
                        >
                          <video src={videoUrl} controls />
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="like-section">
                    <div className="like">
                      <FcLike className="like-icon" />
                      <span>{post?.like?.length}</span>
                    </div>
                    <p>{post.comments?.comments.length} comments</p>
                  </div>
                  <hr />
                  <div className="comment-like-report">
                    <div className="icon">
                      <FiEdit className="icons" />
                      <span>Edit</span>
                    </div>
                    <div
                      className="icon"
                      onClick={() => handleDelete(post?.id)}
                    >
                      <RiDeleteBinLine className="icons" />
                      <span>Delete</span>
                    </div>
                    <div
                      className="icon"
                      onClick={() => handleVisibility(post?.id)}
                    >
                      <FiEyeOff className="icons" />
                      <span>Hide</span>
                    </div>
                  </div>
                  <hr />
                </>
              ) : (
                <div className="hidden-post">
                  <div className="hidden-post-content">
                    <h4>Post hidden</h4>
                    <p>
                      Hiding posts helps Mind Connect personalize your Feed.
                    </p>
                  </div>
                  <div className="icon-container">
                    <div
                      className="icon undo-hide"
                      onClick={() => handleVisibility(post?.id)}
                    >
                      <span>Undo Hide</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
        {!showAllPosts && (
          <button className="view-more-button" onClick={handleViewMore}>
            View older posts <HiArrowNarrowDown className="down-icon" />
          </button>
        )}
        {showAllPosts && (
          <button className="view-more-button" onClick={handleViewLess}>
            View newer posts <HiArrowNarrowUp className="down-icon" />
          </button>
        )}
      </div>
      {isVideoModalOpen && (
        <ModalVideo
          channel="custom"
          url={selectedVideoUrl}
          isOpen={isVideoModalOpen}
          onClose={() => setVideoModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Post2;
