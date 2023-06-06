import React from 'react'
import { useMedia } from '@/utils/hooks'

const Index = ({ children }) => {

  const isPC = useMedia()
  return (
    <>
    {isPC!==null?children:null}
    </>
  )
}

export default Index