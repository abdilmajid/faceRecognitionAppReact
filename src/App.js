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
import Register from './components/Register/Register';



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
      route: 'signin',
      users: {
        id: '',
        name: '',
        email: '',
        password: '',
        score: 0,
        regDate: ''
      }
    }
  }
  

  newUser = (data) => {
    this.setState({users: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      score: data.score,
      regDate: data.regDate
    }})
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
        .then( response => {
          if(response) {
            fetch('http://localhost:3001/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.users.id
              })
            })
              .then(res => res.json)
              .then(count => {
                this.setState(Object.assign(this.state.users, {score: count}))
              })
          }
          this.displayFaceBox(this.calFaceLocation(response))
        })
        .catch( err => console.log(err));
  }
  


  onRouteChange = (route) => {
    this.setState({route: route})
  }


  render() {
    const {route, imgUrl, box} = this.state;
    return (
      <div className="App">
        <Particles className='particles'
                params={particlesOptions}
              />
        {route === 'home'      
         ? <Navigation onRouteChange={this.onRouteChange}/>
         : <div></div>   
        }       
        { route === 'home'
            ? <div>
                  <Logo />
                  <Rank 
                    name={this.state.users.name} 
                    score={this.state.users.score}
                  />
                  <ImageLinkForm 
                      onInputChange={this.onInputChange}
                      onButtonSubmit={this.onButtonSubmit}
                      />   
                  <FaceRecogrition 
                      imgUrl={imgUrl}
                      box={box}
                      />
                </div>  
            : (
                route === 'signin' 
                ? <SignIn 
                    newUser={this.newUser} 
                    onRouteChange={this.onRouteChange}
                  />
                : <Register 
                    newUser={this.newUser} 
                    onRouteChange={this.onRouteChange}
                  />
              )
          }
      </div>
    );
  }
}

export default App;
