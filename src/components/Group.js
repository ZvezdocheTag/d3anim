import React from 'react'
import { Dot } from './Dot'
import { Text } from './Text'

export const Group = ({ name, handleExpand, x, y, l = 120 }) => (
  <g transform={`translate(${x}, ${y + 250})`} onClick={handleExpand.bind(null, name)}>
    <Dot left={l}/>
    <Text content={name} left={l - 30}/>
  </g>
)
