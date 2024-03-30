import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import ProductOnShow from '../components/ProductOnShow'
import clsx from 'clsx'

export default function Products() {
  const [products, setProducts] = useState([])
  const [pToRender, setPToRender] = useState([])
  const [product, setProduct] = useState(null)
  const [categorySet, setCategorySet] = useState(new Set([]))

  function categoryClickHandler(cat) {
    if (cat === 'All') {
      setPToRender(products)
    } else {
      const filtered = products.filter((item) => item.category === cat)
      setPToRender(filtered)
    }
    setProduct(null)
  }

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=200&skip=30')
      .then((res) => res.json())
      .then((json) => {
        setProducts(json.products)
        setPToRender(json.products)
        const categories = new Set(json.products.map((p) => p.category))
        setCategorySet(new Set(['All', ...categories]))
      })
      .catch((error) => {
        console.log('Error fetching products list', error)
      })
  }, [])

  return (
    <main className='bg-black min-w-screen'>
      <div className='flex flex-col md:flex-row pt-10 gap-1 px-6 md:px-0'>
        <div className='md:w-1/5 md:min-h-screen md:px-0 flex md:flex-col bg-neutral-200/10 text-white'>
          <p className='bg-[rgb(8,126,164)] md:w-full h-full md:h-9 p-2 text-center items-center md:items-start'>
            CATEGORIES
          </p>
          {[...categorySet].map((cat, index) => (
            <p
              key={`cat-${index}`}
              className='w-full p-2 text-center hover:bg-neutral-200/10'
              onClick={() => categoryClickHandler(cat)}
            >
              {cat}
            </p>
          ))}
        </div>
        <div className='flex flex-col w-full md:w-4/5 md:px-3 gap-3 '>
          {product && (
            <div
              className={clsx(
                'bg-neutral-200/10 p-4 flex gap-3 justify-center md:justify-start border-4 border-[rgb(8,126,164)]',
                { hidden: !product }
              )}
            >
              <ProductOnShow
                id={product.id}
                title={product.title}
                images={product.images}
                price={product.price}
                rating={product.rating}
                stock={product.stock}
                discount={product.discountPercentage}
                description={product.description}
                brand={product.brand}
                thumbnails={product.thumbnails}
              />
            </div>
          )}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 '>
            {pToRender.map((item, index) => (
              <div
                key={`Product-${index}`}
                className='bg-neutral-200/10 box-border w-full h-auto flex flex-col p-3 gap-3 border-4 border-[rgb(8,126,164)]'
              >
                <ProductCard
                  id={item.id}
                  title={item.title}
                  images={item.images}
                  price={item.price}
                  stock={item.stock}
                  discount={item.discountPercentage}
                />
                <button
                  onClick={() => {
                    setProduct(item)
                    window.scrollTo({ top: 0, behavior: 'smooth' })
                  }}
                  className='w-16 border-2 border-[rgb(8,126,164)] box-content text-xs rounded-2xl text-center text-white p-1 bg-[rgb(8,126,164)] hover:bg-transparent mt-auto self-end'
                >
                  Show more
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
