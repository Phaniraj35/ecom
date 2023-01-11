import React, { useState } from 'react'
import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button, { BUTTON_TYPES } from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignInForm.scss'

const defaultFormFields = {
  email: '',
  password: '',
};

const SignInForm = () => {

  const [formFields, setFormFields] = useState(defaultFormFields);


  const handleChange = event => {
    const { name, value } = event.target;

    setFormFields({...formFields, [name]: value});
  }

  const resetForm = () => {
    setFormFields(defaultFormFields);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
        const response  = await signInAuthUserWithEmailAndPassword(formFields.email, formFields.password);
        resetForm();
    } catch (error) {
       switch (error.code) {
        case 'auth/wrong-password':
          alert('Incorrect password');
          break;

        case 'auth/user-not-found':
          alert('User not associated with specified email');
          break;

        default:
          console.log('error while signing in ', error);
       }
    }

  }

  const logGoogleUser = async () => {
    await signInWithGooglePopup();
  }

  return (
    <div className='sign-in-container'>
        <h2>Already have an account?</h2>
        <span>Sign in with your email and password</span>
        <form onSubmit={ handleSubmit }>
            <FormInput label='Email' type="email" required id="email" onChange={handleChange} name="email" value={formFields.email} />

            <FormInput label='Password' type="password" required id="password" onChange={handleChange} name="password" value={formFields.password} />

            <div className="buttons-container">
              <Button type="submit">Sign In</Button>

              <Button type='button' onClick={logGoogleUser} buttonType={BUTTON_TYPES.google} >Google SignIn</Button>
            </div>
        </form>
    </div>
  );
}

export default SignInForm