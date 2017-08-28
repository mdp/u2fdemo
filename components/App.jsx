import React from 'react'
import * as u2fUtils from '../lib/u2f'
import Registration from './Registration.jsx'

const appId = document.location.protocol + '//' + document.location.host

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      registration: {
        appId,
        challenge: 'RegisterChallenge',
        regResponse: null,
        parsedResponse: null
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
  }

  componentDidMount() {
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

  onRegister() {
    console.log('Start Registration')
    let registerRequest = {
      challenge: this.state.registration.challenge,
      version: 'U2F_V2'
    }
    u2f.register(appId, [registerRequest], [],
      (deviceResponse) => {
        console.log('Response')
        console.log(deviceResponse)
        console.log(u2fUtils.parseRegistration(deviceResponse))
        let registration = Object.assign({}, this.state.registration)
        registration['response'] = deviceResponse
        registration['parsedResponse'] = u2fUtils.parseRegistration(deviceResponse)
        this.setState({registration})
      }, 30
    )
  }

  onSign() {
  }

  render() {
    return (
      <div>
        <h1>U2F</h1>
        <Registration
          {...this.state.registration}
          onUpdate={this.updateRegState}
          onRegister={this.onRegister}
        />
      </div>)
  }
}
