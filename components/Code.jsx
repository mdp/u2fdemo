import React from 'react'
import styles from '../assets/code.css'

export default class Console extends React.Component {

  render() {
    return (
      <div>
        <pre><code>{this.props.output}</code></pre>
      </div>
    )
  }
}
