import React from 'react'
import * as u2fUtils from '../lib/u2f'
import Registration from './Registration.jsx'
import Signing from './Signing.jsx'
import styles from '../assets/layout.css'

const appId = document.location.protocol + '//' + document.location.host

let timeoutFn = null

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      timeout: 0,
      mode: 1,
      registration: {
        appId,
        challenge: 'RegisterChallenge',
        regResponse: null,
        parsedResponse: null,
      },
      signing: {
        appId,
        keyHandle: '',
        challenge: 'SigningChallenge',
      }
    }
    this.onRegister = this.onRegister.bind(this)
    this.onSign = this.onSign.bind(this)
    this.updateRegState = this.updateRegState.bind(this)
    this.updateSigningState = this.updateSigningState.bind(this)
    this.onModeChange = this.onModeChange.bind(this)
  }

  componentDidMount() {
  }

  startTimeout(start, total) {
    if (this.state.timeout === 0) {
      this.setState({timeout: 100})
    }
    timeoutFn = setTimeout(()=>{
      let left = total - (Date.now() - start)
      let percent = Math.floor((left / total) * 100)
      if (percent > 0) {
        this.setState({timeout: percent})
        this.startTimeout(start, total)
      } else {
        this.setState({timeout: 0})
      }
    }, 1000)
  }

  stopTimeout() {
    this.setState({timeout: 0})
    clearTimeout(timeoutFn)
  }

  onModeChange({target}) {
    console.log(target)
    if (target.name === 'sig') {
      this.setState({mode: 2})
    } else {
      this.setState({mode: 1})
    }
  }

  updateRegState({target}) {
    const {name, value} = target
    let registration = Object.assign({}, this.state.registration)
    registration[name] = value
    return this.setState({registration})
  }

  updateSigningState({target}) {
    const {name, value} = target
    let signing = Object.assign({}, this.state.signing)
    signing[name] = value
    return this.setState({signing})
  }

  onRegister(e) {
    e.preventDefault()
    console.log('Start Registration')
    this.startTimeout(Date.now(), 30000)
    let registerRequest = {
      challenge: this.state.registration.challenge,
      version: 'U2F_V2'
    }
    u2f.register(appId, [registerRequest], [],
      (deviceResponse) => {
        this.stopTimeout()
        let registration = Object.assign({}, this.state.registration)
        if (deviceResponse.errorCode) {
          console.log("ErrorCode:", deviceResponse.errorCode)
          registration['errorCode'] = deviceResponse.errorCode
          this.setState({registration})
          return
        }
        console.log('Response')
        console.log(deviceResponse)
        console.log(u2fUtils.parseRegistration(deviceResponse))
        let parsedResponse = u2fUtils.parseRegistration(deviceResponse)
        registration['response'] = deviceResponse
        registration['parsedResponse'] = parsedResponse
        this.setState({registration})
        let signing = Object.assign({}, this.state.signing)
        signing['keyHandle'] = parsedResponse.keyHandle
        this.setState({signing})
      }, 30
    )
  }

  onSign(e) {
    e.preventDefault()
    console.log('Start Signing')
    this.startTimeout(Date.now(), 30000)
    let registeredKey = {
      keyHandle: this.state.signing.keyHandle,
      version: 'U2F_V2'
    }
    u2f.sign(appId, this.state.signing.challenge, [registeredKey],
      (deviceResponse) => {
        this.stopTimeout()
        let signing = Object.assign({}, this.state.signing)
        if (deviceResponse.errorCode) {
          console.log("ErrorCode:", deviceResponse.errorCode)
          signing['errorCode'] = deviceResponse.errorCode
          this.setState({signing})
          return
        }
        console.log('Response')
        console.log(deviceResponse)
        console.log(u2fUtils.parseSignature(deviceResponse))
        let parsedResponse = u2fUtils.parseSignature(deviceResponse)
        signing['response'] = deviceResponse
        signing['parsedResponse'] = parsedResponse
        this.setState({signing})
      }, 30
    )
  }

  renderMode(){
    if (this.state.mode === 1) {
      return(
        <Registration
          {...this.state.registration}
          timeout={this.state.timeout}
          onUpdate={this.updateRegState}
          onRegister={this.onRegister}
        />
      )
    } else {
      return(
        <Signing
          {...this.state.signing}
          timeout={this.state.timeout}
          onUpdate={this.updateSigningState}
          onSign={this.onSign}
        />
      )
    }
  }

  render() {
    return (
      <div>
        <h1>U2F Debugger</h1>
        <div className="btn-group" data-toggle="buttons">
          <label className={"btn btn-secondary " + (1 === this.state.mode ? 'active' : '') }>
            <input type="checkbox" name="reg" onChange={this.onModeChange} autoComplete="off"/> Registration
          </label>
          <label className={"btn btn-secondary " + (2 === this.state.mode ? 'active' : '') }>
            <input type="checkbox" name="sig" onChange={this.onModeChange} autoComplete="off"/> Signing
          </label>
        </div>
        {this.renderMode()}
      </div>)
  }
}
