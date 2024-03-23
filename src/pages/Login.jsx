import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { clsx } from 'clsx'


export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleSubmit(event) {
    event.preventDefault()
    fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: username, password: password })
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json)
        //sessionStorage
        //localStorge
        if (json.token) {
          localStorage.setItem('token', json.token)
          // localStorage.removeItem('token')
          setUsername('')
          setPassword('')
          // window.location.assign('/')
          return navigate('/')
        }
        // se ejecuta si no hay token
        setError('Access not allowed')

      })
      .catch((error) => {
        console.log('User or password invalid', error)
      })
  }

  return (
    <main className='bg-black min-h-screen flex justify-center p-6'>
      <form
        className='border bg-gray-200 p-6 min-w-md h-64'
        onSubmit={handleSubmit}
      >
        <h1 className=''>Login Form</h1>
        <input
          type='text'
          name='username'
          id='username'
          value={username}
          onChange={(event) => {
            setUsername(event.target.value)
          }}
          placeholder='Username'
          className='block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2'
          required
        />
        <input
          type='password'
          name='password'
          id='password'
          value={password}
          onChange={(event) => {
            setPassword(event.target.value)
          }}
          placeholder='Password'
          className='mt-3 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm p-2'
          required
          // pattern=''
        />
        {/* {error && <p className='text-red-500'>{error}</p>} */}
        <p className={clsx({ 'hidden': !error, 'text-red-500': error })}>{error}</p>

        <button
          type='submit'
          // onClick={handleSubmit}
          className='mt-3 w-full  py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        >
          Login
        </button>
      </form>
    </main>
  )
}