import React from 'react'
import Navbar from './layouts/Navbar'
import Hero from './components/Hero'
import WhatWeDo from './components/WhatWeDo'
import Featured from './components/Featured'
import Footer from './layouts/Footer'
import Preloader from './components/PreLoader'
// import Contact from './components/Contact'
const App = () => {
  return (
    <div>
      <Preloader/>
      <Navbar/>
      <Hero/>
      <WhatWeDo/>
      <Featured/>
      {/* <Contact/> */}
      <Footer/>
    </div>
  )
}

export default App