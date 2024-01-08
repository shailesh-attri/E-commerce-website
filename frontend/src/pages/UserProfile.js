// src/components/UserProfile.js
import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const UserProfile = () => {
  const [user] = useAuthState(auth);

  return (
    <div>
      {user ? (
        <div>
          <img src={user.photoURL} alt="User Profile" />
          <span>{user.displayName}</span>
          <span>{user.email}</span>
        </div>
      ) : (
        <div>
          <p>User not logged in.</p>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
