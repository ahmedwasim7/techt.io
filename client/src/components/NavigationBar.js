import { useState } from 'react'
import { Link } from 'react-router-dom'

const NavigationBar = () => {
  const [check, setCheck] = useState(localStorage.getItem('jwt'))

  const handleRemoveCookie = () => {
    localStorage.removeItem('jwt')
    setCheck('')
  }

  const stylesheet = {
    link: {
      color: 'white',
      fontSize: '20px',
      textDecoration: 'none',
      marginRight: '20px',
    },
  }

  return (
    <div className='container-fluid'>
      <nav className='menu'>
        {check ? (
          <>
            <Link style={stylesheet.link} to='/allrooms'>
              Chat Rooms
            </Link>
            <Link style={stylesheet.link} to='/joinedrooms'>
              Joined Rooms
            </Link>
            <Link style={stylesheet.link} to='/addroom'>
              Add Room
            </Link>
            <Link style={stylesheet.link} to='/login' onClick={handleRemoveCookie}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link style={stylesheet.link} to='../signup'>
              Signup
            </Link>
            <Link style={stylesheet.link} to='../login'>
              Login
            </Link>
          </>
        )}
      </nav>
    </div>
  )
}

export default NavigationBar
