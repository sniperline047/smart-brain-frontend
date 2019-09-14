import React from 'react';

export default class Register extends React.Component {
    constructor(props) {
	    super(props);
	    this.state = {
	        email: '',
	        password: '',
	        name: ''
	    }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

  	onEmailChange = (event) => {
    	this.setState({email: event.target.value})
  	}

  	onPasswordChange = (event) => {
    	this.setState({password: event.target.value})
  	}

  	onSubmitSignIn = (e) => {
  		e.preventDefault();
	    fetch('http://localhost:5000/register', {
		    method: 'post',
	        headers: {'Content-Type': 'application/json'},
	      	body: JSON.stringify({
	        	email: this.state.email,
	        	password: this.state.password,
	        	name: this.state.name
	      	})
	    })
	    .then(response => response.json())
	    .then(user => {
	        if (user) {
	          this.props.loadUser(user)
	          this.props.onRouteChange('home');
	        }
	    })
	}

	render() {	
		return(
			<div>
				<main className="ba br3 shadow-5 pa4 mv4 w-100 w-50-m w-25-l mw6 center">
				    <form className="measure">
					    <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
					      	<legend className="f4 fw6 ph0 mh0">Register</legend>
					      	<div className="mt3">
								<label className="db fw6 lh-copy f6">Name</label>
								<input 
									className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
									type="Name" 
									name="name"  
									onChange={this.onNameChange} 
								/>
					      	</div>
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
					    		className="b ph3 pv2 input-reset ba b--black bg-black grow pointer f6 dib white" 
					    		type="submit" 
					    		value="Register!"
					    	/>
					    </div>
				    </form>
				</main>
			</div>
		);
	}
}
