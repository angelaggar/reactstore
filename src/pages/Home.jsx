import { Link, Outlet } from 'react-router-dom'

export default function Home() {
  return (
    <main className='bg-[url("https://annafusoni.mx/wp-content/uploads/2023/12/PACTO-2.jpg")] bg-cover  min-h-screen'>
      <header className='flex justify-center items-center h-36 bg-[rgb(8,126,164)] text-white text-7xl gluten gap-5'>
        <img
          src='https://logos-world.net/wp-content/uploads/2023/08/React-Symbol.png'
          alt=''
          className='h-36'
        />
        <h1>Store</h1>
      </header>
      <nav className='bg-sky-300 p-3 text-xl font-semibold flex gap-20 justify-center'>
        <Link to={'/'}>Home</Link>
        <Link to={'/products'}>Products</Link>
        {/* <Link to={'/dos'}>dos</Link> */}
        <Link to={'/login'}>Login</Link>
      </nav>
      <section>
        <Outlet />
      </section>

      <div>
        <img
          src=''
          alt='Slide 1'
          className='w-full'
        />
      </div>
    </main>
  )
}
