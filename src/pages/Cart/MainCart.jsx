import React from 'react'
import { useLocation } from 'react-router-dom'
import Cart from './Cart';

function MainCart() {
    const {state} = useLocation();

  return (
    <>
    <Cart userId={state.userId} />
    </>
  )
}

export default MainCart