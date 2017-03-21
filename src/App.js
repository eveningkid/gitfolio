import React from 'react'
import {connect} from 'react-redux'

import WelcomeForm from './components/WelcomeForm'
import UserCard from './components/UserCard'
import Phrase from './components/Phrase'
import PopularRepo from './components/PopularRepo'
import RepoSlider from './components/RepoSlider'
import ReachMe from './components/ReachMe'
import LanguagesList from './components/LanguagesList'
import PersonalPhrase from './components/PersonalPhrase'
import {getDaysDifference} from './utils'

import './App.scss'

const mapStateToProps = (state) => {
  return {
    user: state.user,
  }
}

const App = ({user}) => {
  if (!user.login) {
    return <WelcomeForm />
  }

  const numberOfDaysSinceRegistering = getDaysDifference(user.created_at, user.updated_at)

  return (
    <div className="App">
      <UserCard />

      <Phrase
        text={
          `Registered since **${numberOfDaysSinceRegistering} days** on github,<br />` +
          `more than **${user.public_repos - 1} repositories**. Deal with it.`
        }
      />

      <PopularRepo />

      <PersonalPhrase />

      <RepoSlider />

      <LanguagesList />

      <ReachMe />
    </div>
  )
}

export default connect(mapStateToProps)(App)
