import React, { Component } from 'react';
import Data from './data.json';
import './App.css';
import $ from 'jquery';

// change questions

class App extends Component {
  constructor() {
    super();
    this.state = {
      trackQuestion: 0,
      guess: " ",
      score: 0,
    };
    //binds the component to the function to access state
    this.handleInputChange = this.handleInputChange.bind(this);
    this.submit = this.submit.bind(this);
    this.next = this.next.bind(this);
  }
  //submit correct or incorrect answer and color the answer; disable the radio button after submit
  submit(event) {
    $("input[type=radio]").attr('disabled', true);
    event.preventDefault()  
    if (this.state.guess === Data[this.state.trackQuestion].correct) {
      $("#questions input:checked+label").addClass("green-background")
      this.setState({
        //incrememts the score to the correct answer
        score: this.state.score + 1
      })
      //else incorrect answer to highlight red and then green correct answer need ''to take care of white in answers
    } else {
      $("#questions input:checked+label").addClass("red-background")
      $(":radio[value='" + Data[this.state.trackQuestion].correct + "']+label").addClass("green-background")


    }
  }
  // this clears the radio buttons upon next click and clears color; game over alerts the score
  next() {
    $("input[type=radio]").attr('disabled', false);
    this.setState({
      trackQuestion: this.state.trackQuestion + 1
    })
    document.getElementById("questions").reset();
    $(".red-background").removeClass("red-background");
    $(".green-background").removeClass("green-background");
    if (this.state.trackQuestion === 10) {
      alert("Your Score Is " + this.state.score + " out of " + this.state.trackQuestion + "Click okay to begin again")
      window.location.reload(); //react needs window.location restarts the game after alert
    }
  }
  //guess in variable to check if answer is right or wrong
  handleInputChange(event) {
    const value = event.target.value;
    this.setState({
      guess: value
    })

  }

  answers() {
    //so correct answer is not the last answer
    let allAnswers = [];
    //put the 2[] together     
    allAnswers = allAnswers.concat(Data[this.state.trackQuestion].incorrect)
    allAnswers.push(Data[this.state.trackQuestion].correct);
    //sort the answers so correct answer is not last .sort
    return (allAnswers).sort();
  }

  render() {
    return (<div className = "App" >
      {/* gets data from data.json */}
      <h2 > { Data[this.state.trackQuestion].question}</h2> 
        
        <div className = "quiz">

          <form onSubmit = { this.submit } id = "questions">
            {/* set up the radio buttons */}
            <input type="radio" id = "0" name="answer" value={this.answers()[0]} onClick={this.handleInputChange}required></input><label
            for="answer0" > {this.answers()[0]} </label><br/ >
            <input type="radio" id = "1" name="answer" value={this.answers()[1]} onClick={this.handleInputChange}required></input><label
            for="answer1" > {this.answers()[1]}</label><br/ >
            <input type="radio" id ="2" name="answer" value={this.answers()[2]} onClick={this.handleInputChange}required></input><label
            for="answer2"> {this.answers()[2]}</label><br/ >
            <input type="radio" id = "3"name="answer" value = {this.answers()[3]} onClick={this.handleInputChange}required></input><label
            for="answer3"> {this.answers()[3]}</label><br/ >
            {/* submit button */}
            <button className="Submit" type="submit"> Submit </button>< br/ >

          </form>
          {/* next button */}
          <button onClick = {this.next}>Next</button>

        </div>      
      </div>

    );
  }
}


export default App;