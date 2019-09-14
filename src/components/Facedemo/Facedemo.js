import React from 'react';

const Facedemo = ({imageURL,face_demo}) => {
	return(
    	<div className='mt3 flex center bg-black-05 br3 ma2 dib shadow-5 bw2 w-40 w-20-m w-10-s demoH'>
			<div className='w-50 br'>
				<h2 className='bb'>Image:</h2>
				<img alt='' src={imageURL} width='auto' height='180px' />
			</div>
			<div className='w-50'>
				<h2 className='bb'>Data:</h2>
		        <p>{face_demo.age}</p>
		        <p>{face_demo.gender}</p>
		        <p>{face_demo.ethnicity}</p>
	        </div>
		</div>
	);
}

export default Facedemo;