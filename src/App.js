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

class MoneyWon extends React.Component {
  render() {
    return (
      Object.keys(questions).map(el => {
        return (
          <div
            key={questions[el].money + ' ' + this.props.i}
            className={ questions[el].money <= this.props.money ? 'won' : questions[el].money === this.props.money * 2 ? 'current' : ''}
          >
            $ { questions[el].money }
          </div>
        )
      })
    )
  }
}

const form = React.createRef()

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      i: 1,
      end: false,
      money: 0
    };
    this.methods = {
      checkAnswer: (e) => {
        e.preventDefault()

        let result = false;
        Object.keys(form.current).forEach(el => {
          if (form.current[el].checked
            && form.current[el].value === questions[this.state.i].answer) {
            result =  true
          }
        })
        if (result) {
          this.setState((state) => {
            return {
              i: state.i + 1,
              money: state.money ? state.money * 2 : 500
            }
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
    return (
      <div className="App">
        { this.state.end
          ?
            <div> Game over </div>
          :
          <div className="Game">
            <Question
              key={this.state.i}
              i={this.state.i}
            />
            <form
              ref={form}
              onSubmit={this.methods.checkAnswer}
            >
              <Answers i={this.state.i} />
              <input
                type={"submit"}
                value={"submit"}
              />
            </form>
            <div className="MoneyWon_container">
              <MoneyWon
                key={this.state.i}
                money={this.state.money || 250}
              />
            </div>
          </div>
        }
      </div>
    )
  }
}

export default App;
