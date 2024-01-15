import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ExportModal from '../../src/component/ExportModal';

interface Post {
    id: number;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
}

const Posts: React.FC = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(3);
    const [totalPages, setTotalPages] = useState(1);
    const [isExportModalOpen, setExportModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3000/posts');
                const allPosts = response.data.data;

                setTotalPages(Math.ceil(allPosts.length / postsPerPage));

                const indexOfLastPost = currentPage * postsPerPage;
                const indexOfFirstPost = indexOfLastPost - postsPerPage;
                const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

                setPosts(currentPosts);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [currentPage, postsPerPage]);

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const handleExportClick = () => {
        setExportModalOpen(true);
    };

    const handleExport = (filename: string) => {
        console.log('Exporting with filename:', filename);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="mx-auto mt-8" style={{ width: '700px' }}>
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-3xl font-bold">Posts</h1>
                <div className="flex space-x-4">
                    <Link to="/add-post" className="text-white bg-blue-500 px-4 py-2 rounded-md">
                        Add Post
                    </Link>
                    <button
                        onClick={handleExportClick}
                        className="text-white bg-green-500 px-4 py-2 rounded-md"
                    >
                        Export
                    </button>
                </div>
            </div>
            <ExportModal
                isOpen={isExportModalOpen}
                onRequestClose={() => setExportModalOpen(false)}
                onExport={handleExport}
            />
            <ul>
                {posts.map(post => (
                    <li key={post.id} className="bg-white rounded-lg shadow-md p-4 mb-4">
                        <Link to={`/posts/${post.id}`}>
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                        </Link>
                        <p className="text-gray-600" dangerouslySetInnerHTML={{ __html: post.content }}></p>
                        <p className="text-gray-500 mt-2">Created at: {post.createdAt}</p>
                        <p className="text-gray-500">Updated at: {post.updatedAt}</p>
                    </li>
                ))}
            </ul>

            <div className="flex justify-center mt-4">
                {Array.from({ length: totalPages }, (_, index) => index + 1).map(pageNumber => (
                    <button
                        key={pageNumber}
                        onClick={() => paginate(pageNumber)}
                        className={`mx-1 px-3 py-2 rounded-md ${currentPage === pageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'}`}
                    >
                        {pageNumber}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Posts;
