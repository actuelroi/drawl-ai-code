import React from 'react'
import { Spinner } from './ui/spinner'

const AuthLoadingView = () => {
  return (
    <div className='flex items-center justify-center bg-background'>
      <Spinner className='size-6 text-ring' />
    </div>
  )
}

export default AuthLoadingView
