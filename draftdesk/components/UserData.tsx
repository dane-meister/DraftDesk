// components/UserProfile.tsx
`use client`;
import { useEffect, useState } from 'react';
import axios from 'axios';

/*
interface UserData {
  email: string;
  penName: string;
  isAdmin: boolean;
  memberSince: string; 
  projects: string[]; // Assuming project names as strings for simplicity
}**/

const UserProfile: React.FC = () => {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
        try {
          const response = await axios.get('http://localhost:5000/user', { withCredentials: true });
          setUserData(response.data);
        } catch (err) {
          setError('Failed to fetch user data');
        } finally {
          setLoading(false);
        }
    };

    fetchUserData();
  }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!userData) {
        return <div>User not found</div>; // Handle case where user data is not available
    }

    return (
        <div>
          <h1>User Profile</h1>
          <p>Email: {userData.email}</p>
          <p>Pen Name: {userData.penName}</p>
          <p>Member Since: {new Date(userData.memberSince).toLocaleDateString()}</p>
          <h2>Projects</h2>
          <ul>
            {userData.projects.map((project: any) => (
              <li key={project._id}>{project.name}</li>
            ))}
          </ul>
        </div>
      );
    };

export default UserProfile;
