import React from 'react'

export const Text = (props) => (
  <text 
    x={props.left} 
    y="3" 
    fontFamily="Verdana" 
    textAnchor="end" 
    fontSize={14}>
    {props.content}
  </text>
)