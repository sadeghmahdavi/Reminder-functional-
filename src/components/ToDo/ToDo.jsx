import React, { Component } from 'react'
import "./ToDo.css"

export default class ToDo extends Component {
  render() {
    return (
      <div className='Reminder'>
        <input type="checkbox" id='reminder' onClick={this.props.click}/>
        <label for='reminder'>{this.props.task}</label>
      </div>
    )
  }
}
