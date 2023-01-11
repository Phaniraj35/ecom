import './CategoryPreview.scss'

import React from 'react'
import ProductCard from '../ProductCard/ProductCard'
import { Link } from 'react-router-dom'

const CategoryPreview = ({ title, products }) => {
  return (
    <div className='category-preview-container'>
        <h2>
            <Link to={title} className='title'>{title.toUpperCase()}</Link>
        </h2>


        <div className="preview">
           {
            products.filter((_, idx) => idx < 4)
            .map(product => (<ProductCard key={product.id} product={product} />))
           } 
        </div>

    </div>
  )
}

export default CategoryPreview