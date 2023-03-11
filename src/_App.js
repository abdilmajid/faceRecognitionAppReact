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


// const initialImageState = {
  //   left: 0,
  //   top: 0,
  //   right: 0,
  //   bottom: 0
  // }
  
  function App () {
    const initialState = {
      input: '',
      imgUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      test: '',
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        regDate: ''
      }
    }

    const [ user, setUser ] = useReducer((user, newUser)=>({...user,...newUser}), initialState)
    
    // const [ image, setImage ] = useReducer((image,newImage)=>({...image, newImage}), initialImageState)
    

  const loadUser = (data) => {
    console.log(data)
    setUser({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      password: data.password,
      entries: data.entries,
      regDate: data.regDate
    }})
  }


  // const calFaceLocation = (data) => {
  //   const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
  //   const image = document.getElementById('inputImg'); 
  //   const width = Number(image.width);
  //   const height = Number(image.height);
  //   return {
  //     leftCol: clarifaiFace.left_col * width,
  //     topRow: clarifaiFace.top_row * height,
  //     rightCol: width - (clarifaiFace.right_col * width),
  //     bottomRow: height - (clarifaiFace.bottom_row * height)
  //   }
  // }

  const calculateFaceLocation = (data) => {
    console.log(data)
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;

    console.log(clarifaiFace)
    // const image = document.getElementById('inputImage');
    const image = document.getElementById('inputImg');
    const width = Number(image.width);
    const height = Number(image.height);
    
    return ({
      left: clarifaiFace.left_col * width,
      Row: clarifaiFace.top_row * height,
      right: width - (clarifaiFace.right_col * width),
      bottom: height - (clarifaiFace.bottom_row * height)
    })
  }

  

  
  const displayFaceBox = (box) => {
    const update = {...user,...box}
    setUser(update)
    console.log(update)
  };


  const onInputChange = (event) => {
    setUser({input: event.target.value})
  };
  
  // const onButtonSubmit = () => {
  //   setUser({imgUrl: user.input})
  //       fetch(`${apiCall}/imageurl`, {
  //         method: 'post',
  //         headers: {'Content-Type': 'application/json'},
  //         body: JSON.stringify({
  //           input: user.input
  //         })
  //       })
  //       .then(response => response.json())
  //       .then( response => {
  //         console.log(user)
  //         if(response) {
  //           fetch(`${apiCall}/image`, {
  //             method: 'put',
  //             headers: {'Content-Type': 'application/json'},
  //             body: JSON.stringify({
  //               id: user.user.id
  //             })
  //           })
  //             .then(response => response.json())
  //             .then(count => {
  //               setUser(Object.assign(user.user, {entries: count}))
  //             })
  //             .catch(console.log)
  //         }
  //         console.log('107')
  //         displayFaceBox(calculateFaceLocation(response))
  //       })
  //       .catch( err => console.log(err));
  // }
  

  const onButtonSubmit = () => {
    console.log(user)
    setUser(Object.assign({imgUrl: user.input}))
    console.log(user)
        fetch(`${apiCall}/imageurl`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            input: user.input
          })
        })
        .then(response => response.json())
        .then( response => {
          console.log(user)
          if(response) {
            fetch(`${apiCall}/image`, {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: user.user.id
              })
            })
              .then(response => response.json())
              .then(count => {
                setUser(Object.assign(user.user, {entries: count}))
              })
              .catch(console.log)
          }

          displayFaceBox(calculateFaceLocation(response))
          
          console.log(user)
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
       <Navigation isSignedIn={isSignedIn} onRouteChange={onRouteChange}/>      
      { route === 'home'
      ? <div>
            <Logo />
            <Rank name={user.user.name} entries={user.user.entries}/>
            <ImageLinkForm onInputChange={onInputChange} onButtonSubmit={onButtonSubmit}/>   
            {/* <FaceRecognition imgUrl={imgUrl} box={box}/> */}
            <FaceRecognition imgUrl={imgUrl} box={box}/>
          </div>  
      : (
          route === 'signin'
          ? <SignIn loadUser={loadUser} onRouteChange={onRouteChange}/>
          : <Register loadUser={loadUser} onRouteChange={onRouteChange}/>
        )
      }
    </div>
  );
}


export default App;
