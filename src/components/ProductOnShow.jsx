import clsx from 'clsx'
import React, { useState, useEffect } from 'react'
import { ShoppingCartIcon } from '@heroicons/react/16/solid'

export default function ProductOnShow(props) {
  const [picture, setPicture] = useState('')
  const { images } = props

  useEffect(() => {
    if (images.length > 0) {
      setPicture(images[0])
    }
  }, [images])

  function minMouseOverHandler(event) {
    setPicture(event.target.src)
  }

  return (
    <div className='text-white text-lg grid md:grid-cols-2 gap-3'>
      <nav className='flex flex-col-reverse md:flex-row gap-4 w-[480px]'>
        <div className='flex md:flex-col gap-2 items-center md:items-start'>
          {images.map((item, index) => (
            <img
              key={`img-${index}`}
              src={item}
              alt='Miniature picture'
              className='w-20 h-16 hover:border-2 hover:border-indigo-700 hover:scale-125'
              onMouseOver={minMouseOverHandler}
            />
          ))}
        </div>
        <img src={picture} alt='Product picture' className='w-96 h-96' />
      </nav>
      <div className='flex flex-col gap-3 leading-5 w-auto md:w-full md:pl-3'>
        <div className='flex gap-5'>
          <h1 className='text-3xl font-bold'>{props.title}</h1>
          <ShoppingCartIcon className='h-8 w-14 border-2 border-indigo-600 text-indigo-700 px-4 py-0 rounded-2xl hover:scale-125' />
        </div>
        <p>{props.brand}</p>
        <p>Rating: {props.rating}</p>
        <p>Stock: {props.stock} pcs.</p>
        <div className='flex items-center gap-3'>
          <p className='text-2xl font-semibold'>MXN ${props.price}.00</p>
          <p className='border-4 border-indigo-700 text-indigo-600 text-sm font-bold h-6'>
            -{props.discount}%
          </p>
        </div>
        <div className='flex flex-col gap-3'>
          <p className='font-semibold'>Description:</p>
          <p>{props.description}</p>
        </div>
      </div>
    </div>
  )
}
