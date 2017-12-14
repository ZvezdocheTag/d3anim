import React, { Component } from 'react'
import './App.css'
import * as d3 from "d3";
import {Motion, spring} from 'react-motion';

const Group = (props) => {
  const t = props.name;
  const l = 120;

  return (
    <g transform={`translate(${props.x}, ${props.y + 250})`} onClick={props.handleExpand.bind(null, props.name)}>
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
    this.state = {
      open: false,
      actionName: '',
      eventType: {

      }
    }

  }
  componentDidMount() {

  }

  handleExpand = (name, e) => {
    // console.log(e, name)
    this.setState({
      open: !this.state.open,
      actionName: name,
      eventType: {
        ...this.state.eventType,
        [name]: !this.state.eventType[name] || false,
      }
    })
  }

  renderTree(root, basis) {
    basis += 30;
    if(root.children) {
        console.log(this.state)
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
                    // console.log(item.parent)
                    const diff = ((i - (arr.length / 2))* 90);
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
                  
                  const par = item.parent;
                  return (<Motion style={{[par]: spring(this.state.eventType[item.parent] ? 1 : 0)}}>
                    {
                      (obj) => {
                        // console.log(obj[par])
                        return (
                          <g 
                          className={`child ${par}`} 
                          transform={`translate(${160}, ${(i - (arr.length / 2))* 90}) scale(${obj[par]})`} 
                          key={i}>
                          <path d={dUp} fill="transparent" stroke="black" transform={`translate(${basis-160}, ${Math.abs(diff) + y})`} />
                          {this.renderTree(item, basis)} </g>
                        )
                      }
                    }
                    </Motion>

                    
                  )
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
    console.log(this.state.eventType)
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
            },
            {
              "name": "Daughter of A",
              "parent": "Level 2: A",
            }
          ],
        },
        {
          "name": "Level 2: B",
          "parent": "Top Level",
        }
      ]
    };
export default Tree




const treeDatsa = {
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
    },
    {
      "name": "Level 2: B",
      "parent": "Top Level",
    }
  ]
};