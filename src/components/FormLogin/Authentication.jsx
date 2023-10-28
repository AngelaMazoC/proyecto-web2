import React, { useState } from 'react'
import { useAuthContext } from '../../context/AuthContext';

const Authentication = () => {
  const {
    register
  } = useAuthContext();

  const [emailRegister, setEmailRegister] = useState("");
  const [passwordlRegister, setPasswordRegister] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    register(emailRegister, passwordlRegister);  
  }

  return (
    <div className="Register">
      <form className="form">
        <h3 className="title">Register</h3>
        <input
          onChange={(e) => setEmailRegister(e.target.value)}
          className="input"
          type="email"
          placeholder='email'
        />
        <input
          onChange={(e) => setPasswordRegister(e.target.value)}
          className="input"
          type="password"
          placeholder='password'
        />
        <button onClick={(e) => handleRegister(e)} className="button">
          submit
        </button>
      </form>
      {/* <form className="form">
        <h3 className="title">Login</h3>
        <input
          // onChange={(e) => setEmail(e.target.value)}
          className="input"
          type="email"
        />
        <input
          // onChange={(e) => setPassword(e.target.value)}
          className="input"
          type="password"
        />
        <button onClick={(e) => handleLogin(e)} className="button">
          submit
        </button>
        <button onClick={(e) => handleGoogle(e)} className="button">
          Google
        </button>
      </form> /}

      {/ <button onClick={()=> handleLogout()} className="button">Logout</button> */}
    </div>
  )
}

export default Authentication