// src/PostDetail.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const formatDate = (dateString: string | number | Date) => {
    return new Date(dateString).toLocaleString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
};

const PostDetail: React.FC = () => {
    const { postId } = useParams();
    const [post, setPost] = useState<Post | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`http://localhost:3000/posts/${postId}`)
            .then(response => {
                console.log(response.data.data);
                setPost(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [postId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found</div>;
    }



    return (
        <div className="mx-auto mt-8" style={{ width: '700px' }}>
            <Link to="/posts">Back to Posts</Link>
            <h1 className="text-3xl font-bold mb-4">Post Detail</h1>
            <h2 className="text-xl font-semibold mb-2" dangerouslySetInnerHTML={{ __html: post.title }} ></h2>
            <p
                className="text-gray-600"
                dangerouslySetInnerHTML={{ __html: post.content }}
            ></p>
            <p className="text-gray-500 mt-2">{formatDate(post.createdAt)}</p>
        </div>
    );
};

export default PostDetail;
