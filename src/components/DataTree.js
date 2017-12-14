import React, { Component } from 'react'
import {Motion, spring} from 'react-motion';
import { Group } from './Group'
import '../App.css'
import { treeData } from '../data';

class DataTree extends Component {
  constructor(props){
    super(props)
    this.state = {
      eventType: {}
    }
  }

  handleExpand = (name, e) => this.setState({
      eventType: {
        ...this.state.eventType,
        [name]: !this.state.eventType[name] || false,
      }
  })

  getBranchClassName = (yO) => `child ${yO >= 0 ? 'up' : 'down'}`;

  getBranchY = (i, arr) => (i - (arr.length / 2))* 90;

  getMotionCondition = (parentName) => this.state.eventType[parentName] ? 1 : 0;

  getBranchStroke = (branchY) => `M140,00 C240,-15 240,${branchY/2} 300, ${branchY + 30}`;

  renderSubBranch = (basis, item) => {
    const dUp = `M140,00 C240,-5 240,45 300, ${45}`;
    const dDown = `M140,90 C240,85 240,45 300, ${45}`;
    const posY = basis + 235;
    const posX = basis - 160;

    return (<g 
        className="child" 
        transform={`translate(${150}, ${15})`} 
        key={dUp}>
        <path d={dUp} fill="transparent" stroke="black" transform={`translate(${posX}, ${posY})`} />
        <path d={dDown} fill="transparent" stroke="black" transform={`translate(${posX}, ${posY})`} />
        {this.renderDataTree(item, basis)} </g>
    )
  }

  renderDataTree({ name, children }, basis) {
    basis += 30;
    if(children) {
        return (
          <g>
              <Group 
                x={basis} 
                y={basis}
                name={name} 
                handleExpand={this.handleExpand}>
                </Group>
              {
                children.map((item, i, arr) => {  
                  const diff = this.getBranchY(i, arr);
                  const parentName = item.parent;

                  if(parentName === "all") {          
                    return this.renderSubBranch(basis, item);
                  }

                  return (<Motion key={`${i + parentName}`} style={{[parentName]: spring(this.getMotionCondition(parentName))}}>
                    {(obj) => (
                          <g 
                            className={this.getBranchClassName(diff)} 
                            transform={`translate(${150}, ${diff}) scale(${obj[parentName]})`} 
                          >
                            <path 
                              d={this.getBranchStroke(diff)} 
                              fill="transparent" 
                              stroke="black" 
                              transform={`translate(${basis-160}, ${Math.abs(diff) + basis + 250})`} 
                            />
                            {this.renderDataTree(item, basis)} 
                          </g>
                        )}
                    </Motion>
                  )
                })
                }
          </g>
        );
    }

    return <Group 
      x={basis} 
      y={basis} 
      name={name} 
      handleExpand={this.handleExpand}>
    </Group>;
  }
  render() {
      return (<svg width={1000} height={1000}>
        {this.renderDataTree(treeData, 0)}
      </svg>)
    }
}

export default DataTree

