import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CategoryItem.styles.scss';

const CategoryItem = ({category}) => {
  const navigate = useNavigate();

  const onNavigateHandler = () => navigate(category.route)


  return (
    <div key={category.id} className="directory-container" onClick={onNavigateHandler} >
        <div className="background-image" style={{
          backgroundImage: `url(${category.imageUrl})`
        }}></div>
        <div className="category-body-container">
          <h2>{ category.title }</h2>
          <p>Shop Now</p>
        </div>
      </div>
  )
}

export default CategoryItem