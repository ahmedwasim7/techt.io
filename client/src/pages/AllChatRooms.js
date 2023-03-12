import { useState, useEffect } from 'react'
import * as chatApi from '../api/Chat'

const AllChatRooms = () => {
  const [chatRooms, setChatRooms] = useState(null)
  const [check, setCheck] = useState(false)

  const getRooms = async () => {
    const rooms = await chatApi.getRooms()
    setChatRooms(rooms.data)
  }

  const joinRoom = async (room_id) => {
    const rooms = await chatApi.joinRoom({ room_id: room_id })
    setCheck(!check)
  }

  useEffect(() => {
    getRooms()
  }, [check])

  return (
    <>
      <div className='container-fluid'>
        <table className='table table-hover'>
          <thead>
            <tr>
              <th scope='col'>No</th>
              <th scope='col'>Room Name</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {chatRooms &&
              chatRooms.map((room, index) => (
                <tr key={index}>
                  <th scope='row'>{index + 1}</th>
                  <td>{room.name}</td>
                  <td>
                    <button onClick={() => joinRoom(room._id)}>
                      Join Room
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default AllChatRooms
