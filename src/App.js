import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      userPosition: 67,
      userHealth: 100,
      userLevel: 0,
      userWeapon: "Sword",
      start: true
		}
		this.constructMap = this.constructMap.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
	}
  
  componentWillMount() {
    this.setState({
      start: false
    })
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) {
    if(e.key === "ArrowRight") {
      if((this.state.userPosition + 1) % 50  && document.getElementById(this.state.userPosition + 1).getAttribute("contains") !== "wall") {
        this.setState({
          userPosition: this.state.userPosition + 1
        });
      }
    }
    if(e.key === "ArrowLeft") {
      console.log(document.getElementById(this.state.userPosition - 1).getAttribute("contains"));
      if(this.state.userPosition % 50 && document.getElementById(this.state.userPosition - 1).getAttribute("contains") !== "wall") {
        this.setState({
          userPosition: this.state.userPosition - 1
        });
      }
    }
    if(e.key === "ArrowUp") {
      if(this.state.userPosition > 49 && document.getElementById(this.state.userPosition - 50).getAttribute("contains") !== "wall") {
        this.setState({
          userPosition: this.state.userPosition - 50
        });
      }
    }
    if(e.key === "ArrowDown" && document.getElementById(this.state.userPosition + 50).getAttribute("contains") !== "wall") {
      if(this.state.userPosition < 1450) {
        this.setState({
          userPosition: this.state.userPosition + 50
        });
      }
    }
    console.log(this.state.userPosition);
  }
  
  constructMap() {
    let grid = [];
    let j = this.state.userPosition;
    let wall;
    
    if(this.state.start) {Math.floor(Math.random()*(1500-1+1)+1)};
	  for(let i = 0; i < 1500; i++) {
      if(i === j) {
        grid.push(<div className="user" key={i} contains="user" id={i}>(:</div>);
      } else if(i === wall) {
        grid.push(<div className="wall" key={i} contains="wall" id={i}>(:</div>);
      } else {
        grid.push(<div className="gridItem" key={i} contains="floor" id={i}></div>);
      }
    }
    //console.log(grid);
    return grid;
  }
  
  render() {
    return (
      <div className="App">
        <div className="container">
          <div className="map">
            <div className="fieldOfVision">
              {this.constructMap()}
            </div>
          </div>
        </div>
        <p>Health: {this.state.userHealth}</p>
        <p>Level: {this.state.userLevel}</p>
        <p>Weapon: {this.state.userWeapon}</p>
      </div>
    );
  }
}

export default App;
