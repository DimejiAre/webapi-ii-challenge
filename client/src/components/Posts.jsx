import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './Posts.scss';

function Posts(){
const [posts, setPosts] = useState([])

  useEffect(()=>{
    axios.get('http://localhost:4000/api/posts')
      .then(response => {
        debugger
        setPosts(response.data)
      })
  },[])
    return (
        <div className='posts'>
            {posts ?
                posts.map(post => (
                    <div className='post'>
                        <h2>Title: {post.title}</h2>
                        <p>Contents: {post.contents}</p>
                        <p>Created At: {post.created_at}</p>
                        <p>Updated At: {post.updated_at}</p>
                    </div>
                ))
            : null}
        </div>
    )
}

export default Posts;