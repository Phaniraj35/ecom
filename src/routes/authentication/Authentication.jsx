import React from 'react'
import SignInForm from '../../components/SignInForm/SignInForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import './Authentication.scss'

const SignIn = () => {
  return (
    <div className='authentication-container'>
        <SignInForm />

        <SignUpForm />
    </div>
  )
}

export default SignIn