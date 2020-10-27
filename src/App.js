import React from 'react';
import './App.css';
import {default as questions } from './config.json'

class Question extends React.Component {
  render() {
    return (
      <p> {questions[this.props.i].question} </p>
    )
  }
}

class Answers extends React.Component {
  render() {
    return (
      Object.keys(questions[this.props.i]).slice(1, 5).map(el => {
        return (
          <label key={"question " + this.props.i + " answer " + el}>
            {el.toUpperCase()}:
            <input
              name="answer"
              type="radio"
              value={el}
            />
            {questions[this.props.i][el]}
          </label>
        )
      })
    )
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.methods = {
      checkAnswer: (e) => {
        e.preventDefault()

        let result = false;
        Object.keys(form.current).forEach(el => {
          if (form.current[el].checked
            && form.current[el].value === questions[this.props.i].answer) {
            result =  true
          }
        })
        if (result) {
          this.setState((state) => {
            return {i: state.i + 1}
          })
        } else {
          this.setState(() => {
            return {end: true}
          })
        }
      }
    }

  }
  render() {
    if (this.props.end) {

    } else {
      return (
        <div className="Game">
          <Question
            key={this.props.i}
            i={this.props.i}
          />
          <form
            ref={form}
            onSubmit={this.methods.checkAnswer}
          >
            <Answers i={this.props.i} />
            <input
              type={"submit"}
              value={"submit"}
            />
          </form>
        </div>
      )
    }
  }
}

const form = React.createRef()

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      i: 1,
      end: false
    };
  }

  render() {
    return (
      <div className="App">
        <Game
          i={this.state.i}
          end={this.state.end}
        />
      </div>
    )
  }
}

export default App;
