/* eslint-disable @typescript-eslint/no-floating-promises */
// ========= Home
// import all modules
import React, { type ChangeEvent, useEffect, useState, type FormEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { type AppDispatch, type RootState } from '../redux/store'
import { increment } from '../redux/reducers/counter'
import { addUser, getUsers } from '../redux/reducers/user'

const Home: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { count } = useSelector((state: RootState) => state.counterReducer)
  const { users, loading } = useSelector((state: RootState) => state.userReducer)
  const [state, setState] = useState({
    username: '',
    password: ''
  })

  const handleChange = (name: string, e: ChangeEvent<HTMLInputElement>): void => {
    setState(currentState => ({
      ...currentState,
      [name]: e.target.value
    }))
  }

  const handleCounter = (): void => {
    dispatch(increment({
      value: 1
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    dispatch(addUser({
      username: state.username,
      password: state.password
    }))
    dispatch(getUsers())
  }

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    dispatch(getUsers())
    console.log(users)
  }, [])

  return (
    <div>
      <h1>Home</h1>
      <button type='button' onClick={handleCounter}>
        Counter {count}
      </button>
      <br />
      <br />
      <br />

      <h2>Add Users</h2>
      <form onSubmit={handleSubmit}>
        <input type='text' value={state.username} onChange={(e) => { handleChange('username', e) }} placeholder='Username' />
        <br />
        <br />
        <input type='password' value={state.password} onChange={(e) => { handleChange('password', e) }} placeholder='Password'/>
        <br /> <br />
        <button type='submit'>Add</button>
      </form>

      <h2>Users</h2>
      {(loading === true) && <p>Loading...</p>}
      <ol>
        {users.map(user => (
          <li key={user.username}>
            <p>Username : {user.username}</p>
            <p>Password : {user.password}</p>
          </li>
        ))}
      </ol>
    </div>
  )
}

export default Home
