import { useReducer } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Rank from './components/Rank/Rank';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import formReducer ,{ initialUserState } from './formReducer';

const apiCall = `http://localhost:4009`



  
  function App () {
    const [ user, setUser ] = useReducer(formReducer, initialUserState)
    
    // const [ image, setImage ] = useReducer((image,newImage)=>({...image, newImage}), initialImageState)
    

  const loadUser = (data) => {
    setUser({
      type:"LOAD_USER", 
      payload: { 
        id: data.id, 
        name: data.name,
        email: data.email,
        entries: data.entries,
        regDate: data.joined,
      }
    })
    console.log(data)
  }
  console.log(user)


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
    const image = document.getElementById('inputimage');
    console.log(image)
    const width = Number(image.width);
    const height = Number(image.height);
    
    return ({
      left: clarifaiFace.left_col * width,
      top: clarifaiFace.top_row * height,
      right: width - (clarifaiFace.right_col * width),
      bottom: height - (clarifaiFace.bottom_row * height)
    })
  }

  


  
  const displayFaceBox = (box) => {
    // const update = ()=>{
    //   return {
    //     ...user,
    //     box: box
    //   }
    // }
    // setUser(update())
  };


  const onInputChange = (event) => {
    setUser({type:"INPUT_IMG", payload: {input: event.payload.value}})
    console.log(event.target.value)
    console.log(user)
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
    const update = ()=>{
      return route==='home'
            ?{type:"SIGNED_IN"}
            :(route==='register'
            ?{type:'NAV_REGISTER'}
            :{type:"SIGN_OUT"})
    }
    setUser(update())
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
