import React from 'react'
import CopyToClipboard from 'react-copy-to-clipboard'
import ReactDOMServer from 'react-dom/server'
import classNames from 'classnames'
import {
  connect,
  Provider,
} from 'react-redux'

import {
  editSession,
  editUser,
} from './actions'

import App from './App'
import './GenerateCode.scss'

const mapStateToProps = (state) => {
  return {
    session: state.session,
    user: state.user,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editSession: (session) => dispatch(editSession(session)),
    editUser: (user) => dispatch(editUser(user)),
  }
}

const GenerateCode = React.createClass({
  getInitialState() {
    return {
      generatedCode: null,
    }
  },

  setIsGenerating(value) {
    const {editSession, session} = this.props

    editSession({
      ...session,
      isGenerating: value,
    })
  },

  generateCode(e) {
    this.setIsGenerating(true)

    const appGeneratedCode = ReactDOMServer.renderToStaticMarkup(
      <Provider store={this.props.store}>
        <App />
      </Provider>
    )

    const generatedCode =`<!doctype html>
<html>
  <head>
    <title>Portfolio</title>
    <meta charset="utf-8" />
    <link rel="stylesheet" href="https://gitfolio-f2c18.firebaseapp.com/static/css/all.min.css" />
  </head>

  <body>
    ${appGeneratedCode}
  </body>
</html>
    `

    this.setState({generatedCode})

    this.setIsGenerating(false)
  },

  copied() {
    const setCopied = (copied = true) => this.setState({
      copied,
      generatedCode: '',
    })

    setCopied()
    setTimeout(() => setCopied(false), 2000)
  },

  tryOtherLogin() {
    this.props.editUser({
      ...this.props.user,
      login: '',
    })
  },

  toggleEditMode() {
    this.props.editSession({
      ...this.props.session,
      isGenerating: !this.props.session.isGenerating,
    })
  },

  render() {
    const {
      copied,
      generatedCode,
    } = this.state

    const {
      session,
      user,
    } = this.props

    return (
      <div
        className={classNames(
          'GenerateCode',
          {'hidden': !user.login},
        )}
      >
        <button onClick={this.tryOtherLogin}>
          Try with another login
        </button>

        <button onClick={this.toggleEditMode}>
          {session.isGenerating ? (
            <span className="important">
              Preview
            </span>
          ) : 'Preview'}
        </button>

        <button onClick={this.generateCode}>
          Generate static code
        </button>

        {copied ? (
          <span className="important success">
            Copied!
          </span>
        ) : null}

        {generatedCode ? (
          <CopyToClipboard text={generatedCode} onCopy={this.copied}>
            <button className="important">
              Copy to clipboard last generated code
            </button>
          </CopyToClipboard>
        ) : null}
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(GenerateCode)
