import React, { useEffect, useState } from 'react';
import { IoMdNotifications } from 'react-icons/io';
import { Card, Badge, Avatar, Modal, List } from 'antd';
import ActiveMemberService from 'product/service/active_member';
import StringConstants from 'product/constants/StringConstants';

const { Meta } = Card;

const UserProfileWithNotification = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [closeToRetireMembers, setCloseToRetireMembers] = useState([]);

  

  useEffect(() => {
    fetchData();
}, []);

  const fetchData = async () => {
    ActiveMemberService.getNearRetirement()
        .then(response => {
            response.data.map(e => { if (e.exclude === null) { e.exclude = false; } });
            setCloseToRetireMembers(response.data);
        })
        .catch(error => {
            alert(StringConstants.ERROR);
        })
        .finally(() => {
        });
};

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
            <Badge count={closeToRetireMembers ? closeToRetireMembers.length : 0} className="badge-notification" />
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
        title="Members Close to Retirement"
        open={showPopup}
        onCancel={handlePopupClose}
        footer={null}
      >
        <List
          itemLayout="horizontal"
          dataSource={closeToRetireMembers}
          renderItem={member => (
            <List.Item>
              <List.Item.Meta
                avatar={<Avatar src={member.avatar || 'https://img.freepik.com/free-icon/user_318-563642.jpg?w=360'} />}
                title={member.fullName}
                description={`Expected to retire: ${member.expectedRetirement}`}
              />
            </List.Item>
          )}
        />
      </Modal>
    </div>
  );
};

export default UserProfileWithNotification;
