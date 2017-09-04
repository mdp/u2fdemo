import React from 'react'

const readme = require("html-loader!markdown-loader!../README.md")

const About = () => {
  return (
      <span dangerouslySetInnerHTML={{__html: readme}}/>
  )
}

export default About


