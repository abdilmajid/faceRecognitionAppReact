import React, {Component} from 'react'



const apiCall = `https://damp-anchorage-41821.herokuapp.com`


class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: ''
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }
  
  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onRegisterSubmit = () => {
    const {name, email, password} = this.state;
    if(name.length > 0 && 
      email.length > 0 &&
       password.length > 0) {
        fetch(`${apiCall}/register`, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: name,
            email: email,
            password: password
          })
        })
          .then(res => res.json())
          .then(user => {
            if(user.id){
              this.props.newUser(user)
              this.props.onRouteChange('home')
            } else {
              alert('Sorry Email already exists')
            }
          })
    }
  }



  render() {
    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
         <main className='pa4 nlack-50'>
           <div className='measure'>
             <fieldset id='sign_up' 
                       className='ba b--transparent ph0 mh0'>
               <legend className='f4 fw6 ph0 mh0'>Register</legend>
               <div className='mt3'>
                 <label className='db fw6 1h-copy f6' 
                       htmlFor='name'>Name</label>
                 <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                    type='text' 
                    name='name' 
                    id='name'
                    onChange={this.onNameChange}
                  />       
               </div>
               <div className='mt3'>
                 <label className='db fw6 1h-copy f6' 
                       htmlFor='email-address'>Email</label>
                 <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
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
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
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
                   value='Register' 
                   onClick={this.onRegisterSubmit}/> 
             </div>
           </div>
         </main>
       </article> 
     )
  }
}


export default Register;