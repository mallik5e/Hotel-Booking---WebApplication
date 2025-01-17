import React, { useContext } from 'react'
import { AuthContext } from './AuthProvider'
import { Link, useNavigate } from 'react-router-dom'

const Logout = () => {
    const auth = useContext(AuthContext) 
    const navigate = useNavigate()

    const handleLogout = () => {
        auth.handleLogout()
        window.location.reload()
        navigate("/", {state: {message : "You have been logged out!"}})
    }

  const isLoggedIn = localStorage.getItem("token")

  return isLoggedIn ?  (
    <>
    <li>
        <Link className='dropdown-item' to={"/profile"}>
        Profile
        </Link>
    </li>
      <hr className='dropdown-divider' />
      <button className='dropdown-item' onClick={handleLogout}>
        Logout
      </button>
    </>
  ) : null
}

export default Logout