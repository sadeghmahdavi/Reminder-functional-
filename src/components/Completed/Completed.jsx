import React, { Component } from 'react'
import "./completed.css"

export default class Completed extends Component {
  render() {
    return (
      <div className='complete' onClick={this.props.click}>{this.props.task}</div>
    )
  }
}
