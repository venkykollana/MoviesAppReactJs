import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onSubmitSuccess = requestToken => {
    Cookies.set('request_token', requestToken, {expires: 1})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onsubmitForm = async event => {
    event.preventDefault()
    const requestTokenUrl =
      'https://api.themoviedb.org/3/authentication/token/new?api_key=12bc7a61a4e0b573539da286534a13a1'
    const responseToken = await fetch(requestTokenUrl)
    const dataToken = await responseToken.json()
    const requestToken = dataToken.request_token
    const {username, password} = this.state

    const userDetails = {username, password, request_token: requestToken}
    // console.log(userDetails)
    const url =
      'https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=12bc7a61a4e0b573539da286534a13a1'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
      headers: {
        'Content-type': 'application/json',
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    // console.log(response)
    //  console.log(data)
    if (response.ok === true) {
      this.onSubmitSuccess(data.request_token)
    } else {
      this.onSubmitFailure(data.status_message)
    }
  }

  renderPassword = () => {
    const {password} = this.state

    return (
      <div className="movies-app-login-input-container">
        <label className="movies-app-login-page-label" htmlFor="password">
          PASSWORD
        </label>
        <input
          id="password"
          className="movies-app-login-page-input"
          type="password"
          value={password}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  renderUsername = () => {
    const {username} = this.state

    return (
      <div className="movies-app-login-input-container">
        <label className="movies-app-login-page-label" htmlFor="username">
          USERNAME
        </label>
        <input
          id="username"
          className="movies-app-login-page-input"
          type="text"
          value={username}
          onChange={this.onChangeUsername}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    return (
      <div className="movies-app-login-page-background">
        <div>
          <img
            src="https://res.cloudinary.com/dyhda963d/image/upload/v1626156986/movies_qznojr.png"
            alt="movie-logo"
            className="movie-logo"
          />
        </div>
        <form
          className="movies-app-login-form-container"
          onSubmit={this.onsubmitForm}
        >
          <h1 className="movies-app-login-page-sign-heading">Sign in</h1>
          {this.renderUsername()}
          {this.renderPassword()}

          {showErrorMsg && <p className="error-msg">{errorMsg}</p>}

          <button type="submit" className="movies-app-login-page-signin-button">
            Sign in
          </button>
        </form>
      </div>
    )
  }
}

export default Login
