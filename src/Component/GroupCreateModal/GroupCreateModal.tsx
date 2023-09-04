import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GroupCreateModal.css';
import Button from '../Button/Button';
import { BsCheckCircleFill } from 'react-icons/bs';

const GroupCreateModal = () => {
  const [groupName, setGroupName] = useState('');
  const [about, setAbout] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // Retrieve token from local storage
    const token = localStorage.getItem('token');

    // Create a new group
    try {
      const response = await axios.post(
        'http://localhost:4000/group/create-group',
        {
          groupName,
          about,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message using react-toastify
      toast.success('Group created successfully');

      // Handle the response as desired (e.g., navigate to group page)
      console.log('Group created:', response.data);

      // Reset form inputs
      setGroupName('');
      setAbout('');

      // Show the modal
      setShowModal(true);
    } catch (error) {
      // Handle the error (e.g., show error message)
      console.error('Error creating group:', error);
    }
  };

  const handleDoneClick = () => {
    // Hide the modal and perform any desired action
    setShowModal(false);
  };

  return (
    <div>
      <form className="form-body" onSubmit={handleSubmit}>
        <h2>Create a new group here</h2>

        <label>Group name</label>
        <input
          type="text"
          placeholder="Enter group name"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
        <label>About</label>
        <textarea
          placeholder="Write group description"
          value={about}
          onChange={(e) => setAbout(e.target.value)}
        />

        <button type="submit">Create a new group</button>
      </form>
   
      {showModal && (
        <div className="joined-modal-wrapper">
          <div className="joined-modal" onClick={handleDoneClick}>
            <div className="joinedModal">
              <div className="">
                <span>
                  <BsCheckCircleFill className="icon" />
                </span>
              </div>
              <div className="joinedBody">
                <h4 className="joinedhead">Joined group</h4>
              </div>
              <div className="joinedBody">
                <p className="joinedP">
                  You have successfully created a new group: {groupName}
                </p>
              </div>
              <div className="button">
                <div>
                  <Button
                    height="44px"
                    width="350px"
                    backgroundColor="#F2F4F7"
                    color="#101828"
                    onClick={handleDoneClick}
                  >
                    Done
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCreateModal;
