import React, { useState, useEffect } from 'react';
 import api from '../../services/axios';

 const PostRead = () => {
  const [posts, setPosts] = useState("")

    
    const getPosts = async () => {

        try {
          const query = `{
            {
              teste
            }
          }`;
      const { data } = await api.post(
        '/graphql',
        { query },
        {
          headers: { 'content-type': 'application/json' },
        },);
      setUsers([...posts, data.data]);
      } catch (error) {
          console.error(error);
      }
    };
  
    useEffect(() => {
      getPosts();
    }, []);
return <table className="table"><thead><tr><th>FIRSTNAME</th><th>EMAIL</th><th>PHONE</th><th>PASSWORD</th></tr></thead><tbody>{(posts || []).map(item => {
      return <tr key={item.id}><td>{item.firstname}</td><td>{item.email}</td><td>{item.phone}</td><td>{item.password}</td></tr>})}</tbody></table>
}

export default PostRead;
 