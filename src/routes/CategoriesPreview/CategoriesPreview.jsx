import React, { useContext } from 'react'
import CategoryPreview from '../../components/CategoryPreview/CategoryPreview';
import { CategoriesContext } from '../../context/CategoriesContext'

const CategoriesPreview = () => {

  const { categoriesMap } = useContext(CategoriesContext);

  return (
    <>
      {
        Object.keys(categoriesMap).map(title => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
        ))
      }
    </>
  )
}

export default CategoriesPreview