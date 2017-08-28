import React from 'react'

export default class Signing extends React.Component {

  prettyRawResponse() {
    if (this.props.signResponse) {
      return JSON.stringify(this.props.signResponse, null, 4)
    }
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <h1>Signing</h1>
        <input type="text" value={this.props.appId} name="appId" className="form-control" disabled="disabled"/>
        <input type="text" value={this.props.challenge} name="challenge" className="form-control" onChange={this.props.onUpdate}/>
        <input type="text" value={this.props.keyHandle} name="keyHandle" className="form-control" onChange={this.props.onUpdate}/>
        <button onClick={this.props.onSign} > Sign </button>
        <pre><code>{this.prettyRawResponse()}</code></pre>
      </div>)
  }
}
