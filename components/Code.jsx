import React from 'react'
import styles from '../assets/code.css'

const Code = ({output}) => {
  return (
    <div>
      <pre><code>{output}</code></pre>
    </div>
  )
}

export default Code
