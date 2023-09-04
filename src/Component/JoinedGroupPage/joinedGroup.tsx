import React, { useEffect, useState } from "react";
import { HiArrowNarrowDown, HiArrowNarrowLeft } from "react-icons/hi";
import "./joinedGroup.css";
import Input from "./input";
import NavBar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { IoEllipsisHorizontalSharp } from "react-icons/io5";
import ClearIcon from "@mui/icons-material/Clear";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart, AiOutlineComment, AiOutlineFlag } from "react-icons/ai";
interface PostAttributes {
  User: UserAttributes;
  postContent: string;
  like: [string];
  id: string;
  comments: CommentAttributes;
}

interface UserAttributes {
  firstName: string;
  lastName: string;
  profilePhoto: string;
}

interface CommentAttributes {
  comments: [string];
}

const JoinedGroup = () => {
  const token = localStorage.getItem("token");
  console.log(token);

  const [groupPosts, setGroupPosts] = useState<PostAttributes[]>([]);
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);
  const [leaveModalResponse, setLeaveModalResponse] = useState("");

  useEffect(() => {
    const fetchPostsByGroupId = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/post/groupId`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { posts } = response.data;

        setGroupPosts(posts);
      } catch (error: any) {
        console.error("Failed to fetch posts:", error);
        toast.error(error.response.data.Error);
      }
    };
    fetchPostsByGroupId(); // Fetch posts when the component mounts
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const res = await axios.put(
        `http://localhost:4000/post/like-post/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success(res.data.message);
    } catch (error: any) {
      console.log(error);
      toast.error(error.res.data.Error);
    }
  };

  const leaveGroup = async () => {
    try {
      const response = await axios.post(
        "http://localhost:4000/group/:id/leave"
      );
      const { message, group } = response.data;

      console.log(message); // You have left the group successfully
      console.log(group); // Updated group data

      setLeaveModalResponse(message);
      setLeaveModalOpen(true);

      // Perform any necessary actions after leaving the group
    } catch (error) {
      console.error("Failed to leave the group:", error);
    }
  };

  const handleLeaveModalClose = () => {
    setLeaveModalOpen(false);
    setLeaveModalResponse("");
  };

  return (
    <div className="home-section">
      <NavBar />
      <div className="heading">
        <div className="navigation">
          <HiArrowNarrowLeft />
          <Link to="/dashboard" className="nav-back">
            Go back
          </Link>
        </div>
        <div>
          <h2>Meditation Group</h2>
        </div>
        <div>
          <button className="leave-group-button" onClick={leaveGroup}>
            Leave group
          </button>
        </div>
      </div>
      <Input />
      <div className="group-body">
        <div className="group-head">
          <div className="user-details">
            <div className="user-avatar">
              <img src="" alt="SA"/>
            </div>
            <div>
            <p>Jane Doe</p>
            <p>37 min</p>
            </div>
          </div>
          <div className="user-action">
            <IoEllipsisHorizontalSharp className="elipsis" />
            <ClearIcon className="block-account" />
          </div>
        </div>
        <div className="group-content">
          The company of the competent monoserorita. Greetings from Alijandro
          Montero who created the Mexican Monosentima. This Introduction has
          created the Santiago Monera Mamasitta. Clarity to the Posting Schedule
        </div>

        <div className="group-foot">
          <div className="group-base">
            <FcLike className="like-icon" />
            <span>12</span>
          </div>

          <div className="content-property">
            <span>9</span> comments
          </div>
        </div>

        <div className="action-line">
          <a className="action-icon like-icon" >
            <AiOutlineHeart className="black-white-like-icon"/>
            <span>Like</span>
          </a>

          <a className="action-icon comment-icon" >
            <AiOutlineComment className="black-white-comment-icon"/>
            <span>Comment</span>
          </a>

          <a className="action-icon report-icon" >
            <AiOutlineFlag className="black-white-report-icon"/>
            <span>Report</span>
          </a>
        </div>
      </div>

      <div className="view-older-post">
        <p>View older posts</p>
        <HiArrowNarrowDown className="down-icon" />
      </div>
      {leaveModalOpen && (
        <div className="leaveModal">
          <div className="leave-modal-content">
            <h3>{leaveModalResponse}</h3>
            <div className="leave-modal-actions">
              <button onClick={handleLeaveModalClose}>Done</button>
              <button>Re-join group</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JoinedGroup;
