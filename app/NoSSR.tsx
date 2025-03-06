
import dynamic from 'next/dynamic'
import React from 'react' 

const NoSSRWrapper = props => ( 
    <React.Fragment>{props.children}</React.Fragment> 
) 

// @ts-ignore
export default dynamic(() => Promise.resolve(NoSSRWrapper), { 
    ssr: false 
})