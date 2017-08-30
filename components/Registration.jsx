import React from 'react'
import {b64, b64d} from '../lib/u2f'
import Code from './Code.jsx'
import JSONList from './JSONList.jsx'
import styles from '../assets/layout.css'

export default class Registration extends React.Component {

  prettyRawResponse() {
    if (!this.props.response) {
      return ''
    } else {
      return JSON.stringify(this.props.response, null, 4)
    }
  }

  SampleRequest() {
    return (`let registerRequest = {
  challenge: '${this.props.challenge}',
  version: 'U2F_V2'
}
u2f.register(${this.props.appId}, [registerRequest], [],
  (response) => {
    console.log("Send 'response' to the server")
  }
)`)
  }

  Button() {
    if (this.props.timeout && this.props.timeout > 0) {
      return (
        <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": this.props.timeout + "%"}}></div> </div>)
    } else {
      return <button onClick={this.props.onRegister} > Register </button>
    }
  }

  Output() {
    if (!this.props.parsedResponse) { return false }
    return (
      <div>
        <h4>Response</h4>
        <Code output={JSON.stringify(this.props.response, null, 2)} />
        <h4>registrationData Decoded</h4>
        <p><small>Decode detailed <a href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html#registration-response-message-success">here (fidoalliance.org)</a></small></p>
        <JSONList data={this.props.parsedResponse}/>
        <h4>clientData Decoded</h4>
        <JSONList data={JSON.parse(b64d(this.props.response.clientData))} />
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="content">
          <h2>Registration</h2>
          <ol>
            <li>Insert your U2F key</li>
            <li>Click 'Register'</li>
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
            {this.Button()}
          </form>
        </div>
        <h4>Sample JS for Request</h4>
        <Code output={this.SampleRequest()} />
        {this.Output()}
      </div>)
  }
}
