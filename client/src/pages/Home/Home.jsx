import React from 'react'
import Layout from './layout/Layout'
import { useSelector } from 'react-redux'

const Home = () => {
  const user = useSelector(state => state.user);
  return (
    <div>
        <Layout />
    </div>
  )
}

export default Home