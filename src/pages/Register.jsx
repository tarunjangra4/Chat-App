import React from 'react'
import "../style.scss";
import add from "../image/addAvatar.png"

const Register = () => {
  return (
    <div className='register-container'>
        <div className='form-container'>
            <h2 className='logo'>Just Chat</h2>
            <h5 className='title'>Sign Up</h5>
            <form>
                <input type="text" name="name" placeholder='Name' className="" />
                <input type="email" name="email" placeholder='Email' className="" />
                <input type="password" name="password" placeholder='Password' className="" />
                <input style={{display:"none"}} type="file" id='file' />
                <label htmlFor="file">
                  <img src={add} alt='' />
                  <span>Add an avatar</span>
                </label>
                <button>Sign up</button>
            </form>
            <p>Already have an account? <a href='/'>Login</a></p>
        </div>
    </div>
  )
}

export default Register