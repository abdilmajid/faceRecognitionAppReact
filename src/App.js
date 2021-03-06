import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecogrition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import Particles from 'react-particles-js';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';




const apiCall = `https://damp-anchorage-41821.herokuapp.com`


const particlesOptions = {
  particles: {
      number: {
        value: 30,
        density: {
          enable: true,
          value_area: 800
        }
      }
  }
}


const initialState = {
    input: '',
    imgUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      password: '',
      entries: 0,
      regDate: ''
    }
  }



class App extends Component {
  constructor() {
    super()
    this.state = initialState
  }
  

  newUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
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
        fetch(`${apiCall}/imageurl`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: this.state.input
          })
        })
        .then(res => res.json())
        .then( response => {
          if(response) {
            fetch(`${apiCall}/image`, {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(res => res.json())
              .then(count => {
                this.setState(Object.assign(this.state.user, {entries: count}))
              })
          }
          this.displayFaceBox(this.calFaceLocation(response))
        })
        .catch( err => console.log(err));
  }
  


  onRouteChange = (route) => {
    if(route === 'signout') {
      this.setState(initialState)
    } else if(route === 'home') {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }


  render() {
    const { route, imgUrl, box, isSignedIn} = this.state;
    return (
      <div className="App">
        <Particles 
                className='particles'
                params={particlesOptions}
              />
         <Navigation 
                isSignedIn={isSignedIn} 
                onRouteChange={this.onRouteChange} 
              />      
        { route === 'home'
            ? <div>
                  <Logo />
                  <Rank 
                    name={this.state.user.name} 
                    entries={this.state.user.entries}
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
                route === 'signin' || route === 'signout'
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
