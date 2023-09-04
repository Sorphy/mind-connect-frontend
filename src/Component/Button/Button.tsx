import React from 'react'

const Button = (props: any) => {
  const ButtonStyles = {
    height: props.height,
    width: props.width,
    backgroundColor: props.backgroundColor,
    padding: "12px 16px",
    borderRadius: "8px",
    color: props.color,
    border: "none",
    cursor: "pointer"
  }
  return (
    <button style={ButtonStyles}>{props.children}</button>
  )
}
export default Button;
