import axios from 'axios'
import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as UserHelper from '../api/Users'
axios.defaults.withCredentials = true

const LogIn = () => {
  const navigate = useNavigate()
  const [data, setdata] = useState({ email: '', password: '' })

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      const url = '/profile'
      navigate(url)
    }
  }, [navigate])

  const InputHandler = (e) => {
    const { name, value } = e.target
    setdata({ ...data, [name]: value })
  }

  const login = useCallback(async () => {
    try {
      const result = await UserHelper.userLogin(data)
      const token = result.data.token
      localStorage.setItem('jwt', token)
      navigate('/joinedrooms')
      window.location.reload(false)
    } catch (err) {
      alert('internal server error')
    }
  }, [data, navigate])

  return (
    <div className='center'>
      <h1>Welcome To Post App</h1>
      <h1>Login forms</h1>
      <br></br>
      <form
        style={{ margin: 'auto', width: '400px' }}
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <input
          className='form-control'
          type='email'
          placeholder='Enter Your Email'
          onChange={InputHandler}
          name='email'
        />
        <input
          className='form-control'
          type='password'
          placeholder='Enter Your Password'
          onChange={InputHandler}
          name='password'
        />
        <input
          className='form-control'
          type='submit'
          value='Login'
          onClick={() => {
            login()
          }}
        />
      </form>
      <button className='button'>
        <Link to='/signup'>Sign Up</Link>
      </button>
    </div>
  )
}

export default LogIn
