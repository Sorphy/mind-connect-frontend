import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./input.css";
import EmojiPicker from "emoji-picker-react";
import { toast } from "react-toastify";
import iconImage from "../../assets/Icon.png";
import imagepics from "../../assets/Imagepics.png";
import videoicon from "../../assets/videoicon.png";
import emojicon from "../../assets/emojicon.png";

const cloudinaryConfig = {
  cloud_name: "dosxg5djg",
  api_key: "659795285683827",
  api_secret: "KXyC9YYT2ScTBVAhdTHbi0w6aW4",
};

const Input = () => {
  const [postContent, setPostContent] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [showBigInput, setShowBigInput] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const bigDivRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        bigDivRef.current &&
        !bigDivRef.current.contains(event.target as Node) &&
        event.target instanceof Node &&
        !event.target.parentElement?.contains(bigDivRef.current)
      ) {
        setShowBigInput(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const uploadToCloudinary = async (
    files: File[],
    uploadPreset: string
  ): Promise<{ images: string[]; videos: string[] }> => {
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudinaryConfig.cloud_name}/upload`;

    const uploadPromises = files.map((file) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", uploadPreset);

      return axios.post(cloudinaryUrl, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    });

    const responses = await Promise.all(uploadPromises);

    const images: string[] = [];
    const videos: string[] = [];

    responses.forEach((response) => {
      const secureUrl = response.data.secure_url;
      if (response.data.resource_type === "image") {
        images.push(secureUrl);
      } else if (response.data.resource_type === "video") {
        videos.push(secureUrl);
      }
    });

    return { images, videos };
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const { images, videos } = await uploadToCloudinary(files, "up4x5dza");

      const requestData = {
        postContent: postContent,
        image: images,
        video: videos,
      };

      const response = await axios.post(
        "http://localhost:4000/post/create-post",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        // Post created successfully
        console.log("Post created successfully");
        setPostContent("");
        setFiles([]);
        setImagePreviews([]);
        setShowBigInput(false); // Reset the state of showBigInput
      } else {
        // Handle error
        console.error("Error creating post:", response.data.Error);
        toast.error("Error creating post");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post");
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    setPostContent(value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      event.target.value = ""; // Reset the file input value
    }
  };

  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files;
    if (selectedFiles) {
      const filesArray = Array.from(selectedFiles);
      const previews = filesArray.map((file) => URL.createObjectURL(file));
      setFiles((prevFiles) => [...prevFiles, ...filesArray]);
      setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
      event.target.value = ""; // Reset the file input value
    }
  };

  const handleSmallInputClick = () => {
    setShowBigInput((prevState) => !prevState);
  };

  const handleEmojiIconClick = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  return (
    <div className="input-section" ref={bigDivRef}>
      {showBigInput && (
        <div className="big-div">
          <form onSubmit={handleSubmit}>
            <div className="big-input-container">
              <textarea
                className="big-input"
                name="content"
                placeholder="What do you want to share?"
                value={postContent}
                onChange={handleInputChange}
              />
              <div className="image-container">
                {imagePreviews.map((preview, index) => {
                  const file = files[index];
                  const isVideo = file.type.includes("video");

                  if (isVideo) {
                    return (
                      <video key={index} controls className="image-preview">
                        <source src={preview} type={file.type} />
                      </video>
                    );
                  } else {
                    return (
                      <img
                        key={index}
                        src={preview}
                        alt="Preview"
                        className={`image-preview${
                          index === 0 ? " first-image" : ""
                        }`}
                        style={{
                          width: `${120 / (imagePreviews.length + 1)}%`,
                          height: `${(500 / (imagePreviews.length + 1)) *
                            (3 / 4)}%`,
                          
                        }}
                      />
                    );
                  }
                })}
              </div>

              <div className="coverb">
                <div className="icon-box">
                  <label>
                    <img
                      src={imagepics}
                      alt="Icon"
                      style={{ marginLeft: "7rem", cursor: "pointer" }}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: "none" }}
                      onChange={handleFileChange}
                      multiple
                    />
                  </label>
                  <label>
                    <img
                      src={videoicon}
                      alt="Icon"
                      style={{ marginLeft: "2rem", cursor: "pointer" }}
                    />
                    <input
                      type="file"
                      accept="video/*"
                      style={{ display: "none" }}
                      onChange={handleVideoChange}
                      multiple
                    />
                  </label>

                  <label>
                    <img
                      src={emojicon}
                      alt="Icon"
                      style={{ marginLeft: "2rem", cursor: "pointer" }}
                      onClick={handleEmojiIconClick}
                    />
                  </label>
                  {showEmojiPicker && (
                    <div className="emoji-picker-container">
                      <EmojiPicker
                        onEmojiClick={(emojiObject) => {
                          setPostContent(postContent + emojiObject.emoji);
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className="buttonb">
                  <button className="post-button" type="submit">
                    Post
                    <img src={iconImage} alt="Icon" />
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}
      {!showBigInput && (
        <form>
          <div className="small-div" onClick={handleSmallInputClick}>
            <input
              className="small-input"
              type="text"
              placeholder="Write something..."
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default Input;