import React from 'react';
import Tilt from 'react-tilt';
import icon from './icon.png';
import './Logo.css';

const logo = () => {
	return(
		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-1" options={{ max : 55 ,prespective : 200 ,scale : 1.2 ,reverse : true }} style={{ height: 150, width: 150 }} >
 				<div className="Tilt-inner pa4">
 					<img alt='loco' src={icon}/>
				</div>
			</Tilt>
		</div>
	);
}

export default logo;