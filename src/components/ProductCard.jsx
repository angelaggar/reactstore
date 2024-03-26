import { useEffect, useState } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'

export default function ProductCard(props) {
  const [product, setProduct] = useState({})
  const [picture, setPicture] = useState('')
  const [onShow, setOnShow] = useState(false)

  function MiniatureClickHandler(event) {
    setPicture(event.target.src)
  }

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${props.id}`)
      .then((res) => res.json())
      .then((json) => {
        setProduct(json)
        setPicture(json.images[0])
      })
      .catch((error) => {
        console.log('Error fetching products list', error)
      })
  }, [props.id])
  return (
    <article className='flex flex-col gap-3 text-white'>
      <img src={picture} alt='Product image' className='w-52 h-52 self-center' />
      <h3 className='text-xl font-bold'>{product.title}</h3>
      <div className='flex justify-between items-center'>
        <div className='flex justify-between gap-1'>
          <h4 className='text-xl'>MXN${product.price}.00</h4>
          <p className='border-4 border-indigo-700 text-indigo-600 text-sm font-bold h-6 px-1'>
          -{Math.floor(props.discount)}%          </p>
        </div>
        <ShoppingCartIcon className='h-7 w-12 border-2 border-indigo-600 text-indigo-700 px-3 py-1 rounded-2xl hover:scale-125' />
      </div>

      <p>Stock: {product.stock}</p>
      <div className='flex gap-2'>
        {product.images?.map((pic, index) => {
          return (
            <img
              onClick={MiniatureClickHandler}
              key={index}
              src={pic}
              alt='n/a'
              className='h-6 w-6 rounded-full hover:scale-125 border-2 border-indigo-700'
            />
          )
        })}
      </div>
    </article>
  )
}
