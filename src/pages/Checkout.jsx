import React from 'react'
import { useParams } from 'react-router-dom'

const Checkout = () => {
    const { id } = useParams()

  return (
    <div>
        {id}
    </div>
  )
}

export default Checkout