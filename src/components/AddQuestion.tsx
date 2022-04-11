import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Card, Grid } from '@mui/material'
import Typography from '@mui/material/Typography'

import swal from 'sweetalert'
import Loader from './Loader'
import NavBar from './AdminNavigation'

const VendorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  number: Yup.string().required('Contact Number is required'),
  session_id: Yup.string().required('session_id is required'),
})

const AddQuestion = () => {
  const [loader, setLoader] = useState(false)
  const [session, setSession] = useState([])

  useEffect(() => {
    getAllSession()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveData = (value: any) => {
    setLoader(true)
    var formdata = new FormData()
    formdata.append('question', value?.name)
    formdata.append('ans', value?.number)
    formdata.append('session_id', value?.session_id)

    var requestOptions: any = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    }

    fetch('http://sosal.in/API/config/addQuestion.php', requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result)
        swal('Question added')
      })
      .catch((error) => {
        console.log('error', error)
        swal('An error occurred, Please try again')
        setLoader(false)
      })
  }

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
  return (
    <>
      <NavBar />
      <Grid style={{ marginTop: 20 }} container>
        <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
        <Grid item lg={10} md={10} sm={12} xs={12}>
          <Card className="my-4">
            <Typography
              style={{ marginLeft: '15px', marginTop: '10px', padding: 3 }}
              component="h1"
              variant="h5"
            >
              Add Question
            </Typography>
            <div
              className="p-8 h-full"
              style={{ justifyContent: 'center', padding: '20px' }}
            >
              <Formik
                initialValues={{
                  name: '',
                  number: '',
                  session_id: '',
                }}
                validationSchema={VendorSchema}
                onSubmit={(values, { setSubmitting }) => {
                  saveData(values)
                  setSubmitting(false)
                }}
              >
                {({ touched, errors, isSubmitting }) => (
                  <Form>
                    <div className="form-group mb-2">
                      <label htmlFor="name">Choose Session</label>
                      <Field
                        as="select"
                        name="session_id"
                        className={`form-control text-muted ${
                          touched?.session_id && errors?.session_id
                            ? 'is-invalid'
                            : ''
                        }`}
                      >
                        <option key={0}>--Choose session--</option>
                        {session?.map((data: any, index: number) => (
                          <option value={data.id} key={index}>
                            {data.session_name}
                          </option>
                        ))}
                      </Field>

                      <ErrorMessage
                        component="div"
                        name="session_id"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="name">Question</label>
                      <Field
                        type="text"
                        name="name"
                        autoComplete="flase"
                        placeholder="Enter question"
                        className={`form-control text-muted ${
                          touched.name && errors.name ? 'is-invalid' : ''
                        }`}
                      />

                      <ErrorMessage
                        component="div"
                        name="name"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="form-group mt-2">
                      <label htmlFor="name">Answer</label>
                      <Field
                        type="text"
                        name="number"
                        autoComplete="flase"
                        placeholder="Enter answer"
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
                            value={'Add'}
                            style={{ width: '100%' }}
                          />
                        </div>
                      )}
                    </span>
                  </Form>
                )}
              </Formik>
            </div>
          </Card>
        </Grid>
        <Grid item lg={1} md={1} sm={12} xs={12}></Grid>
      </Grid>
    </>
  )
}
export default AddQuestion
