import React, { useEffect } from 'react'
import Home from './pages/Home/Home.jsx'
import Header from './components/Header/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CheckOut from './components/CheckOut/CheckOut.jsx'
import './App.css'
import Login from './pages/Login/Login.jsx'
import { auth } from './firebase.js'
import { useStateValue } from './StateProvider/StateProvider.jsx'
import Payment from './pages/Payment/Payment.jsx'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Orders from './pages/Orders/Orders.jsx'
import ProductPage from './pages/ProductPage/ProductPage.jsx'
import SearchResults from './pages/SearchResults/SearchResults.jsx'
import Footer from './components/Footer/Footer.jsx'

const promise = loadStripe("pk_test_51MEHzBSJrk6wKKLarWhLtJIKISC9fIkD4ouuQkn3RaJeHJr2zpXyYqfJsnJMKeh9ZwYQxSG9KzDAinWRrHeHf5U600V0VeT3Ic")

const App = () => {
  const [{ updated }, dispatch] = useStateValue();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch({
          type: "SET_USER",
          user: user
        })
      } else {
        dispatch({
          type: "SET_USER",
          user: null
        })
      }
    })
    if (updated) {
      dispatch(
        {
          type: "UPDATED",
          updated: false,
        })
    }
  }, [updated])

  return (
    <BrowserRouter>
      <div className='app'>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/checkout' element={<CheckOut />} />
          <Route path='/login' element={<Login />} />
          <Route path='/orders' element={<Orders />} />
          <Route path='/product/:itemId' element={<ProductPage />} />
          <Route path='/search' element={<SearchResults />} />
          <Route path='/payment' element={<Elements stripe={promise}>
            <Payment />
          </Elements>} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App