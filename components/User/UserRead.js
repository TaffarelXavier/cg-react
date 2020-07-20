import React, { useState, useEffect } from 'react';
import api from '../../services/axios';

const UserRead = () => {
  const [users, setUsers] = useState('');

  const getUsers = async () => {
    const { data } = await api.get('/users');
    setUsers([...users, data]);
  };

  useEffect(() => {
    getUsers();
  }, []);
  return (
    <table className="table">
      <thead>
        <tr>
          <th>FIRSTNAME</th>
          <th>EMAIL</th>
          <th>PHONE</th>
          <th>PASSWORD</th>
        </tr>
      </thead>
      <tbody>
        {(users || []).map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.firstname}</td>
              <td>{item.email}</td>
              <td>{item.phone}</td>
              <td>{item.password}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserRead;
