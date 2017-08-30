import React from 'react'
import Code from './Code.jsx'
import {b64, b64d} from '../lib/u2f'
import JSONList from './JSONList.jsx'

const errorCodes = {
  2: 'Bad Request',
  4: 'Unknown Key Handle',
  5: 'Timeout'
}

export default class Signing extends React.Component {

  prettyRawResponse() {
    if (this.props.parsedResponse) {
      return JSON.stringify(this.props.parsedResponse, null, 4)
    }
  }

  // Scroll down to the results when they change
  componentDidUpdate(prevProps) {
    if (this.refs['sigResult']) {
      if (!prevProps.response || prevProps.response.signatureData !== this.props.response.signatureData){
        this.refs['sigResult'].scrollIntoView({block: 'end', behavior: 'smooth'})
      }
    }
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

  Result() {
    if (this.props.response && this.props.response.errorCode) {
      let errorCode = this.props.response.errorCode
      return (
        <div>
          <h4 ref={'sigResult'}>Response</h4>
          <Code output={JSON.stringify(this.props.response, null, 2)} />
          <h4>Error</h4>
          <p>ErrorCode: {errorCode}
            {errorCodes[errorCode] ? ` - ${errorCodes[errorCode]}` : ''}
          </p>
        </div>
      )
    } else if (this.props.response) {
      return (
        <div>
          <h4 ref={'sigResult'}>Response</h4>
          <Code output={JSON.stringify(this.props.response, null, 2)} />
          <h4>Response Decoded</h4>
          <h5><var>signatureData</var></h5>
          <div className="card">
            <JSONList data={this.props.parsedResponse}/>
            <p><small>Decode details can be found at <a target='_blank' href="https://fidoalliance.org/specs/fido-u2f-v1.0-nfc-bt-amendment-20150514/fido-u2f-raw-message-formats.html">fidoalliance.org</a></small></p>
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
        <h2>Signing</h2>
        <ol>
          <li>Enter a "KeyHandle" or, if you don't have one, go back to "Registration" and generate one</li>
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
        {this.Result()}
      </div>)
  }

  // Place this at the bottom since it breaks my code highlighter
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

}
