import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './GroupCard.css';
import GroupCreateModal from '../GroupCreateModal/GroupCreateModal';
import { formatDistanceToNow } from 'date-fns';
import Button from '../Button/Button';
import { BsCheckCircleFill } from 'react-icons/bs';

interface Group {
  postCount: number;
  memberCount: number;
  id: string;
  groupName: string;
  about: string;
  userId: string;
  users: any[]; // You can replace `any[]` with the appropriate user type
  updatedAt: string;
  createdAt: string;
  User: {
    firstName: string;
    lastName: string;
  };
}

interface FetchGroupsResponse {
  message: string;
  result: Group[];
}

const styles = {
  card: {
    backgroundColor: '#fcfcfd',
    borderRadius: '15px',
  },
};

const GroupCard: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGroups = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get<FetchGroupsResponse>(
        'http://localhost:4000/group/all',
        config
      );
      const fetchedGroups = response.data.result;
      setGroups(fetchedGroups);
    } catch (error) {
      console.error('Error fetching groups:', error);
    }
  };

  useEffect(() => {
    fetchGroups();
  }, []);

  const handleJoinGroup = async (group: Group) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('Token not found in local storage');
        return;
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.post(
        `http://localhost:4000/group/group/${group.id}/join`,
        { id: group.id },
        config
      );

      const joinedGroup = response.data.group;
      console.log('Joined Group:', joinedGroup);

      setSelectedGroup(joinedGroup);
      setShowModal(true);

      // Optionally, you can refetch the groups to update the UI
      fetchGroups();
    } catch (error) {
      console.error('Error joining group:', error);
      // Show error message or handle the error condition
    }
  };

  const handleCloseModal = () => {
    setSelectedGroup(null);
    setShowModal(false);
  };

  const formatDate = (dateString: string): string => {
    const createdAt = new Date(dateString);
    return formatDistanceToNow(createdAt, { addSuffix: true });
  };

  const handleDoneClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowModal(false);
    console.log('Done clicked');
  };

  return (
    <div className="groupx">
      <div className="groupt">
        <h2>Popular Groups</h2>
        {groups
          .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
          .map((group) => (
            <Card key={group.id} style={styles.card} className="card">
              <div className="group-con">
                <h1 className="group-name">{group.groupName}</h1>
                <div className="name-date">
                  <p className="date">
                    Created By: {group.User.firstName} {group.User.lastName}
                  </p>
                  <p className="date">{formatDate(group.createdAt)}</p>
                </div>
              </div>
              <div className="description">
                <p>{group.about}</p>
                <div className="members">
                  <p>{group.memberCount} Members</p>
                  <p>{group.postCount} Posts</p>
                </div>
              </div>
              <span className="linked" onClick={() => handleJoinGroup(group)}>
                Join Group
              </span>
            </Card>
          ))}
      </div>
      <div className="leftG">
        <GroupCreateModal />
      </div>
      {showModal && selectedGroup && (
        <div className="joined-modal-wrapper">
          <div className="joined-modal" onClick={handleCloseModal}>
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
                  You can now view, interact, and make posts in the {selectedGroup.groupName} group.
                </p>
              </div>
              <div className="button">
                <div>
                  <Button
                    height="44px"
                    width="67px"
                    backgroundColor="#F2F4F7"
                    color="#101828"
                    onClick={handleDoneClick}
                  >
                    Done
                  </Button>
                </div>
                <div>
                  <Link to="#">
                    <Button height="44px" width="119px" backgroundColor="#175CD3" color="#fff">
                      Visit group
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCard;
