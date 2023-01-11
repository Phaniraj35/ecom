import React from 'react'
import { Outlet } from 'react-router-dom';
import CategoryContainer from '../../components/CategoryContainer/CategoryContainer';

const Home = () => {
      return (
        <>
         <CategoryContainer />
         <Outlet />
        </>
      )
}

export default Home