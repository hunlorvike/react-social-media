// src/component/UserProfile.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  fullName: string;
  email: string;
}

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
  }
  

const UserProfile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:3000/users/${userId}`);
        setUser(userResponse.data.data);

        const postsResponse = await axios.get(`http://localhost:3000/posts/author/${userId}`);
        console.log(postsResponse)
        setPosts(postsResponse.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!user) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto mt-8 flex">
      <div className="w-3/12 pr-4">
        <div className="bg-white p-4 rounded-md shadow-md mb-4">
          <h1 className="text-2xl font-bold mb-2">{user.fullName}</h1>
          <p className="text-gray-600">{user.email}</p>
        </div>
      </div>
      <div className="w-9/12">
        <div className="bg-white p-8 rounded-md shadow-md">
          {posts.length > 0 ? (
            posts.map(post => (
              <div key={post.id} className="bg-gray-100 p-4 rounded-md mb-4">
                <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
                <div className="w-full overflow-x-auto">
                  <p className="text-gray-600 whitespace-pre-line">{post.content}</p>
                </div>
                <div className="flex items-center mt-4">
                  <button className="text-blue-500 hover:underline mr-4">Like</button>
                  <button className="text-gray-600 hover:underline">Comment</button>
                </div>
              </div>
            ))
          ) : (
            <p>No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
