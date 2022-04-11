import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'

const Nav = () => {
  let history = useNavigate()

  const session_id: any = sessionStorage.getItem('session_id')
  const allSessionString: any = sessionStorage.getItem('allSession')
  const allSession = JSON.parse(allSessionString)
  const currentSession = allSession.find((data: any) => data?.id === session_id)

  const logout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You want to logout !',
      icon: 'warning',

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        sessionStorage.clear()
        history('/admin')
        return
      }
    })
  }
  // allSession
  return (
    <>
      <div
        style={{
          background: 'grey',
          padding: 10,
          top: 0,
          position: 'absolute',
          width: '100%',
        }}
      >
        <h4 className=" font-medium leading-tight  text-2xl mt-0 text-lime-50 float-left">
          {currentSession?.session_name}
        </h4>

        <h4 className=" font-medium leading-tight  text-base mt-0 text-lime-50 float-right">
          <div onClick={() => logout()} style={{ cursor: 'pointer' }}>
            <LogoutIcon />
          </div>
        </h4>
      </div>

      <div className="flex items-center my-5 mx-2">
        {/* <div
        className="flex justify-center items-center my-4 mr-2 p-0"
        style={{
          background: 'white',
        }}
      >
        <button
          onClick={() => history('/add-question')}
          className="flex items-center justify-center  text-dark font-bold p-2 rounded mr-2 "
          style={{ width: '100%' }}
        >
          Add Questions
        </button>
      </div> */}

        <div
          className="flex justify-center items-center my-4 mr-2 p-0"
          style={{
            background: 'white',
          }}
        >
          <button
            onClick={() => history('/question-list')}
            className="flex items-center justify-center  text-dark font-bold p-2 rounded mr-2 "
            style={{ width: '100%' }}
          >
            Questions
          </button>
        </div>

        <div
          className="flex justify-center items-center my-4 mr-2 p-0"
          style={{
            background: 'white',
          }}
        >
          <button
            onClick={() => history('/score')}
            className="flex items-center justify-center  text-dark font-bold p-2 rounded mr-2 "
            style={{ width: '100%' }}
          >
            Session Leader Board
          </button>
        </div>

        <div
          className="flex justify-center items-center my-4 mr-2 p-0"
          style={{
            background: 'white',
          }}
        >
          <button
            onClick={() => history('/score-all')}
            className="flex items-center justify-center  text-dark font-bold p-2 rounded mr-2 "
            style={{ width: '100%' }}
          >
            Overall Leader Board
          </button>
        </div>
      </div>
    </>
  )
}

export default Nav
