import React from 'react';
import './Footer.css';
import github from './dec/github.png';
import source from './dec/source.png';
import react_logo from './dec/react_logo.Default';
import clarifai from './dec/clarifai.svg';

const Footer = () => {
	return(
		<div className='footer mt1 hide'>
			<p className='white'>{'Made with ❤️ by sniperline047'}</p>
			<div className='flex-wrap'>
				<a href='https://github.com/sniperline047' ><img className='pr4' src={github} alt='gitIcon' height='20px' width='40px' /></a>
				<a href='https://reactjs.org/' ><img className='pr4' src={react_logo} alt='reactIcon' height='20px' width='20px' /></a>
				<a href='https://reactjs.org/' ><img className='pr4' src={source} alt='source' height='20px' width='20px' /></a>
				<a href='https://clarifai.com/' ><img className='pr4 bg-white-60 br3' src={clarifai} alt='clf' height='20px' width='50px' /></a>
			</div>
		</div>
	);
}

export default Footer;