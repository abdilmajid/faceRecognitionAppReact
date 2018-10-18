import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imgUrl, box }) => {
  return (
    <div className='center ma'>
      <div className='mt2 relative'>
        <img id='inputImg' alt='' src={imgUrl} width='500px' heigh='auto'/>
        <div className='bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left: box.leftCol}}></div>
      </div>
    </div>
  );
}

export default FaceRecognition;