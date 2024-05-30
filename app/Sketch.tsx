
import { useState, useRef, useEffect } from "react"

export const Sketch = ({ sketch }) => {
  const parentRef = useRef()

  const [ isMounted, setIsMounted ] = useState< boolean >( false )

  useEffect( () => { setIsMounted( true ) }, [] )

  return ( 
    <div ref = { parentRef } > </div>
  )

}



