import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
    let uniques = [];
    let unique;
    let i = 0;
    while(i < 5) {
      unique =  Math.floor(Math.random()*(1440-60+60)+60);
      if(uniques.indexOf(unique) === -1) {
        uniques.push(unique);
        i++;
      }
    }
		this.state = {
      userPosition: uniques[0],
      userHealth: 100,
      userLevel: 0,
      userWeapon: "fist",
      wall: uniques[1],
      sword: uniques[2],
      treasure: uniques[3],
      boss: uniques[4],
      bossHealth: 100,
      message: "There is danger afoot."
		}
		this.constructMap = this.constructMap.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getTreasure = this.getTreasure.bind(this);
    this.fight = this.fight.bind(this);
	}
  
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
	
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
	
  handleKeyPress(e) { 
    
    if(e.key === "ArrowRight") {
      let rightTile;
      if(document.getElementById(this.state.userPosition - 50) !== null) {
        rightTile = document.getElementById(this.state.userPosition + 1).getAttribute("contains");
      }
      if((this.state.userPosition + 1) % 50  && rightTile !== "wall" && rightTile !== "boss") {
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
      if(rightTile === "boss") {
        this.fight();
      }
    }
    
    if(e.key === "ArrowLeft") {
      let leftTile;
      if(document.getElementById(this.state.userPosition - 50) !== null) {
        leftTile = document.getElementById(this.state.userPosition - 1).getAttribute("contains");
      }
      if(this.state.userPosition % 50 && leftTile !== "wall" && leftTile !== "boss") {
        if(leftTile === "treasure") { 
          this.getTreasure();
        }
        if(leftTile === "sword") { 
          this.getWeapon(leftTile);
        }
        this.setState({
          userPosition: this.state.userPosition - 1
        });
      }
      if(leftTile === "boss") {
         this.fight();
      }
    }
    
    if(e.key === "ArrowUp") {
      let upTile;
      if(document.getElementById(this.state.userPosition - 50) !== null) {
        upTile = document.getElementById(this.state.userPosition - 50).getAttribute("contains");
      }
      if(this.state.userPosition > 49 && upTile !== "wall" && upTile !== "boss") {
        if(upTile === "treasure") { 
          this.getTreasure();
        }
        if(upTile === "sword") { 
          this.getWeapon(upTile);
        }
        this.setState({
          userPosition: this.state.userPosition - 50
        });
      }
      if(upTile === "boss") {
        this.fight();
      }
    }
    
    if(e.key === "ArrowDown") { 
      let downTile;
      if(document.getElementById(this.state.userPosition + 50) !== null) {
        downTile = document.getElementById(this.state.userPosition + 50).getAttribute("contains");
      }
      if(this.state.userPosition < 1450 && downTile !== "wall" && downTile !== "boss") {
        if(downTile === "treasure") { 
          this.getTreasure();
        }
        if(downTile === "sword") { 
          this.getWeapon(downTile);
        }
        this.setState({
          userPosition: this.state.userPosition + 50
        });
      }
      if(downTile === "boss") {
         this.fight();
      }
    }
    
    //console.log(this.state.userPosition);
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
  
  fight() {
    if(this.state.userWeapon === "sword") {
      if(this.state.bossHealth === 1) {
        this.setState({
          boss: "none",
          message: "They will sing of your exploits for centuries."
        });
      }
      this.setState({
        bossHealth: this.state.bossHealth - 1,
        message: "Go for the eyes."
      });
    }
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
        <div className="stats">
          <p>Health: {this.state.userHealth}</p>
          <p>Level: {this.state.userLevel}</p>
          <p>Weapon: {this.state.userWeapon}</p>
          <p>Boss Health: {this.state.bossHealth}</p>
          <p>{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default App;
