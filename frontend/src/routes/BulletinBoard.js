import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
// import { Box, Button, Text, Heading, VStack } from '@chakra-ui/react';
import { VStack } from '@chakra-ui/react';
function BulletinBoard() {
  const [posts, setPosts] = useState([]);
// 게시글 작성 백엔드요청
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/board/posts/')
      .then(response => {
        setPosts(response.data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  }, []);
// 게시글 작성페이지 css
  return (
    <VStack spacing={4} align="stretch">
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        <div style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '800px' }}>
          <div style={{ borderBottom: '2px solid #000', padding: '10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong>전체글보기</strong>
            </div>
            <div>
              <Link to="/create-post" style={{ border: '2px solid #000', padding: '5px 10px', borderRadius: '4px', color: '#000', textDecoration: 'none' }}>글쓰기</Link>
            </div>
          </div>
        </div>
        {posts.map(post => (
  <Link to={`/posts/${post.id}`} key={post.id} style={{ textDecoration: 'none', color: 'inherit', width: '100%', maxWidth: '800px', marginTop: '1px' ,marginBottom: '1px' }}>
    <div style={{ borderBottom: '1px solid #ddd', padding: '10px', display: 'flex', alignItems: 'center' }}>
      <div style={{ flex: '0.5' }}>
      <span style={{ fontSize: '16px' }}>•</span>
   </div>
   <div style={{ flex: '12', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
      <strong>{post.title}</strong>
   </div>
   <div style={{ flex: '2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
     {post.username}
    </div>
    <div style={{ flex: '2', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
     {new Date(post.created_at).toLocaleDateString()}
    </div>
    <div style={{ flex: '0' }}>
     {post.viewCount}
   </div>
  </div>
  </Link>
        ))}
      </div>
    </VStack>
  );
}

export default BulletinBoard;