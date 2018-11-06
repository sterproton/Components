import React, { PureComponent } from 'react'
import './Options.scss'

export default class OptionContainer extends PureComponent {
  handleClick = optionText => () => {
    console.log('click option', optionText)
    this.props.onSelectOption(optionText)
  }

  handleEnter = optionText => (e) => {
    if (e.target.key === 'enter') {
      this.props.onSelectOption(optionText)
    }
  }

  render() {
    const { matchedOptions, onSelectOption, isCollapse } = this.props
    if (isCollapse) {
      return null
    }
    return (
      <div className="option-container">
        <ul>
          {matchedOptions.map(item => (
            <li
              onMouseDown={this.handleClick(item)}
              onKeyDown={this.handleEnter}
              key={item}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
}
