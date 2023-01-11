import React, { useState } from 'react'
import { createAuthUserWithEmailAndPassword, creteUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';
import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import './SignUpForm.scss';


const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
 };

const SignUpForm = () => {

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

    if (formFields.password !== formFields.confirmPassword) {
        alert('Passwords do not match');
        return;
    }


    try {
        const response = await createAuthUserWithEmailAndPassword(formFields.email, formFields.password);
        await creteUserDocumentFromAuth(response.user, { displayName: formFields.displayName });
        resetForm();
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            alert('Cannot create user, email already in use');
        } else {
            console.log('error while sign up using email and password', error);
        }
    }

  }

  return (
    <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email and password</span>
        <form onSubmit={ handleSubmit }>
            <FormInput label='Display name' type="text" required id="display_name" onChange={handleChange} name="displayName" value={formFields.displayName} />

            <FormInput label='Email' type="email" required id="email" onChange={handleChange} name="email" value={formFields.email} />

            <FormInput label='Password' type="password" required id="password" onChange={handleChange} name="password" value={formFields.password} />

            <FormInput label='Confirm Password' type="password" required id="confirm_password" onChange={handleChange} name="confirmPassword" value={formFields.confirmPassword} />

            <Button  type="submit">Sign Up</Button>
        </form>
    </div>
  )
}

export default SignUpForm