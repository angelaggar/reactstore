import { useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import { useForm } from 'react-hook-form';

export default function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  async function onSubmit(data) {
    console.table(data);
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
      }),
    });
    const json = await response.json();

    if (json.token) {
      localStorage.setItem('token', json.token);
      return navigate('/');
    }

    setError('root', { message: 'Invalid data' });
  }

  return (
    <main className='bg-black h-screen flex justify-center pt-40'>
      <form
        className='border bg-gray-200 p-8 sm:w-full md:w-1/2 lg:w-1/4 h-96 grid grid-col gap-4'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='text-[rgb(8,126,164)] font-extrabold text-3xl text-center p-4'>Welcome!</h1>
        <input
          type='text'
          name='username'
          placeholder='Username'
          className={clsx(
            'block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2',
            {
              'border-2 border-red-500': errors.username,
            }
          )}
          required
          {...register('username', {
            minLength: {
              value: 3,
              message: 'Escribe al menos 3 caracteres',
            },
            maxLength: {
              value: 10,
              message: 'Maximo 10 caracteres',
            },
          })}
        />
        {errors.username && (
          <p className='text-red-500'>{errors.username.message}</p>
        )}

        <input
          type='password'
          name='password'
          placeholder='Password'
          className='mt-3 block w-full border-gray-300 rounded-md shadow-sm sm:text-sm p-2'
          required
          {...register('password')}
        />
        {errors.root && <p className='text-red-500'>{errors.root.message}</p>}

        <button
          type='submit'
          className='mt-3 w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-[rgb(8,126,164)]'
        >
          Login
        </button>
      </form>
    </main>
  );
}
