// src/App.jsx
import { BrowserRouter as Router, Routes, Navigate, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import PostDetail from './component/PostDetail';
import Posts from './component/Posts';
import Header from './component/Header';
import AddPost from './pages/AddPost';

const App = () => {

  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex-grow w-full bg-[#E6EFFA]">
          <Routes>
            <Route path="/" element={<Navigate to="/posts" replace />} />
            <Route path="/posts/:postId" element={<PostDetail />} />
            <Route path="/add-post" element={<AddPost />} />
            <Route path="/posts" element={<Posts />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
