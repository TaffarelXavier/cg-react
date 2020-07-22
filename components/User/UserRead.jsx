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
          <th>NOME</th>
          <th>IDADE</th>
          <th>SENHA</th>
          <th>EMAIL</th>
          <th>CELULAR</th>
        </tr>
      </thead>
      <tbody>
        {(users || []).map((item) => {
          return (
            <tr key={item.id}>
              <td>{item.nome}</td>
              <td>{item.idade}</td>
              <td>{item.senha}</td>
              <td>{item.email}</td>
              <td>{item.celular}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default UserRead;
