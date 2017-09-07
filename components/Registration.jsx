import React from 'react'
import {b64, b64d} from '../lib/u2f'
import Code from './Code.jsx'
import JSONList from './JSONList.jsx'
import styles from '../assets/layout.css'

const errorCodes = {
  2: 'Bad Request',
  5: 'Timeout'
}

export default class Registration extends React.Component {

  prettyRawResponse() {
    if (!this.props.response) {
      return ''
    } else {
      return JSON.stringify(this.props.response, null, 4)
    }
  }

  // Scroll down to the results when they change
  componentDidUpdate(prevProps) {
    if (this.refs['regResult']) {
      if (!prevProps.response || prevProps.response.registrationData !== this.props.response.registrationData){
        this.refs['regResult'].scrollIntoView({block: 'end', behavior: 'smooth'})
      }
    }
  }

  Button() {
    if (this.props.timeout && this.props.timeout > 0) {
      return (
        <div className="progress">
        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{"width": this.props.timeout + "%"}}></div> </div>)
    } else {
      return <button onClick={this.props.onRegister} className="btn btn-primary" > Register </button>
    }
  }

  Result() {
    // Error response
    if (this.props.response && this.props.response.errorCode) {
      let errorCode = this.props.response.errorCode
      return (
        <div>
          <h4 ref={'regResult'}>Response</h4>
          <Code output={JSON.stringify(this.props.response, null, 2)} />
          <h4>Error</h4>
          <p>ErrorCode: {errorCode}
            {errorCodes[errorCode] ? ` - ${errorCodes[errorCode]}` : ''}
          </p>
        </div>
      )
    } else if(this.props.response) {
      return (
        <div>
          <h4 ref={'regResult'}>Response</h4>
          <Code output={JSON.stringify(this.props.response, null, 2)} />
          <h4>Response Decoded</h4>
          <h5><var>registrationData</var></h5>
          <div className="card">
            <JSONList data={this.props.parsedResponse}/>
            <p>Signature signs the following data:
              <br />
              <code>0x00</code> |
              <code>sha256(<i>appId</i>)</code> |
              <code>sha256(<i>clientData</i>)</code> |
              <code><i>keyHandle</i></code> |
              <code><i>publicKey</i></code>
            </p>
            <p><small>Decode and signature details can be found at <a target='_blank' href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html">fidoalliance.org</a></small></p>
          </div>
          <h5><var>clientData</var></h5>
          <div className="card">
            <JSONList data={JSON.parse(b64d(this.props.response.clientData))} />
          </div>
        </div>
      )
    }
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
        <h4>Example JS for Request</h4>
        <Code output={this.SampleRequest()} />
        {this.Result()}
      </div>)
  }

  // Place this at the bottom since it breaks my code highlighter
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

}
