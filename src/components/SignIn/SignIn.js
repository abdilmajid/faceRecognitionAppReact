import React, {Component} from 'react';

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      signInEmail: '',
      signInPassword: ''
    }
  }

  onEmailChange = (event) =>{
    this.setState({signInEmail: event.target.value})
  }

  onPasswordChange = (event) =>{
    this.setState({signInPassword: event.target.value})
  }

  onSignInSubmit = () => {
    fetch('http://localhost:3001/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(user => {
        if (user[0].id) {
          this.props.newUser(user)
          this.props.onRouteChange('home');
        } else {
          alert('Wrong Email/Password')
        }
      })
  }


  render() {
    const {onRouteChange} = this.props
    console.log(this.props)
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
          <main className='pa4 nlack-50'>
            <div className='measure'>
              <fieldset id='sign_up' 
                        className='ba b--transparent ph0 mh0'>
                <legend className='f4 fw6 ph0 mh0'>Sign In</legend>
                <div className='mt3'>
                  <label 
                    className='db fw6 1h-copy f6' 
                    htmlFor='email-address'>Email</label>
                  <input
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50' 
                    type='email' 
                    name='email-address' 
                    id='email-address'
                    onChange={this.onEmailChange}
                  />       
                </div>
                <div className='mv3'>
                  <label className='db fw6 lh-copy f6'
                        htmlFor='password'>Password</label>
                  <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-50' 
                    type='password' 
                    name='password' 
                    id='password'
                    onChange={this.onPasswordChange}
                  /> 
                </div>
              </fieldset>
              <div className=''>
                <input 
                    className='b ph3 pv2 input-reset ba bg-transparent b--black grow hover-white pointer f6 dib' 
                    type='submit' 
                    value='Sign in' 
                    onClick={this.onSignInSubmit}/> 
              </div>
              <div className='1h-copy mt3'>
                <p onClick={() => onRouteChange('register')} className='f6 link dim black pointer db'>Register</p>
              </div>
            </div>
          </main>
        </article> 
      )
  }
}
  



export default SignIn;