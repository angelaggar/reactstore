import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { PencilSquareIcon, CheckCircleIcon } from '@heroicons/react/16/solid'

export default function Todos() {
  const [todos, setTodos] = useState([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  function onSubmit(data) {
    const { todo } = data
    setTodos([todo, ...todos])
    reset()
  }

  function removeItem(index) {
    return () => {
      const filtered = todos.filter((item, innerIndex) => index !== innerIndex)
      setTodos(filtered)
    }
  }

  return (
    <main className='min-h-screen bg-neutral-900 text-white py-10 px-5 flex flex-col gap-10'>
      <form
        className='w-full flex flex-col justify-center items-center gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-3xl text-indigo-600 font-extrabold tracking-widest p-3'>
          My task list
        </h1>
        <div className='flex flex-row w-full sm:w-1/5 gap-3'>
          <input
            type='text'
            name='todo'
            placeholder='Type your next task...'
            className='bg-white text-black p-2 w-full'
            required
            {...register('todo', {
              validate: {
                noEmptySpace: (value) =>
                  value.trim().length > 0 ||
                  'Esto esta mas vacio que tu vida...',
                noComma: (value) =>
                  !value.includes(',') || 'Epale, una a la vez'
              },
              minLength: {
                value: 3,
                message: 'Alto alli vaquero! No es suficiente texto.'
              }
            })}
          />

          <button
            type='submit'
            className='bg-sky-400 text-black p-2 rounded-md font-bold hover:bg-indigo-600'
          >
            <PencilSquareIcon className='h-6 w-6 text-white' />
          </button>
        </div>
        {errors.todo && <p className='text-red-500'>{errors.todo.message}</p>}
        <p className='text-white text-center md:text-lg'>
          {' '}
          Intenta validar escribiendo en el texto una coma, <br/>
          o bien una palabra de dos letras y luego borrando el contenido.{' '}
        </p>
       
      </form>
      <div className='w-full flex flex-col gap-2'>
        {todos.map((todo, index) => {
          return (
            <div
              key={`item-${index}`}
              className='w-full flex justify-center items-center gap-2'
            >
              <p className='max-w-xl w-full bg-slate-300/50 p-2  hover:bg-violet-300'>
                {todo}
              </p>
              <button
                onClick={removeItem(index)}
                className='bg-green-400 text-black p-2 rounded-md font-bold'
              >
                <CheckCircleIcon className='h-6 w-6 text-white' />
              </button>
            </div>
          )
        })}
      </div>
    </main>
  )
}
