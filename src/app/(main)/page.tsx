import * as React from 'react'
import Section from '@/components/sections'

// million-ignore
const Home: React.FC = () => {
  return (
    <>
      <Section.Intro />
      <Section.Timeline />
      <Section.About />
      {/* <Section.Work /> */}
      <Section.Contact />
    </>
  )
}

export default Home
