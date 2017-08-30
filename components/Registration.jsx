import React from 'react'
import {b64, b64d} from '../lib/u2f'
import Code from './Code.jsx'
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

  RegistrationData() {
    if (!this.props.parsedResponse) {
      return false
    }
    return(
      <div>
        <dl className="row">
          <dt className="col-sm-2">KeyHandle</dt>
          <dd className="col-sm-10"><code>{this.props.parsedResponse.keyHandle}</code></dd>
          <dt className="col-sm-2">Public Key</dt>
          <dd className="col-sm-10"><code>{this.props.parsedResponse.publicKey}</code></dd>
        </dl>
        <dl className="row">
          <dt className="col-sm-3">Certificate</dt>
          <dd className="col-sm-9">
            <dl className="row">
              <dt className="col-sm-3">Issuer</dt>
              <dd className="col-sm-9"> {this.props.parsedResponse.certificate.issuer} </dd>
              <dt className="col-sm-3">Subject</dt>
              <dd className="col-sm-9"> {this.props.parsedResponse.certificate.subject} </dd>
              <dt className="col-sm-3">Serial</dt>
              <dd className="col-sm-9"> {this.props.parsedResponse.certificate.serial} </dd>
              <dt className="col-sm-3">Valid After:</dt>
              <dd className="col-sm-9"> {this.props.parsedResponse.certificate.validityNotBefore} </dd>
              <dt className="col-sm-3">Valid Before</dt>
              <dd className="col-sm-9"> {this.props.parsedResponse.certificate.validityNotAfter} </dd>
            </dl>
          </dd>
        </dl>
      </div>
    )
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
        <Code output={JSON.stringify(this.props.response, null, 2)}/>
        <h4>clientData Decoded</h4>
        <p>A simple base64 decode resulting in a JSON string</p>
        <Code output={JSON.stringify(JSON.parse(b64d(this.props.response.clientData)), null, 2)}/>
        <h4>registrationData Decoded</h4>
        <p>Decode detailed <a href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html#registration-response-message-success">here</a></p>
        {this.RegistrationData()}
      </div>
    )
  }


  render() {
    return (
      <div>
        <div className="content">
          <h2>Registration</h2>
          <div>Insert your U2F key and click 'Register'</div>
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
        {this.Output()}
        <h4>Sample JS for Request</h4>
        <Code output={this.SampleRequest()}/>
      </div>)
  }
}
