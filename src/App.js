import React, { Component } from 'react';
import Navigate from './components/Navigate/Navigate.js';
import Logo from './components/Logo/Logo.js';
import ImageLink from './components/ImageLink/ImageLink.js';
import Stats from './components/Stats/Stats.js';
import Footer from './components/Footer/Footer.js';
import Particles from 'react-particles-js';
import Facedemo from './components/Facedemo/Facedemo.js';
import FaceDetect from './components/FaceDetect/FaceDetect.js';
import SignIn from './components/SignIn/SignIn.js';
import Register from './components/Register/Register.js';
import Clarifai from 'clarifai'; 
import './App.css';

const app = new Clarifai.App({
 apiKey: '7109bda60779429fb587a65ef636a55d'
});

const particlesOption = {
  particles : {
    number : {
      value : 100,
      density : {
        enable : true,
        value_area : 800
      }
    },
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: ' ',
      imageURL: '',
      route: 'signin',
      isSignedIn: false,
      mode: 'Demographics',
      face_box: {},
      face_demo: {
        age: '',
        gender: '',
        ethnicity: ''
      },
      user: {
        id: '',
        name: '',
        email: '',
        entries: 0,
      },
    }
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
    }})
  }

  clearInput = () => {
    this.setState({ input: '' });
    this.setState({ imageURL: '' });
    this.setState({ face_box: {} });
  }

  onRouteChange = (check) => {
    this.setState({ route: check });
  }

  onModeChange = (change) => {
    this.setState({ mode: change });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value});
  }

  getDemographics = (data) => {
    const Data = data.outputs[0].data.regions[0].data.face; 
    this.setState({ face_demo: {
      age: Data.age_appearance.concepts[0].name,
      gender: Data.gender_appearance.concepts[0].name,
      ethnicity: Data.multicultural_appearance.concepts[0].name
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
      leftCol: clarifaiFace.left_col * width,
    }
  }

  displayFaceBox = (box) => {
    this.setState({face_box: box});
  }

  onButtonSubmit = (event) => {
    event.preventDefault();
    this.setState({ imageURL: this.state.input});
    if( this.state.mode === 'Demographics' ) {
      app.models.predict(Clarifai.DEMOGRAPHICS_MODEL,this.state.input)
      .then(response => {
        if(response) {
          fetch('http://localhost:5000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id,
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })
            .catch(err => console.log(err)); 
        }
        this.getDemographics(response)
      })
      .catch(err => console.log(err));    
    } else {
      app.models.predict(Clarifai.FACE_DETECT_MODEL,this.state.input)
      .then(response => {
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err)); 
    }
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route});
  }

  render() {
    return (
      <div className="App">
        <div className="h-90">
          <Particles className='particles' params={particlesOption} />
          <Navigate isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange} />
          { this.state.route === 'home'
            ? <div>
                <Logo />
                <Stats 
                  name={this.state.user.name}
                  entries={this.state.user.entries}
                />
                <ImageLink 
                  onInputChange={this.onInputChange}
                  mode={this.state.mode} 
                  onModeChange={this.onModeChange}
                  onButtonSubmit={this.onButtonSubmit}
                  clearInput={this.clearInput}
                />
                {
                  this.state.mode === 'Face'
                  ? <FaceDetect 
                      imageURL={this.state.imageURL} 
                      face_box={this.state.face_box} 
                    />                   
                  : <Facedemo 
                      imageURL={this.state.imageURL}
                      face_demo={this.state.face_demo}
                    />
                }
              </div>
            : (
              this.state.route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
              )
          }
        </div>
        <Footer/>
      </div>
    );
  }
}

export default App;