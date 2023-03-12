import { useEffect, useState, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import * as UserHelper from '../api/Users'
const SignUp = () => {
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem('jwt')) {
      navigate('/profile')
    }
  })

  const [data, setdata] = useState({ name: '', email: '', password: '' })
  const handlerInput = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setdata({ ...data, [name]: value })
  }

  const signup = useCallback(async () => {
    if (data.name === '' || data.email === '' || data.password === '') {
      alert('Please Fill all the fields')
    } else {
      try {
        await UserHelper.userSignup(data, navigate)
        alert('signup successfully now you can login')
        navigate('/login')
      } catch (err) {
        if (err.response.status === 422) alert(err.response.data.errors[0].msg)
        else alert('Email already exist')
      }
    }
  }, [data, navigate])

  return (
    <div className='center'>
      <h1>Welcome To Post App</h1>
      <h1>Signup forms</h1>
      <br></br>
      <form onSubmit={handlerInput}>
        <input
          className='form-control'
          type='text'
          placeholder='Enter Your Name'
          value={data.fname}
          onChange={handlerInput}
          name='name'
          required
        />
        <input
          className='form-control'
          type='email'
          placeholder='Enter Your Email'
          value={data.email}
          onChange={handlerInput}
          name='email'
          required
        />
        <input
          className='form-control'
          type='password'
          placeholder='Enter Your Password'
          value={data.password}
          onChange={handlerInput}
          name='password'
          required
        />
        <input
          className='form-control'
          type='submit'
          onClick={signup}
          value='Sign Up'
        />
      </form>
      <button className='button'>
        <Link to='/login'>Login</Link>
      </button>
    </div>
  )
}

export default SignUp
