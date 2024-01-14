import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import { Link, useNavigate } from 'react-router-dom';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

const AddPost: React.FC = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const navigate = useNavigate(); // Use the recommended hook for navigation

    const handleAddPost = async () => {
        try {
            const storedUser = localStorage.getItem('accessToken');

            const response = await axios.post('http://localhost:3000/posts', {
                title: title,
                content: content,
            }, {
                headers: {
                    Authorization: `${storedUser}`,
                },
            });

            const createdPost = response.data;

            console.log('Created Post:', createdPost);
            // Extract the ID from the response
            const postId = createdPost.data.id;

            // Redirect to the post details page
            navigate(`/posts/${postId}`);

        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div className="mx-auto mt-8" style={{ width: '700px' }}>
            <h1 className="text-3xl font-bold mb-4">Add Post</h1>
            <form>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="border border-gray-300 p-2 w-full rounded-md"
                    />
                </div>
                <div className="mb-8">
                    <label htmlFor="content" className="block text-gray-700 font-semibold mb-2">
                        Content
                    </label>

                    <ReactQuill
                        value={content}
                        onChange={(value) => setContent(value)}
                        className="border border-gray-300 rounded-md"
                    />

                </div>
                <div className='mt-4'>
                    <button
                        type="button"
                        onClick={handleAddPost}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        Add Post
                    </button>
                    <Link to="/posts" className="ml-4 text-blue-500">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddPost;
