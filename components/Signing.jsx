import React from 'react'

export default class Signing extends React.Component {

  prettyRawResponse() {
    if (this.props.regResponse) {
      return JSON.stringify(this.props.regResponse, null, 4)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Registration</h1>
        <input type="text" value={this.props.appId} name="challenge" className="form-control" disabled="disabled"/>
        <input type="text" value={this.props.challenge} name="challenge" className="form-control" onChange={this.props.onUpdate}/>
        <button onClick={this.props.onRegister} > Register </button>
        <pre><code>{this.prettyRawResponse()}</code></pre>
      </div>)
  }
}
