
import React, { useEffect, useState } from "react";
import "./CommentSection.css";
import { AiOutlineHeart } from "react-icons/ai";
import { TbSend } from "react-icons/tb";
import axios from "axios";

interface Comment {
  id: string;
  comment: string;
  user_id: string;
}

export default function CommentSection({ postId }: any) {
  const [value, setValue] = useState("");
  const [comments, setComments] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [userFound, setUserFound] = useState<boolean>(false);
  const [post_Id, setPost_Id] = useState<string | null>(null);
  const token = localStorage.getItem("token");

  const postCommentUrl = "http://localhost:4000/comment/create-comment";
  const allUsersUrl = "http://localhost:4000/user/allUsers";

  const handleChange = (event: {
    target: {
      value: React.SetStateAction<string>;
      style: { height: string };
      scrollHeight: any;
    };
  }) => {
    setValue(event.target.value);
    event.target.style.height = "auto";
    event.target.style.height = `${event.target.scrollHeight}px`;
  };

  const fetchComments = async (): Promise<void> => {
    try {
      const commentsResponse = await axios.get(
        `http://localhost:4000/comment?postId=${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setComments(commentsResponse.data.comments);
    } catch (error) {
      console.error("Failed to fetch comments: ", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(allUsersUrl);
      setUsers(response.data.allUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePostComment = async (): Promise<void> => {
    if (value === "" || !post_Id) {
      return;
    }
    try {
      const response = await axios.post<{ comment: Comment }>(
        postCommentUrl,
        {
          postId: post_Id,
          comment: value,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const newComment: Comment = response.data.comment;
      setComments((prevComments) => [...prevComments, newComment]);
      setValue("");
    } catch (error) {
      console.error("Failed to post comment:", error);
    }
    await fetchComments();
    await fetchUsers();
  };

  const pressEnter = (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handlePostComment();
    }
  };

  useEffect(() => {
    fetchComments();
    setPost_Id(postId);
    fetchUsers();
    setUserFound(true);
  }, []);

  const handleLike = async (commentId: string, userId: string) => {
    await axios.put(`http://localhost:4000/comment/${commentId}`, { userId });
    await fetchComments();
    await fetchUsers();
  };

  const getInitials = (index: number) => {
    if (comments[index].User) {
      return `${comments[index].User.firstName[0]}${comments[index].User.lastName[0]}`;
    } else {
      return;
    }
  };

  const getUserName = (index: number) => {
    if (comments[index].User) {
      return `${comments[index].User.firstName} ${comments[index].User.lastName}`;
    } else {
      return;
    }
  };

  const getCommenterAvatar = (index: number) => {
    for (let i = 0; i < users.length; i++) {
      if (comments[index].User && users[i].id === comments[index].User?.id) {
        return users[i].profilePhoto;
      } else {
        return;
      }
    }
  };

  const timePast = (commentCreatedTime: string) => {
    const timeStamp = new Date(commentCreatedTime).getTime();
    const currentTime = new Date().getTime();
    const timeDifference = Math.floor((currentTime - timeStamp) / 60000);
    const seconds = Math.floor((currentTime - timeStamp) / 1000);

    if (seconds < 0) {
      return null;
    }
    if (seconds < 60) {
      return `${Math.floor(seconds)} s`;
    } else if (timeDifference < 60) {
      return `${Math.floor(timeDifference)} min`;
    } else if (timeDifference / 60 >= 1 && timeDifference / 60 < 2) {
      return `${Math.floor(timeDifference / 60)} hr`;
    } else if (timeDifference / 60 >= 2 && timeDifference < 60 * 24) {
      return `${Math.floor(timeDifference / 60)} hrs`;
    } else if (timeDifference >= 60 * 24 && timeDifference < 60 * 48) {
      return `${Math.floor(timeDifference / (60 * 24))} day`;
    } else if (timeDifference >= 60 * 48 && timeDifference < 60 * 24 * 7) {
      return `${Math.floor(timeDifference / (60 * 24))} days`;
    } else if (timeDifference / (60 * 24 * 7) < 2) {
      return `${Math.floor(timeDifference / (60 * 24 * 7))} week`;
    } else if (
      timeDifference / (60 * 24 * 7) >= 2 &&
      timeDifference / (60 * 24 * 7) < 4
    ) {
      return `${Math.floor(timeDifference / (60 * 24 * 7))} weeks`;
    } else if (
      timeDifference / (60 * 24 * 7) >= 4 &&
      timeDifference / (60 * 24 * 7 * 4) < 2
    ) {
      return `${Math.floor(timeDifference / (60 * 24 * 7 * 4))} month`;
    } else if (
      timeDifference / (60 * 24 * 7 * 4) >= 2 &&
      timeDifference / (60 * 24 * 7 * 4) < 12
    ) {
      return `${Math.floor(timeDifference / (60 * 24 * 7 * 4))} months`;
    } else if (timeDifference / (60 * 24 * 7 * 4 * 12) < 2) {
      return `${Math.floor(timeDifference / (60 * 24 * 7 * 4 * 12))} year`;
    } else {
      return `${Math.floor(timeDifference / (60 * 24 * 7 * 4 * 12))} years`;
    }
  };

  return (
    <div className="commentSectionWrapper">
      {comments.map((comment, index: number) => {
        return (
          <div className="commentSectionContainer" key={index}>
            <div className="commentSection">
              {userFound ? (
                <img
                  className="commentSectionImg"
                  src={getCommenterAvatar(index)}
                  alt="avatar"
                />
              ) : (
                <span className="avatarPh">{getInitials(index)}</span>
              )}
            </div>
            <div className="commentArea">
              <span>{getUserName(index)}</span>
              <p className="commentPara">{comment.comment}</p>
              <div className="CommentLike">
                <div className="commentLeft">
                  <p>{timePast(comment.createdAt)}</p>
                  <button style={{cursor: 'pointer'}}
                    onClick={() => handleLike(comment.id, comment.User.id)}
                  >
                    {comment.like.includes(comment.User?.id)
                      ? `Unlike`
                      : `Like`}
                  </button>
                  <button>Reply</button>
                </div>
                <div className="likeDiv">
                  {comment.like.length > 0 && (
                    <div className="count-like">
                      <p>{comment.like.length}</p>
                      <span>
                        <AiOutlineHeart />
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
      <div className="commentSectionTextArea">
        <textarea
          name=""
          id="commentField"
          value={value}
          onChange={handleChange}
          onKeyDown={pressEnter}
          placeholder="Write a comment"
        />
        <button
          type="submit"
          className="submitComment"
          onClick={handlePostComment}
        >
          <TbSend className="sendIcon" /> send
        </button>
      </div>
    </div>
  );
}