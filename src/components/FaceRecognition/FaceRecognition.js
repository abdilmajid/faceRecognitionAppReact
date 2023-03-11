import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  const styleBox = ()=>{
    return ({
      top: box.top, 
      right: box.right, 
      bottom: box.bottom, 
      left: box.left
    })
  }

  return (
    <div className='center ma'>
      <div className='absolute mt2'>
        <img id='inputimage' alt='' src={imageUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={styleBox()}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;