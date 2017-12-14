import React, { Component } from 'react'
import './App.css'
import * as d3 from "d3";
import {Motion, spring} from 'react-motion';

const Group = (props) => {
  const t = props.name;
  const l = 120;

  return (
    <g transform={`translate(${props.x}, ${props.y + 250})`} onClick={props.handleExpand}>
      <Dot left={l}/>
      <Text content={t} fz={16}/>
    </g>
  )
}
const Dot = (props) => (
  <circle cx={props.left} cy="0" r="20" stroke="blue"  fill="transparent" strokeWidth="3"/>
)
const Text = (props) => {
  return (
    <text ref={nd => this.nd = nd} x = "0" y = "0" fontFamily = "Verdana" fontSize ={props.fz}>
    {props.content}
  </text>
  )
}

class Tree extends Component {
  constructor(props){
    super(props)

  }
  componentDidMount() {

  }

  handleExpand = () => {
    console.log('one more')
  }

  renderTree(root, basis) {
    basis += 30;
    if(root.children) {

        return (
          <g>
              <Group 
                x={basis} 
                y={basis}

                name={root.name} 
                handleExpand={this.handleExpand}>
                </Group>
              {
                root.children.map((item, i, arr) => {
                  
                  if(item.parent === "all") {
                    console.log(item.parent)
                    const y = (basis + 20);
                    const diff = ((i - (arr.length / 2))* 90);
                    console.log(diff)
                    const dUp = `M140,00 C240,-5 240,55 290, ${50}`
                    const dDown = `M140,90 C240,85 240,45 290, ${50}`
  
                    return (<g 
                      className="child" 
                      transform={`translate(${160}, ${15})`} 
                      key={i}>
                      <path d={dUp} fill="transparent" stroke="black" transform={`translate(${basis-160}, ${y + 250 - 35})`} />
                      <path d={dDown} fill="transparent" stroke="black" transform={`translate(${basis-160}, ${y + 250 - 35})`} />
                      {this.renderTree(item, basis)} </g>)              
                  }
                  const y = (basis + 250);
                  const diff = ((i - (arr.length / 2))* 90);
                  const dUp = `M140,00 C240,-15 240,${diff/2} 290, ${diff + 30}`

                  return (<g 
                    className="child" 
                    transform={`translate(${160}, ${(i - (arr.length / 2))* 90})`} 
                    key={i}>
                    <path d={dUp} fill="transparent" stroke="black" transform={`translate(${basis-160}, ${Math.abs(diff) + y})`} />
                    {this.renderTree(item, basis)} </g>)
                })
                }
          </g>
          
        );
    } else {
      return <Group 
      x={basis} 
      y={basis} 
      name={root.name} 
      handleExpand={this.handleExpand}>
      </Group>
    }

    
  }
  render() {
        return (<svg ref={node => this.node = node}
          width={1000} height={1000}>
          {this.renderTree(treeData, 0)}
          </svg>)
    }
}

const treeData = {
      "name": "Top Level",
      "parent": "null",
      "children": [
        {
          "name": "Level 2: A",
          "parent": "Top Level",
          "children": [
            {
              "name": "Son of A",
              "parent": "Level 2: A",
              "children": [
                {
                  "name": "All of this",
                  "parent": "all",
                }
              ]
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A",
            }
          ],
          "subchildren": {
            "name": "SOSF"
          }
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level",
        }
      ]
    };
export default Tree