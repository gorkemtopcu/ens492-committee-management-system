import React, { useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Card, Badge, Avatar, Modal } from 'antd';

const { Meta } = Card;

const UserProfileWithNotification = () => {
  const [showPopup, setShowPopup] = useState(false);

  const handleIconClick = () => {
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <Card className="user-profile-card">
        <div className="d-flex gap-3 align-items-center">
          <div className="position-relative">
            <IoMdNotifications className="fs-4" onClick={handleIconClick} style={{ cursor: 'pointer' }} />
            <Badge count={3} className="badge-notification" />
          </div>
          <div>
            <Avatar src="https://img.freepik.com/free-icon/user_318-563642.jpg?w=360" size={40} />
          </div>
          <div className="user-info">
            <Meta
              title="Username"
              description="username@sabanciuniv.edu"
            />
          </div>
        </div>
      </Card>
      <Modal
        title="Popup Form"
        open={showPopup}
        onCancel={handlePopupClose}
        footer={null}
      >
      </Modal>
    </div>
  );
};

export default UserProfileWithNotification;
