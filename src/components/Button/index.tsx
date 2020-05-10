import React, { ButtonHTMLAttributes } from 'react'
import { Container } from './styles'
/**
 * @type is used when you are not modifing the property
 */
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => (
  <Container {...rest} type="submit">
    {children}
  </Container>
)

export default Button
