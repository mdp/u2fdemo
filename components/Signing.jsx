import React from 'react'
import Code from './Code.jsx'

export default class Signing extends React.Component {

  prettyRawResponse() {
    if (this.props.parsedResponse) {
      return JSON.stringify(this.props.parsedResponse, null, 4)
    }
  }

  SampleRequest() {
    return (`let registeredKey = {
  keyHandle: '${this.props.keyHandle}',
  version: 'U2F_V2'
}
u2f.sign(${this.props.appId}, '${this.props.challenge}', [registeredKey], [],
  (response) => {
    console.log("Send 'response' to the server")
  }
)`)
  }

  Button() {
    if (!(this.props.keyHandle && this.props.keyHandle.length > 0)) {
      return false
    }
    if (this.props.timeout && this.props.timeout > 0) {
      return (
        <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": this.props.timeout + "%"}}></div> </div>)
    } else {
      return <button onClick={this.props.onSign} > Sign </button>
    }
  }

  Output() {
    if (!this.props.parsedResponse) { return false }
    return (
      <div>
        <h4>Raw Response</h4>
        <Code output={JSON.stringify(this.props.response, null, 2)}/>
        <h4>signatureData</h4>
        <p>Decode detailed <a href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html#authentication-response-message-success">here</a></p>
        <Code output={JSON.stringify(this.props.parsedResponse, null, 2)}/>
      </div>
    )
  }



  render() {
    return (
      <div>
        <h2>Signing</h2>
        <form>
          <div className="form-group">
            <label htmlFor="appId">AppId</label>
            <input type="text" value={this.props.appId} name="appId" className="form-control" disabled="disabled"/>
          </div>
          <div className="form-group">
            <label htmlFor="challenge">Challenge</label>
            <input type="text" value={this.props.challenge} name="challenge" className="form-control" onChange={this.props.onUpdate}/>
          </div>
          <div className="form-group">
            <label htmlFor="keyHandle">Key Handle</label>
            <input placeholder="Register or paste in a valid key handle" type="text" value={this.props.keyHandle} name="keyHandle" className="form-control" onChange={this.props.onUpdate}/>
          </div>
          {this.Button()}
        </form>
        <h4>Sample JS for Request</h4>
        <Code output={this.SampleRequest()}/>
        {this.Output()}
      </div>)
  }
}
