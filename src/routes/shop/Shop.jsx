import React from 'react'
import { Route, Routes } from 'react-router-dom';
import CategoriesPreview from '../CategoriesPreview/CategoriesPreview';
import Category from '../category/Category';
import './Shop.scss'

const Shop = () => {

  return (
   <Routes>
    <Route index element={<CategoriesPreview />} />
    <Route path=':category' element={<Category />} />
   </Routes>
  )
}

export default Shop