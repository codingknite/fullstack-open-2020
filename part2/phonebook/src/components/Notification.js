import React from 'react';

const Notification = ({ name }) => {
  if (name === null) {
    return null;
  }

  const notification = {
    border: '2px solid green',
    padding: 8,
    backgroundColor: 'gray',
  };

  const notificationP = {
    color: 'green',
  };

  return (
    <div style={notification}>
      <p style={notificationP}>{name}</p>
    </div>
  );
};

export default Notification;
