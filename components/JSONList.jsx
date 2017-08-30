import React from 'react'
import styles from '../assets/code.css'

// Prettyprint a JSON object into a nested list

function toCapitalizedWords(name) {
  var words = name.match(/[A-Za-z][a-z]*/g)

  return words.map(capitalize).join(" ")
}

function capitalize(word) {
  return word.charAt(0).toUpperCase() + word.substring(1)
}

function toList(data) {
  return Object.keys(data).map(function(key, keyIndex) {
    let item = data[key]
    if (key.indexOf('_') === 0) {
      return false
    }
    if (typeof item === 'object') {
      return (
        <div key={`sub${key}${keyIndex}`}>
          <li key={`${key}${keyIndex}`}><strong>{toCapitalizedWords(key)}:</strong></li>
          <ul>{toList(item)}</ul>
        </div>
      )
    } else {
      return (
        <li key={`${key}${keyIndex}`}><strong>{toCapitalizedWords(key)}:</strong> <code>{item}</code></li>
      )
    }
  })
}

const JSONList = ({data}) => {
  return (
    <ul style={{"listStyleType":"none"}}>
      {toList(data)}
    </ul>
  )
}

export default JSONList


