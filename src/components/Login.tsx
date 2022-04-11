import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Card, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'
import { useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import Loader from './Loader'

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

const VendorSchema = Yup.object().shape({
  number: Yup.string()
    .required('Contact number is required')
    .matches(phoneRegExp, 'Contact number is not valid')
    .min(10, 'to short')
    .max(10, 'to long'),
})

const Registration = () => {
  let history = useNavigate()
  const [loader, setLoader] = useState(false)

  useEffect(() => {
    localStorage.removeItem('gameState')
    localStorage.removeItem('gameStats')
    localStorage.removeItem('sessionId')
  }, [])

  const saveData = (value: any) => {
    setLoader(true)
    var formdata = new FormData()

    formdata.append('contact_number', value?.number)

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('http://sosal.in/API/config/Login.php', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)

        if (result) {
          localStorage.setItem('userId', result?.id)
          localStorage.setItem('userName', result?.name)

          setLoader(false)
          history('/choose-session')
        } else {
          swal('Please check the details')
          setLoader(false)
        }

        // history('/question')
      })
      .catch((error) => {
        console.log('error', error)
        swal('An error occurred, Please try again')
        setLoader(false)
      })
  }
  const reset = () => {
    swal({
      title: 'Are you sure?',
      text: 'You want to re-set the current seeion !',
      icon: 'warning',

      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        localStorage.clear()
        window.location.reload()
      }
    })
  }

  return (
    <>
      <Grid style={{ marginTop: 20 }} container>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Card className="m-4">
            <Typography
              style={{ marginLeft: '15px', marginTop: '10px', padding: 3 }}
              component="h1"
              variant="h5"
            >
              Login
            </Typography>
            <div
              className="p-8 h-full"
              style={{ justifyContent: 'center', padding: '20px' }}
            >
              <Formik
                initialValues={{
                  number: '',
                }}
                validationSchema={VendorSchema}
                onSubmit={(values, { setSubmitting }) => {
                  saveData(values)
                  setSubmitting(false)
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group mt-2">
                      <Field
                        type="number"
                        name="number"
                        autoComplete="flase"
                        placeholder="Contact number"
                        className={`form-control text-muted ${
                          touched.number && errors.number ? 'is-invalid' : ''
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="number"
                        className="invalid-feedback"
                      />
                    </div>

                    <span className="input-group-btn">
                      {loader ? (
                        <Loader />
                      ) : (
                        <div
                          className="flex justify-center items-center mt-4"
                          style={{
                            background: '#414141',
                            padding: 10,
                            color: 'white',
                          }}
                        >
                          <input
                            className="flex justify-center items-center  text-white font-bold py-2 px-4 rounded"
                            type="submit"
                            value={'Lets Begin'}
                            style={{ width: '100%' }}
                          />
                        </div>
                      )}
                    </span>
                  </Form>
                )}
              </Formik>
              <p
                onClick={() => history('/')}
                style={{ float: 'left' }}
                className="mt-2 p-2 text-xl"
              >
                Register
              </p>
              <p
                onClick={() => reset()}
                style={{ float: 'right' }}
                className="mt-2 p-2 text-xl"
              >
                Reset session
              </p>
            </div>
          </Card>
        </Grid>
        <Grid item lg={3} md={3} sm={12} xs={12}></Grid>
      </Grid>
    </>
  )
}
export default Registration
