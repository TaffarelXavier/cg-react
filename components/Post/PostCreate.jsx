import React, { useState, useEffect } from 'react';
import api from '../../services/axios';

const PostCreate = () => {
  const [firstname, setFirstname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = async (ev) => {
    const { data } = await api
      .post(
        '/graphql',
        {
          query: `mutation {
      save(firstname:${firstname},email:${email},phone:${phone},password:${password})
{firstname, email, phone, password
}}`,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
      .then()
      .catch();
    ev.preventDefault();
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="firstname_1">Firstname</label>
          <input
            name="firstname"
            id="firstname_1"
            value={firstname}
            onChange={({ target }) => {
              setFirstname(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="email_1">Email</label>
          <input
            name="email"
            id="email_1"
            value={email}
            onChange={({ target }) => {
              setEmail(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="phone_1">Phone</label>
          <input
            name="phone"
            id="phone_1"
            value={phone}
            onChange={({ target }) => {
              setPhone(target.value);
            }}
          />
        </div>
        <div>
          <label htmlFor="password_1">Password</label>
          <input
            name="password"
            id="password_1"
            value={password}
            onChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </div>
      </form>
    </>
  );
};

export default PostCreate;
