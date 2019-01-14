import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
		this.state = {
      userPosition: 67,
      userHealth: 100,
      userLevel: 0,
      userWeapon: "Ax",
      wall: Math.floor(Math.random()*(1500-1+1)+1),
      sword: Math.floor(Math.random()*(1500-1+1)+1),
      treasure: Math.floor(Math.random()*(1500-1+1)+1),
      boss: Math.floor(Math.random()*(1500-1+1)+1)
		}
		this.constructMap = this.constructMap.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getTreasure = this.getTreasure.bind(this);
	}
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) {
    if(e.key === "ArrowRight") {
      let rightTile = document.getElementById(this.state.userPosition + 1).getAttribute("contains");
      if((this.state.userPosition + 1) % 50  && rightTile !== "wall") {
        if(rightTile === "treasure") { 
          this.getTreasure();
        }
        if(rightTile === "sword") { 
          this.getWeapon(rightTile);
        }
        this.setState({
          userPosition: this.state.userPosition + 1
        });
      }
    }
    if(e.key === "ArrowLeft") {
      let leftTile = document.getElementById(this.state.userPosition - 1).getAttribute("contains");
      if(this.state.userPosition % 50 && leftTile !== "wall") {
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
  
  getTreasure() {
    this.setState({
      treasure: "none",
      userHealth: this.state.userHealth + 100 
    });
  }
  
  getWeapon(weapon) {
    this.setState({
      userWeapon: weapon,
      sword: "none"
    });
  }
  
  constructMap() {
    let grid = [];
    let j = this.state.userPosition;
    
	  for(let i = 0; i < 1500; i++) {
      if(i === j) {
        grid.push(<div className="user" key={i} contains="user" id={i}>(:</div>);
      } else if(i === this.state.wall) {
        grid.push(<div className="wall" key={i} contains="wall" id={i}></div>);
      } else if(i === this.state.sword) {
        grid.push(<div className="gridItem" key={i} contains="sword" id={i}>>=</div>);
      } else if(i === this.state.treasure) {
        grid.push(<div className="gridItem" key={i} contains="treasure" id={i}>$</div>);
      } else if(i === this.state.boss) {
        grid.push(<div className="boss" key={i} contains="boss" id={i}>B</div>);
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
