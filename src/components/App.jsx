import React, { Component } from 'react'
import '../assets/scss/global.scss'
import SuggestInput from './SuggestInput'

export default class App extends Component {
  render() {
    return (
      <div className="app"><SuggestInput options={['c', 'c++', 'java', 'python', 'c#']} /></div>
    )
  }
}
