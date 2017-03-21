import moment from 'moment'
import n from 'num-ber'
import request from 'request'

const _getUserRepos = (login, repos = [], page = 1, user = {}, errorCb, successCb) => {
  request(`https://api.github.com/users/${login}/repos?type=owner&sort=pushed&page=${page}`, (error, response, body) => {
    if (error) {
      return console.error(error)
    }

    if (response.statusCode !== 200) {
      return errorCb(response.statusCode)
    }

    const newRepos = JSON.parse(body)
    repos = repos.concat(newRepos)

    if (newRepos.length === 30) {
      // This means there's more!
      _getUserRepos(login, repos, page + 1, user, errorCb, successCb)
    } else {
      successCb(user, repos)
    }
  })
}

/**
 * Init the entire app, after retrieving a github's profile data.
 * @param {String} login - Github login
 * @param {Function} errorCb - callback if it didn't work
 * @param {Function} successCb - callback if it worked
 */
export const getProfile = (login = 'eveningkid', errorCb, successCb) => {
  request(`https://api.github.com/users/${login}`, (error, response, body) => {
    if (error) {
      return console.error(error)
    }

    if (response.statusCode !== 200) {
      return errorCb(response.statusCode)
    }

    const user = JSON.parse(body)
    _getUserRepos(login, [], 1, user, errorCb, successCb)
  })
}

/**
 * Return the repos sorted by their star count.
 * @param {Object[]} repos - Repos list
 * @return {Object} Sorted repos
 */
export const getMostPopularRepos = function (repos) {
  return repos.length && repos.sort((a, b) => {
    if (b.stargazers_count === a.stargazers_count && b.name && a.name) {
      if (a.name < b.name) {
        return -1
      }

      if (a.name > b.name) {
        return 1
      }

      return 0
    }

    return b.stargazers_count - a.stargazers_count
  })
}

/**
 * Return the most popular repo from a list of repos.
 * @param {Object[]} repos - Repos list
 * @return {Object} Mots popular repo
 */
export const getMostPopularRepo = function (repos) {
  return getMostPopularRepos(repos)[0]
}

/**
 * From two Date objects, return the number of days apart.
 * @param {Date} from - Starting date
 * @param {Date} till - Ending date
 * @return {Number}
 */
export const getDaysDifference = function (from, till) {
  const dateA = moment(from)
  const dateB = moment(till)
  const difference = dateB.diff(dateA, 'days')

  if (difference.toFixed().length > 3) {
    return n.format(difference)
  }

  return difference
}

/**
 * Return a set of all languages which have been used among all the repos.
 * @param {Object[]} repos - Repos list
 * @return {Set} set of languages
 */
export const getLanguagesList = function (repos) {
  const map = new Map()

  repos
    .filter(repo => repo.language !== null)
    .forEach(repo => {
      const language = repo.language

      if (map.has(language)) {
        map.set(language, map.get(language) + 1)
      } else {
        map.set(language, 1)
      }
    })

  // This now contains every [language, appearances] couple,
  // ordered by appearances' value
  const orderedMap = [...map]
                      .sort((a, b) => b[1] - a[1])
                      .map(([language, value]) => language)

  return orderedMap.map((language) => {
    return {
      name: language,
      checked: true,
    }
  })
}
