import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecogrition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import SignIn from './components/SignIn/SignIn';



const app = new Clarifai.App({
  apiKey: '9cbd5e2736504195ba15e7aaa8b87ad4'
 });


const particlesOptions = {
  particles: {
      number: {
        value: 180,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
}

class App extends Component {
  constructor() {
    super()
    this.state = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin'
    }
  }
  
  calFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg'); 
    const width = Number(image.width);
    const height = Number(image.height);
    console.log(clarifaiFace);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
      this.setState({input: event.target.value})
  }

  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input})
    app.models
      .predict(
        Clarifai.FACE_DETECT_MODEL, 
        this.state.input)
        .then( response => this.displayFaceBox(this.calFaceLocation(response)))
        .catch( err => console.log(err));
  }


  onRouteChange = () => {
    this.setState({route: 'home'})
  }

  onSignOut = () => {
    this.setState({route: 'signin'})
  }


  render() {
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesOptions}
              />
        { this.state.route !== 'signin'
        ? <Navigation onSignOut={this.onSignOut}/>
        : <div></div>
        }      
        { this.state.route === 'signin'
        ? <SignIn onRouteChange={this.onRouteChange}/>
        : <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
                />   
            <FaceRecogrition 
                imgUrl={this.state.imgUrl}
                box={this.state.box}
                />
           </div>    
          }
              
      </div>
    );
  }
}

export default App;
