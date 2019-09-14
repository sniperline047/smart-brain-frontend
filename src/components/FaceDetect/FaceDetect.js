import React from 'react';
import './FaceDetect.css';

const FaceDetect = ({imageURL,face_box}) => {
	return(
		<div className='center ma'>
			<div className='absolute mt2'>
				<img id='inputimage' alt='' src={imageURL} width='auto' height='250px'/>
				<div className='bounding-box' style={{top: face_box.topRow, right: face_box.rightCol, bottom: face_box.bottomRow, left: face_box.leftCol}} ></div>
			</div>
		</div>
	);
}

export default FaceDetect;