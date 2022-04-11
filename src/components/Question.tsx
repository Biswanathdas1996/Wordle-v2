import { useState, useEffect } from 'react'
import { Grid } from '../components/grid/Grid'
import { Keyboard } from '../components/keyboard/Keyboard'
import { MAX_CHALLENGES } from '../constants/settings'
import {
  isWinningWord,
  unicodeLength,
  localeAwareUpperCase,
} from '../lib/words'
import { addStatsForCompletedGame, loadStats } from '../lib/stats'
import {
  loadGameStateFromLocalStorage,
  saveGameStateToLocalStorage,
} from '../lib/localStorage'
import { default as GraphemeSplitter } from 'grapheme-splitter'
import { Grid as Gird2 } from '@mui/material'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { differenceInSeconds } from 'date-fns'
import Waiting from './Waiting'
import LogoutIcon from '@mui/icons-material/Logout'

function Question() {
  const [currentGuess, setCurrentGuess] = useState('')
  const [isGameWon, setIsGameWon] = useState(false)
  const [currentRowClass, setCurrentRowClass] = useState('')
  const [isGameLost, setIsGameLost] = useState(false)
  const [loader, setLoader] = useState(false)
  const [noQuestion, setNoQuestion] = useState(false)
  const [isSuccessAttemptCompleted, setIsSuccessAttemptCompleted] =
    useState(false)
  const [question, setQuestion] = useState(null)

  const [startTime, setStartTime] = useState<any>('')
  const [answer, setAnswer] = useState('')
  const [isRevealing, setIsRevealing] = useState(false)
  let history = useNavigate()
  const [guesses, setGuesses] = useState<string[]>(() => {
    const loaded = loadGameStateFromLocalStorage()
    if (loaded) {
      return loaded?.guesses
    } else {
      return []
    }
  })

  const userId = localStorage.getItem('userId')
  const sessionName = localStorage.getItem('sessionName')
  if (!userId) {
    history('/')
  }
  const [stats, setStats] = useState(() => loadStats())

  useEffect(
    () => saveGameStateToLocalStorage({ guesses, answer }),
    [guesses, answer]
  )

  const onChar = (value: string) => {
    if (
      unicodeLength(`${currentGuess}${value}`) <= answer.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setCurrentGuess(`${currentGuess}${value}`)
    } else {
    }
  }

  const onDelete = () => {
    setCurrentGuess(
      new GraphemeSplitter().splitGraphemes(currentGuess).slice(0, -1).join('')
    )
  }

  const getCurrentActiveQuestion = async () => {
    setLoader(true)

    var formdata = new FormData()
    const sessionId: any = localStorage.getItem('sessionId')
    formdata.append('session_id', sessionId)

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    const result = fetch(
      'http://sosal.in/API/config/GetQuestion.php',
      requestOptions
    )
      .then((response) => response.json())
      .then(async (result) => {
        // console.log('--------->', result)
        if (result && result?.length === 0) {
          setNoQuestion(true)
          // swal('No Question is available')
          // history('/choose-session')
          // return
        } else {
          setNoQuestion(false)
        }

        const ifSubmited: any = await checkIfSuccessAttempt(result[0]?.id)

        const currentQuestionId = localStorage.getItem('questionId')
        if (currentQuestionId && currentQuestionId !== result[0]?.id) {
          localStorage.removeItem('gameState')
          localStorage.removeItem('gameStats')
          localStorage.removeItem('questionId')
          getCurrentActiveQuestion()
          return
        } else {
          localStorage.setItem('questionId', result[0]?.id)
        }

        if (ifSubmited !== 1) {
          setQuestion(result[0]?.question)

          setStartTime(result[0]?.start_time)
          const answer = result[0]?.answer

          setAnswer(localeAwareUpperCase(answer))
        } else {
          setIsSuccessAttemptCompleted(true)
        }
        setLoader(false)
        return result[0]?.id
      })
      .catch((error) => {
        //console.log('error', error)
        setLoader(false)
      })

    return result
  }

  useEffect(() => {
    getCurrentActiveQuestion()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function checkIfSuccessAttempt(questionId: any) {
    const userId: any = localStorage.getItem('userId')

    var formdata = new FormData()
    formdata.append('user_id', userId)
    formdata.append('question_id', questionId)

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    const gatData = fetch(
      'http://sosal.in/API/config/checkSuccessAttempt.php',
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log(data)

        // setGuesses(JSON.parse(data?.data))
        // setAnswer(data?.answer)

        return data?.status
      })
      .catch((error) => 0)
    return gatData
  }

  const insertEnrty = (guesses: any): any => {
    const userId: any = localStorage.getItem('userId')
    const questionId: any = localStorage.getItem('questionId')
    const sessionId: any = localStorage.getItem('sessionId')

    var formdata = new FormData()
    formdata.append('user_id', userId)
    formdata.append('question_id', questionId)
    formdata.append('session_id', sessionId)
    formdata.append('attempt', JSON.stringify(guesses))

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('http://sosal.in/API/config/InsertResponse.php', requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        console.log(result.status)
        if (result.status === 401) {
          localStorage.removeItem('gameState')
          localStorage.removeItem('gameStats')
          localStorage.removeItem('questionId')
          localStorage.removeItem('sessionId')
          localStorage.removeItem('sessionName')
          swal({
            title: 'Session ended!',
            text: 'Your current session has expired',
            icon: 'warning',
            dangerMode: true,
          }).then((willDelete) => {
            history('/choose-session')
          })
        }
      })
      .catch((error) => console.log('error', error))
  }

  function correctAttempt(guesses: any, attempt: any) {
    const userId: any = localStorage.getItem('userId')
    const questionId: any = localStorage.getItem('questionId')
    const sessionId: any = localStorage.getItem('sessionId')

    const date = new Date()
    var formdata = new FormData()

    const startDate = new Date(startTime * 1000)
    const diff = differenceInSeconds(date.getTime(), Number(startDate))

    formdata.append('session_id', sessionId)
    formdata.append('user_id', userId)
    formdata.append('question_id', questionId)
    formdata.append('correct_attempt', attempt?.toString())
    formdata.append('time', diff.toString())
    formdata.append('attempt', JSON.stringify(guesses))

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('http://sosal.in/API/config/correctAttempt.php', requestOptions)
      .then((response) => response.json())
      .then((result: any) => {
        //console.log(result)
        if (result?.status === 401) {
          localStorage.removeItem('gameState')
          localStorage.removeItem('gameStats')
          localStorage.removeItem('questionId')
          localStorage.removeItem('session_id')
          swal({
            title: 'Session ended!',
            text: 'Your current session has expired',
            icon: 'warning',
            dangerMode: true,
          }).then((willDelete) => {
            history('/choose-session')
          })
        } else {
          if (guesses?.length < MAX_CHALLENGES) {
            setTimeout(() => {
              setIsSuccessAttemptCompleted(true)
            }, 2000)
          } else {
            setIsSuccessAttemptCompleted(true)
          }
        }
      })
      .catch((error) => console.log('error', error))
  }

  let winningWord = false
  if (answer !== '') {
    winningWord = isWinningWord(currentGuess, answer)
  }

  const onEnter = () => {
    if (isGameWon || isGameLost) {
      return
    }

    if (!(unicodeLength(currentGuess) === answer.length)) {
      setCurrentRowClass('jiggle')
      return false
    }

    // enforce hard mode - all guesses must contain all previously revealed letters

    setIsRevealing(true)

    if (
      unicodeLength(currentGuess) === answer.length &&
      guesses.length < MAX_CHALLENGES &&
      !isGameWon
    ) {
      setGuesses([...guesses, currentGuess])

      if (winningWord) {
        correctAttempt(
          [...guesses, currentGuess],
          [...guesses, currentGuess].length
        )
      } else {
        insertEnrty([...guesses, currentGuess])
      }

      setCurrentGuess('')

      if (winningWord) {
        setStats(addStatsForCompletedGame(stats, guesses.length))
        return setIsGameWon(true)
      }

      if (guesses.length === MAX_CHALLENGES - 1) {
        setStats(addStatsForCompletedGame(stats, guesses.length + 1))
        setIsGameLost(true)
      }
    }
  }

  const nextQuestion = async () => {
    const currentQuestionId: any = await localStorage.getItem('questionId')
    const getActiveQId: any = await getCurrentActiveQuestion()

    if (currentQuestionId === getActiveQId) {
      swal('Please wait for the next question')
    }
  }

  const nextSession = () => {
    localStorage.removeItem('gameState')
    localStorage.removeItem('gameStats')
    localStorage.removeItem('questionId')
    localStorage.removeItem('session_id')
    history('/choose-session')
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
  return (
    <Gird2 style={{ marginTop: 20 }} container>
      <Gird2
        item
        lg={12}
        md={12}
        sm={12}
        xs={12}
        className="mb-3 flex flex-column"
      >
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
          <h4 className=" font-medium leading-tight  text-base mt-0 text-lime-50 float-left">
            <div>
              {' '}
              {/* <small>Welcome</small> {user} to */}
              <b> {sessionName}</b>
            </div>
          </h4>
          <h4 className=" font-medium leading-tight  text-base mt-0 text-lime-50 float-right">
            <div onClick={() => logout()} style={{ cursor: 'pointer' }}>
              <LogoutIcon />
            </div>
          </h4>
        </div>
        <button
          onClick={() => history('/choose-session')}
          className="flex items-center justify-left bg-dark text-slate-50 font-bold p-2 rounded mt-3"
        >
          Back
        </button>
      </Gird2>

      <Gird2 item lg={3} md={3} sm={12} xs={12}></Gird2>
      {answer !== '' && !isSuccessAttemptCompleted && (
        <Gird2 item lg={6} md={6} sm={12} xs={12}>
          <div className="flex justify-center items-center">
            <h5 className="font-medium leading-tight text-lg mt-0 text-white py-3 px-1">
              {question}
            </h5>
          </div>
          {guesses?.length < MAX_CHALLENGES && !isSuccessAttemptCompleted ? (
            <>
              <Grid
                guesses={guesses}
                currentGuess={currentGuess}
                isRevealing={isRevealing}
                currentRowClassName={currentRowClass}
                answer={answer}
                length={answer.length}
              />

              <div style={{ marginTop: 20 }}>
                <Keyboard
                  onChar={onChar}
                  onDelete={onDelete}
                  onEnter={onEnter}
                  guesses={guesses}
                  isRevealing={isRevealing}
                  answer={answer}
                  length={answer.length}
                />
              </div>
              <div
                style={{ marginTop: 20 }}
                className="flex items-center justify-center mx-0.5 text-xs font-bold cursor-pointer "
              ></div>
            </>
          ) : isSuccessAttemptCompleted ? (
            <b>Success</b>
          ) : !noQuestion ? (
            <Gird2 item lg={12} md={12} sm={12} xs={12}>
              <Waiting
                heading="Ran out of options!"
                body="Please wait for the next question."
                nextQuestion={nextQuestion}
                loader={loader}
              />
            </Gird2>
          ) : (
            ''
          )}
        </Gird2>
      )}
      {noQuestion && (
        <Gird2 item lg={12} md={12} sm={12} xs={12}>
          <Waiting
            heading="No active question"
            body={`Please wait for the next question.`}
            nextQuestion={nextQuestion}
            loader={loader}
          />
        </Gird2>
      )}
      {!noQuestion && isSuccessAttemptCompleted && (
        <Gird2 item lg={12} md={12} sm={12} xs={12}>
          <Waiting
            heading="Great Job!"
            body={
              guesses?.length !== 0
                ? `You got it right in ${guesses?.length} attempt(s)`
                : `You got it right`
            }
            nextQuestion={nextSession}
            loader={loader}
            buttonText="Next Session"
          />
        </Gird2>
      )}

      <Gird2 item lg={3} md={3} sm={12} xs={12} style={{ padding: 10 }}></Gird2>
    </Gird2>
  )
}

export default Question
