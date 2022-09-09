import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import CardHome from '../home/CardHome'
import CategoryFilter from '../home/CategoryFilter'
import InputSearch from '../home/InputSearch'
import PriceFilter from '../home/PriceFilter'
import './styles/home.css'

const Home = () => {

  const [inputSearch, setInputSearch] = useState('')
  const [filterProducts, setFilterProducts] = useState()
  const [objFilterPrice, setObjFilterPrice] = useState({})

  const products = useSelector(state => state.products)
  
  useEffect(() => {
    if(inputSearch.length !== 0) {
      const filter = products?.filter(e => e.title.toLowerCase().includes(inputSearch.toLocaleLowerCase()) )
      setFilterProducts(filter)
    } else {
      setFilterProducts('')
    }
  },[inputSearch])

  //Filtro por price
  useEffect(() => {
    const filter = products?.filter(e => {
      const price = Number(e.price)
      const min = objFilterPrice.from
      const max = objFilterPrice.to 
      if(min && max) {
        return min <= price && price <= max
      } else if (min && !max) {
        return min <= price
      } else if (!min && max) {
        return price <= max
      } else {
        return true
      }
    })
    setFilterProducts(filter)
  },[objFilterPrice.to, objFilterPrice.from])

  return (
    <main className='home'>
      <InputSearch setInputSearch={setInputSearch}/>
      <PriceFilter setObjFilterPrice={setObjFilterPrice}/>
      <CategoryFilter />
      <div className='home__container-card'>
        {
          filterProducts ? 
          filterProducts?.map(product => (
            <CardHome 
              key={product.id}
              product={product}
            />
          ))
          :
          products?.map(product => (
            <CardHome 
              key={product.id}
              product={product}
            />
          ))
        }
      </div>
    </main>
  )
}

export default Home