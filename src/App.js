import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
		super(props);
    let uniques = [];
    let unique;
    let i = 0;
    while(i < 6) {
      unique =  Math.floor(Math.random()*(1440-60+60)+60);
      if(uniques.indexOf(unique) === -1) {
        uniques.push(unique);
        i++;
      }
    }
		this.state = {
      userPosition: uniques[0],
      userHealth: 100,
      userExperience: 0,
      experienceToLevelUp: 50,
      userLevel: 1,
      userWeapon: "fist",
      wall: uniques[1],
      sword: uniques[2],
      treasure: uniques[3],
      boss: uniques[4],
      slime: uniques[5],
      bossHealth: 100,
      slimeHealth: 10,
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
      if(document.getElementById(this.state.userPosition + 1) !== null) {
        rightTile = document.getElementById(this.state.userPosition + 1).getAttribute("contains");
      }
      if((this.state.userPosition + 1) % 50  && rightTile !== "wall" && rightTile !== "boss" && rightTile !== "slime") {
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
      if(rightTile === "boss" || rightTile === "slime") {
        this.fight(rightTile);
      }
    }
    
    if(e.key === "ArrowLeft") {
      let leftTile;
      if(document.getElementById(this.state.userPosition - 50) !== null) {
        leftTile = document.getElementById(this.state.userPosition - 1).getAttribute("contains");
      }
      if(this.state.userPosition % 50 && leftTile !== "wall" && leftTile !== "boss" && leftTile !== "slime") {
        if(leftTile === "treasure") { 
          this.getTreasure();
          this.getExperience(leftTile);
        }
        if(leftTile === "sword") { 
          this.getWeapon(leftTile);
          this.getExperience(leftTile);
        }
        this.setState({
          userPosition: this.state.userPosition - 1
        });
      }
      if(leftTile === "boss" || leftTile === "slime") {
         this.fight(leftTile);
      }
    }
    
    if(e.key === "ArrowUp") {
      let upTile;
      if(document.getElementById(this.state.userPosition - 50) !== null) {
        upTile = document.getElementById(this.state.userPosition - 50).getAttribute("contains");
      }
      if(this.state.userPosition > 49 && upTile !== "wall" && upTile !== "boss" && upTile !== "slime") {
        if(upTile === "treasure") { 
          this.getTreasure();
          this.getExperience(upTile);
        }
        if(upTile === "sword") { 
          this.getWeapon(upTile);
          this.getExperience(upTile);
        }
        this.setState({
          userPosition: this.state.userPosition - 50
        });
      }
      if(upTile === "boss" || upTile === "slime") {
        this.fight(upTile);
      }
    }
    
    if(e.key === "ArrowDown") { 
      let downTile;
      if(document.getElementById(this.state.userPosition + 50) !== null) {
        downTile = document.getElementById(this.state.userPosition + 50).getAttribute("contains");
      }
      if(this.state.userPosition < 1450 && downTile !== "wall" && downTile !== "boss" && downTile !== "slime") {
        if(downTile === "treasure") { 
          this.getTreasure();
          this.getExperience(downTile);
        }
        if(downTile === "sword") { 
          this.getWeapon(downTile);
          this.getExperience(downTile);
        }
        this.setState({
          userPosition: this.state.userPosition + 50
        });
      }
      if(downTile === "boss" || downTile === "slime") {
         this.fight(downTile);
      }
    }
    
    //console.log(this.state.userPosition);
  }
  
  getTreasure() {
    this.setState({
      treasure: "none",
      userHealth: this.state.userHealth + 100,
      message: "You picked up a glowing artifact. Your blood pulses with energy."
    });
  }
  
  getWeapon(weapon) {
    this.setState({
      userWeapon: weapon,
      sword: "none",
      message: "You picked up the ancient sword. There is an image of teeth engraved on its hilt."
    });
  }
  
  fight(enemy) {
    if(enemy === "boss") {
      if(this.state.userWeapon === "sword") {
        if(this.state.bossHealth === 1) {
          this.setState({
            boss: "none",
            message: "They will sing of your exploits for centuries.",
            bossHealth: this.state.bossHealth - 1
          });
          this.getExperience("boss");
        } else {
          this.setState({
            bossHealth: this.state.bossHealth - 1,
            message: "Go for the eyes.",
            userHealth: this.state.userHealth - 1
          });
        }
      }
    } else {
      if(this.state.userWeapon === "sword") {
        if(this.state.slimeHealth === 1) {
          this.setState({
            slime: "none",
            message: "You slaughtered a disgusting slime. You feel more confident in your abilities.",
            slimeHealth: this.state.slimeHealth - 1,
            userLevel: this.state.userLevel + 1
          });
          this.getExperience("slime");
        } else {
          this.setState({
            slimeHealth: this.state.slimeHealth - 1,
            message: "Go for the tentacles.",
            userHealth: this.state.userHealth - 1
          });
        }
      }
    }
  }
  
  getExperience(event) {
    if(event === "slime") {
      this.setState({
        userExperience: this.state.userExperience + 100
      });
    }
    if(event === "boss") {
      this.setState({
        userExperience: this.state.userExperience + 1000
      });
    }
    if(event === "treasure") {
      this.setState({
        userExperience: this.state.userExperience + 50
      });
    }
    if(event === "sword") {
      this.setState({
        userExperience: this.state.userExperience + 50
      });
    }
  }
  
  levelUp() {
    this.setState({
      userLevel: this.state.userLevel + 1
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
      } else if(i === this.state.slime) {
        grid.push(<div className="slime" key={i} contains="slime" id={i}>s</div>);
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
          <p>Slime Health: {this.state.slimeHealth}</p>
          <p className="message">{this.state.message}</p>
        </div>
      </div>
    );
  }
}

export default App;
