import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { FaCamera } from "react-icons/fa";

const Profile = () => {
  const [user, setUser] = useState(null);
  const { authUser } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(`/api/user/profile`);
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.error(response.data.message);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (authUser) {
      fetchUserProfile();
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div className="profile-container">
      {/* Profile Picture Section */}
      <div className="profile-header flex justify-center items-center mb-6">
        <div className="relative">
          <img
            src={user.profilepic || "/default-avatar.png"} // Show a default image if none is available
            alt={user.username}
            className="rounded-full w-32 h-32 object-cover border-4 border-white"
          />
        </div>
      </div>

      {/* Profile Information Section */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-white">{user.username}</h1>
      </div>
    </div>
  );
};
export default Profile;
