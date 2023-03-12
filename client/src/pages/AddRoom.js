import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import * as chatApi from '../api/Chat'

const AddRoom = () => {
  const [title, setTitle] = useState('')
  const navigate = useNavigate()

  const handlerInput = e => {
    e.preventDefault()
  }

  const addRoom = async() => {
     await chatApi.addRoom({ name: title })
     navigate('/joinedrooms')
  }

  return (
      <form onSubmit={handlerInput}>
        <input
          className='form-control'
          type='text'
          placeholder='Enter title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required={true}
          name='title'
        />
        <input
          className='form-control'
          type='submit'
          onClick={() => {
            addRoom()
          }}
          value='Add Room'
        />
      </form>
  )
}

export default AddRoom
