import { useReducer } from 'react';
import formReducer, { initialRegState } from '../../formReducer';

const apiCall = process.env.REACT_APP_API_CALL


function Register ({loadUser,onRouteChange}) {
  const [ register, setRegister ] = useReducer(formReducer, initialRegState)


  const handleChange = (event) => {
    console.log(event)
    setRegister({
      type:"REGISTER",
      payload: { name:event.target.name, value:event.target.value }
    })
  }

  
  const onRegisterSubmit = () => {
    const {name, email, password} = register;
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
              loadUser(user)
              onRouteChange('home')
            } else {
              alert('Sorry Email already exists')
            }
          })
    }
  }


    return (
      <article className='br3 ba b--black-10 mv4 w-100 w-50-m w-25-1 mw6 shadow-5 center'>
         <main className='pa4 nlack-50'>
           <div className='measure'>
             <fieldset id='sign_up' 
                       className='ba b--transparent ph0 mh0'>
               <legend className='f2 fw6 ph0 mh0'>Register</legend>
               <div className='mt3'>
                 <label className='db fw6 1h-copy f5' 
                       htmlFor='name'>Name</label>
                 <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                    type='text' 
                    name='name' 
                    id='name'
                    onChange={handleChange}
                  />       
               </div>
               <div className='mt3'>
                 <label className='db fw6 1h-copy f5' 
                       htmlFor='email-address'>Email</label>
                 <input 
                    className='pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100' 
                    type='email' 
                    name='email' 
                    id='email-address'
                    onChange={handleChange}
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
                    onChange={handleChange}
                  /> 
               </div>
             </fieldset>
             <div className=''>
               <input 
                   className='b ph3 pv2 input-reset ba bg-transparent b--black grow hover-white pointer f4 dib' 
                   type='submit' 
                   value='Register' 
                   onClick={onRegisterSubmit}/> 
             </div>
           </div>
         </main>
       </article> 
     )
  }



export default Register;
