import React, { useEffect, useState } from 'react'
import { Card, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import LogoutIcon from '@mui/icons-material/Logout'

const ChooseSession = () => {
  let history = useNavigate()

  const [session, setSession] = useState([])

  useEffect(() => {
    // localStorage.removeItem('questionId')
    // localStorage.removeItem('sessionId')
    // localStorage.removeItem('gameState')
    getAllSession()
  }, [])

  const getAllSession = () => {
    var requestOptions: any = {
      method: 'GET',
      redirect: 'follow',
    }

    fetch('http://sosal.in/API/config/getAllSession.php', requestOptions)
      .then((response) => response.json())
      .then((result) => setSession(result))
      .catch((error) => console.log('error', error))
  }

  const chooseSession = (id: any, name: any) => {
    const gameState: any = localStorage.getItem('gameState')
    const sessionId: any = localStorage.getItem('sessionId')

    const gameData = JSON.parse(gameState)

    if (
      sessionId &&
      gameData &&
      gameData?.guesses?.length !== 0 &&
      id !== sessionId
    ) {
      swal('You are participating on another session')
    } else {
      localStorage.setItem('sessionId', id)
      localStorage.setItem('sessionName', name)
      history('/question')
    }
  }

  const logout = () => {
    swal({
      title: 'Are you sure?',
      text: 'You want to logout !',
      icon: 'warning',

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear()
        history('/')
      }
    })
  }
  const currentSession: any = localStorage.getItem('sessionId')
  const gameState: any = localStorage.getItem('gameState')
  const gameData = JSON.parse(gameState)

  return (
    <>
      <div
        className=""
        style={{
          background: 'grey',
          padding: 10,
          top: 0,
          position: 'absolute',
          width: '100%',
        }}
      >
        <h4 className=" font-medium leading-tight  text-base mt-0 text-lime-50 float-right">
          <div onClick={() => logout()} style={{ cursor: 'pointer' }}>
            <LogoutIcon />
          </div>
        </h4>
      </div>
      <Typography
        style={{
          marginLeft: '15px',
          marginTop: '10px',
          padding: 3,
          textAlign: 'center',
        }}
        component="h1"
        variant="h5"
        className="text-white"
      >
        Choose session
      </Typography>
      <Grid style={{ marginTop: 20 }} container>
        {session?.map((data: any, index: number) => {
          return (
            <Grid
              item
              lg={3}
              md={3}
              sm={12}
              xs={12}
              style={
                currentSession &&
                gameData &&
                gameData?.guesses?.length !== 0 &&
                currentSession !== data?.id
                  ? {
                      pointerEvents: 'none',
                    }
                  : { pointerEvents: 'auto' }
              }
            >
              <Card
                key={index}
                onClick={() => chooseSession(data?.id, data?.session_name)}
                className="flex flex-column items-center justify-center m-3 mx-5"
                style={
                  currentSession &&
                  gameData &&
                  gameData?.guesses?.length !== 0 &&
                  currentSession !== data?.id
                    ? {
                        cursor: 'pointer',
                        background: 'grey',
                      }
                    : { cursor: 'pointer' }
                }
              >
                <div
                  className="p-8 h-full"
                  style={{ justifyContent: 'center', padding: '20px' }}
                >
                  <b>{data?.session_name}</b>
                </div>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </>
  )
}
export default ChooseSession
