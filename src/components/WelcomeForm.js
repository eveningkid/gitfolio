import React from 'react'
import {connect} from 'react-redux'
import classNames from 'classnames'

import {
  getLanguagesList,
  getMostPopularRepo,
  getProfile,
} from '../utils'

import {
  editSession,
  editUser,
} from '../actions'

import SafeLink from './utils/SafeLink'
import './WelcomeForm.scss'

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

const WelcomeForm = React.createClass({
  getInitialState() {
    return {
      errorCode: null,
      fetchingData: false,
      login: '',
    }
  },

  componentDidMount() {
    this.refs.login.focus()
  },

  handleLoginChange(e) {
    this.setState({login: e.target.value})
  },

  fetching() {
    this.setState({
      errorCode: null,
      fetchingData: true,
    })
  },

  loadProfile(e) {
    if (e) {
      e.preventDefault()
    }

    const {login} = this.state

    if (!login.length) {
      return
    }

    this.fetching()

    getProfile(login, (errorCode) => {
      this.setState({
        fetchingData: false,
        errorCode,
      })
    }, (user, repos) => {
      const userData = {
        ...user,
        repos,
      }

      this.props.editUser(userData)

      const mostPopularRepo = getMostPopularRepo(repos)
      const languagesList = getLanguagesList(repos)

      const session = {
        ...this.props.session,
        mostPopularRepo,
        languagesList,
      }

      this.props.editSession(session)

      window.scrollTo(0, 0)
    })
  },

  render () {
    const {
      errorCode,
      fetchingData,
    } = this.state

    return (
      <div
        className={classNames(
          'WelcomeForm',
        )}
      >
        <div
          className={classNames(
            'fetching',
            {'hidden': !fetchingData},
          )}
        >
          Gathering your data
        </div>

        <form
          onSubmit={this.loadProfile}
          className={classNames({'hidden': fetchingData})}
        >
          <SafeLink href="https://github.com/eveningkid/gitfolio" target="_blank">
            <div id="logo" />
          </SafeLink>

          <p>
            Quickly bootstrap your static portfolio,<br />
            only using your github data.
          </p>

          <input
            type="text"
            value={this.state.login}
            onChange={this.handleLoginChange}
            placeholder="Your github login"
            required
            ref='login'
          />

          <input
            type="submit"
            value="→"
            disabled={!this.state.login.length}
          />

          {errorCode ? (
            <div className="error">
              <small>
                An error occurred. Please verify you typed your login correctly
                or check <SafeLink href="https://status.github.com/" target="_blank">github status</SafeLink>. (code {errorCode})
              </small>
            </div>
          ) : null}
        </form>
      </div>
    )
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeForm)
