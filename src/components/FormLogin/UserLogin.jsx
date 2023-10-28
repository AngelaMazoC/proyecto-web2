import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const UserLogin = () => {
  const {
    login
  } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    login(email, password);  
  }

  return (
    <div className="Login">
      <form className="form">
        <h3 className="title">Login</h3>
        <input
          onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
          placeholder='email'
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
          placeholder='password'
        />
        <button onClick={(e) => handleLogin(e)} className="button">
          submit
        </button>
      </form>
    </div>
  )
}

export default UserLogin