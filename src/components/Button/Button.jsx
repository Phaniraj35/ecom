import React from 'react'
import { BaseButton, GoogleButton, InvertedButton} from './ButtonStyles'

export const BUTTON_TYPES = {
    google: 'google-sign-in',
    inverted: 'inverted',
    base: 'base'
}


const getButton = (buttonType = BUTTON_TYPES.base) => {
  return {
    [BUTTON_TYPES.base]: BaseButton,
    [BUTTON_TYPES.google]: GoogleButton,
    [BUTTON_TYPES.inverted]: InvertedButton,
  }[buttonType]
}


const Button = ({children, buttonType, ...otherProps}) => {

  const CustomButton = getButton(buttonType)

  return (
    <CustomButton {...otherProps}>{children}</CustomButton>
  )
}

export default Button