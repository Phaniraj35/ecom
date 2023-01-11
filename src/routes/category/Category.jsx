import './Category.scss';

import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { CategoriesContext } from '../../context/CategoriesContext';
import ProductCard from '../../components/ProductCard/ProductCard';

const Category = () => {

  const { category } = useParams()
  const { categoriesMap } = useContext(CategoriesContext);

  const [ products, setProducts ] = useState(CategoriesContext[category]);

  useEffect(() => {
    setProducts(categoriesMap[category]); 
  }, [ category, categoriesMap ])

  return (
    <>
        <h2 id="title">{category.toUpperCase()}</h2>
        <div className='category-container'>
            { products && products.map(product => (<ProductCard  key={product.id} product={product} />) ) }
        </div>
    </>
  )
}

export default Category