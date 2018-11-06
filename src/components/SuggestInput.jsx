import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Options from './Options'
import './SuggestInput.scss'

const matchWithStrict = (target, isStrict) => (str) => {
  if (!isStrict) {
    str = str.toLowerCase()
    target = target.toLowerCase()
  }
  let isMatched = true
  for (let i = 0; i < target.length; i += 1) {
    if (str[i] !== target[i]) {
      isMatched = false
      break
    }
  }
  return isMatched
}


export default class SuggestInput extends Component {
  static propTypes = {
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
  }

  static defaultProps = {
    placeholder: 'type',
  }

  state = {
    inputValue: '',
    matchedOptions: [],
    isCollapse: true,
  }

  inputRef = React.createRef()

  componentDidMount() {
    this.inputRef.current.addEventListener('focus', this.handleInputFocus)
    this.inputRef.current.addEventListener('blur', this.handleInputBlur)
  }

  componentWillUnmount() {
    this.inputRef.current.removeEventListener('focus', this.handleInputFocus)
    this.inputRef.current.removeEventListener('blur', this.handleInputBlur)
  }

  handleInputFocus = () => {
    this.setState({
      isCollapse: false,
    })
  }

  handleInputBlur = () => {
    this.setState({
      isCollapse: true,
    })
  }

  onChange = (e) => {
    const value = e.target.value
    const isCollapse = value.length === 0
    this.setState(() => ({
      inputValue: value,
      matchedOptions: this.props.options.filter(matchWithStrict(value, false)),
      isCollapse,
    }))
  }

  onSelectOption = (text) => {
    this.setState({
      isCollapse: true,
      inputValue: text,
      matchedOptions: this.props.options.filter(matchWithStrict(text, false)),
    })
  }


  render() {
    return (
      <div className="suggestInput">
        <input type="text" placeholder={this.props.placeholder} ref={this.inputRef} value={this.state.inputValue} onChange={this.onChange} />
        <Options
          onSelectOption={this.onSelectOption}
          matchedOptions={this.state.matchedOptions}
          isCollapse={this.state.isCollapse}
        />
      </div>
    )
  }
}
