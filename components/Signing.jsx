import React from 'react'
import Code from './Code.jsx'
import {b64, b64d} from '../lib/u2f'
import JSONList from './JSONList.jsx'

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
        <Code output={JSON.stringify(this.props.response, null, 2)} />
        <h4>signatureData Decoded</h4>
        <p><small>Decode detailed <a href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html#registration-response-message-success">here (fidoalliance.org)</a></small></p>
        <JSONList data={this.props.parsedResponse} />
        <h4>clientData Decoded</h4>
        <JSONList data={JSON.parse(b64d(this.props.response.clientData))} />
      </div>
    )
  }



  render() {
    return (
      <div>
        <h2>Signing</h2>
        <ol>
          <li>Enter a "KeyHandle" or, if you don't have on, go back to "Registration" to generate a new one</li>
          <li>Insert your U2F key</li>
          <li>Click 'Sign'</li>
          <li>Press the button on your U2F key</li>
        </ol>
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
        <Code output={this.SampleRequest()} />
        {this.Output()}
      </div>)
  }
}
