import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const Loading = () => {
  return (
    <div style={{marginTop: "5rem"}}>
        <DotLottieReact
            src="/animations/loading.json"
            loop
            autoplay
        />
    </div>  
)}

export {Loading}