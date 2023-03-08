import { useReducer } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';

const apiCall = `http://localhost:4009`

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

function App () {
  const [ user, setUser ] = useReducer((user, newUser)=>({...user,...newUser}), initialState)


  const newUser = (data) => {
    setUser({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      regDate: data.regDate
    }})
  }


  const calFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImg'); 
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  const displayFaceBox = (box) => setUser({box: box});
  const onInputChange = (event) => setUser({input: event.target.value})
  
  const onButtonSubmit = () => {
    setUser({imgUrl: user.input})
        fetch(`${apiCall}/imageurl`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: user.input
          })
        })
        .then(res => res.json())
        .then( response => {
          if(response) {
            fetch(`${apiCall}/image`, {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.user.id
              })
            })
              .then(res => res.json())
              .then(count => {
                setUser(Object.assign(user.user, {entries: count}))
              })
          }
          displayFaceBox(calFaceLocation(response))
        })
        .catch( err => console.log(err));
  }
  
  const onRouteChange = (route) => {
    if(route === 'signout') {
      setUser(initialState)
    } else if(route === 'home') {
      setUser({isSignedIn: true})
    }
    setUser({route: route})
  }


  
  const { route, imgUrl, box, isSignedIn} = user;
  
  return (
    <div className="App">
      {/* <ParticlesBg color="#F0FFF0" type='thick' bg={true}/> */}
       <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>      
      { route === 'home'
      ? <div>
            <Logo />
            <Rank name={user.user.name} entries={user.user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>   
            <FaceRecognition imgUrl={imgUrl} box={box}/>
          </div>  
      : (
          route === 'signin' 
          ? <SignIn newUser={newUser} onRouteChange={onRouteChange} />
          : <Register newUser={newUser} onRouteChange={onRouteChange}/>
        )
      }
    </div>
  );
}


export default App;
