import React, { Component } from 'react';
import './Snakenode.css';




interface Props{
    xPos : number;
    yPos: number; 
    isHead: boolean; 
    isBody: boolean;
    isApple: boolean;
    previousNode?: Snakenode;
}

export default class Snakenode extends Component<Props> {



render(){
    const {xPos, yPos, isHead, isBody, isApple }  = this.props; 
    return (
       <div id= {`node-${xPos}-${yPos}`}
       
       
       > foo </div>);
    
}


}