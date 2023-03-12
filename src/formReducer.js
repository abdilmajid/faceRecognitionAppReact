
const initialUserState = {
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

const initialSignInState = {
    email: '',
    password: ''
}

const initialRegState = {
    name: '',
    email: '',
    password: ''
}


const formReducer = (state, action)=>{
  switch (action.type) {
    case "REGISTER":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "SIGN_IN":
      return {
        ...state,
        [action.payload.name]: action.payload.value
      }
    case "SIGN_OUT":
      return {
        ...state,
        isSignedIn: false,
        route:"signin"
      };
    case "NAV_REGISTER":
      return {
        ...state,
        isSignedIn: false,
        route:"register"
      }
    case "SIGNED_IN":
      return {
        ...state,
        isSignedIn: true,
        route:"home",
      }
    case "LOAD_USER":
      return {
        ...state,
        user: {
          ...state.user,
          id: action.payload.id,
          name: action.payload.name,
          email: action.payload.email,
          entries: action.payload.entries,
          regDate: action.payload.regDate
        }
      }
    case "INPUT_IMG":
      return {
        ...state,
        input: action.payload.value
      }
    default:
      return state;
  }
}

export {initialUserState, initialSignInState, initialRegState}
export default formReducer