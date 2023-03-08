import { useReducer } from 'react';

const apiCall = `http://localhost:4009`


function SignIn ({newUser, onRouteChange}) {
  const initialState = {
    signInEmail: '',
    signInPassword: ''
  }
  const [ signIn, setSignIn ] = useReducer((signIn, newSignIn)=>({...signIn,...newSignIn}), initialState)


  const onEmailChange = (event) => {
    setSignIn({signInEmail: event.target.value})
  }
  const onPasswordChange = (event) => {
    setSignIn({signInPassword: event.target.value})
  }

  const onSignInSubmit = () => {
    fetch(`${apiCall}/signin`, {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: signIn.signInEmail,
        password: signIn.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        console.log(user)
        if (user.id) {
          newUser(user)
          onRouteChange('home');
        } else {
          alert('Wrong Email/Password')
        }
      })
      
    console.log(signIn)
  }


  return (
    <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
        <main className='pa4 nlack-50'>
          <div className='measure'>
            <fieldset id='sign_up' 
                      className='ba b--transparent ph0 mh0'>
              <legend className='f2 fw6 ph0 mh0'>Sign In</legend>
              <div className='mt3'>
                <label 
                  className='db fw6 lh-copy f5' 
                  htmlFor='email-address'>Email</label>
                <input
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                  type='email' 
                  name='email-address' 
                  id='email-address'
                  onChange={onEmailChange}
                />       
              </div>
              <div className='mv3'>
                <label className='db fw6 lh-copy f5'
                      htmlFor='password'>Password</label>
                <input 
                  className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                  type='password' 
                  name='password' 
                  id='password'
                  onChange={onPasswordChange}
                /> 
              </div>
            </fieldset>
            <div className=''>
              <input 
                  className='b ph3 pv2 input-reset ba bg-transparent b--black grow hover-white pointer f5 dib' 
                  type='submit' 
                  value='Sign in' 
                  onClick={onSignInSubmit}/> 
            </div>
            <div className='lh-copy mt3'>
              <p onClick={() => onRouteChange('register')} className='f4 b link dim black pointer db'>Register</p>
            </div>
          </div>
        </main>
      </article> 
    )
}

  



export default SignIn;