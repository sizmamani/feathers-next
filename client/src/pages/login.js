import React, { Component } from 'react'
import withRedux from 'next-redux-wrapper'
import { initStore, login } from '../store'
import AuthForm from '../components/authForm'

class Login extends Component {

  state = {
    username: '',
    password: '',
    errorMessage: ''
  }

  handleOnChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    const { dispatch } = this.props
    const payload = {
      username: this.state.username,
      password: this.state.password
    }
    dispatch(login(payload))
      .catch(err => {
        console.log('Login failed: ', err)        
        this.setState({errorMessage: err.message})
      })
  }

  render () {
    const {username, password, errorMessage} = this.state;

    return (
      <div>
        Log in please:
        <AuthForm {...{username, password, errorMessage, onChange: this.handleOnChange, onSubmit: this.handleLoginSubmit}} />
      </div>
    )
  }
}

export default withRedux(initStore)(Login)
