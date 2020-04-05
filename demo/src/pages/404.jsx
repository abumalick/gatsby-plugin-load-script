import React, {useEffect} from 'react'
import {navigate} from 'gatsby'

export default function Page404() {
  useEffect(() => {
    navigate('/')
  })
  return <h1>Bad page, redirecting</h1>
}
