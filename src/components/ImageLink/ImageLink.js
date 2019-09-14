import React from 'react';
import './ImageLink.css';

const ifMode = (mode) => {
	if(mode === 'Demographics')
		return 'Face';
	else 
		return 'Demographics';
}

const ImageLink = ({onInputChange,mode,onModeChange,onButtonSubmit,clearInput}) => {
	return(
		<div>
			<div className='block mt2'>
				<p className='b f4'>Current Mode (switch) :</p>
				<p onClick={() => onModeChange(ifMode(mode))} className='w-20 center pa1 ba f4 br2 grow bw1 pointer bg-blue white link'>
					{`${mode} Detection`}
				</p>
			</div>
			<p className='f4 gloria'>
				{ `This is a smart website which detects ${mode} from images, Give it a try!` }
			</p>
			<div className='center'>
				<form onReset={clearInput} onSubmit={onButtonSubmit} >		
					<div className='pa3 br3 shadow-6 form center'>
						<input 
							type = 'text' 
							className='f3 pa2 w-70 center' 
							placeholder = 'copy link here...'
							onChange = {onInputChange}
						/>
						<input 
							type='submit'
							value='Detect'
							className='w-15 grow ph3 pv2 dib white bred linK br3 btn' 
						/>
						<input
							type='reset'
							value='Clear'
							className='w-15 grow ph3 pv2 dib blue bred link br3	btn'
						/>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ImageLink;