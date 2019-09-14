import React from 'react';

export default class SignIn extends React.Component {
	constructor(props) {
    	super(props);
	    this.state = {
	      	signInEmail: '',
	      	signInPassword: ''
	    }
  	}

  	onEmailChange = (event) => {
    	this.setState({signInEmail: event.target.value})
  	}

  	onPasswordChange = (event) => {
    	this.setState({signInPassword: event.target.value})
  	}

  	onSubmitSignIn = (event) => {
  		event.preventDefault();
    	fetch('http://localhost:5000/signin', {
	      	method: 'post',
	      	headers: {'Content-Type': 'application/json'},
	      	body: JSON.stringify({
	        	email: this.state.signInEmail,
	        	password: this.state.signInPassword
	      	})
    	})
      		.then(response => response.json())
      		.then(user => {
	        	if (user.id) {
	        	  this.props.loadUser(user)
	        	  this.props.onRouteChange('home');
	        	}
      		})
  	}

	render() {	
		return(
			<div>
				<div className='color-red'>
					<p className='f2'>{'Welcome to sign-in page'}</p>
					<p className='f4'>{'Enter credentials to continue or "Register"'}</p>
				</div>
				<main className="ba br3 shadow-5 pa4 mv4 w-100 w-50-m w-25-l mw6 center">
				    <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      	<legend className="f4 fw6 ph0 mh0">Sign In</legend>
					      	<div className="mt3">
								<label className="db fw6 lh-copy f6">Email</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="email" 
									name="email" 
									onChange={this.onEmailChange}
								/>
					      	</div>
					      	<div className="mv3">
					        	<label className="db fw6 lh-copy f6">Password</label>
					        	<input 
					        		className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
					        		type="password" 
					        		name="password" 
					        		onChange={this.onPasswordChange}
					        	/>
					      	</div>
					    </fieldset>
					    <div>
					    	<input 
						      	onClick={this.onSubmitSignIn}
						      	className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
						      	type="submit" 
						      	value="Sign in" 
			      			/>
					    </div>
				    	<div className="lh-copy mt3">
				      		<p onClick={() => this.props.onRouteChange('register')} href="#0" className="b pointer f6 link dim black db gloria">Register</p>
				    	</div>
				    </form>
				</main>
			</div>
		);
	}
}

