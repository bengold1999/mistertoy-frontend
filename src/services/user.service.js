import axios from 'axios'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'

const BASE_URL = 'auth/'
const STORAGE_KEY_LOGGEDIN = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getById,
    getLoggedinUser,
    updateScore,
    getEmptyCredentials,
    getUsers,
    remove
}
function remove(userId) {
    return httpService.delete(`user/${userId}`)
}
function getUsers() {
    // return storageService.query('user')
    return httpService.get(`user`)
}
function login({ username, password }) {

    return httpService.post(BASE_URL + 'login', { username, password })
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid login')
        })
}

function signup({ username, password, fullname }) {
    const user = { username, password, fullname, score: 10000 }
    return httpService.post(BASE_URL + 'signup', user)
        .then(user => {
            if (user) return _setLoggedinUser(user)
            else return Promise.reject('Invalid signup')
        })
}


function logout() {
    return httpService.post(BASE_URL + 'logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN)
        })
}


function updateScore(diff) {
    let user = getLoggedinUser()

    if (user.score + diff < 0) return Promise.reject('No credit')
    user.score = getLoggedinUser().score + diff
    return httpService.put(`user/${user._id}`, user)
        .then(user => {
            _setLoggedinUser(user)
            return user.score
        })
}



function getById(userId) {
    return httpService.get('user/' + userId)
}


function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN))
}

function _setLoggedinUser(user) {
    const userToSave = { _id: user._id, fullname: user.fullname, username: user.username, isAdmin: user.isAdmin, createdAt: user.createdAt, score: user.score }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN, JSON.stringify(userToSave))
    return userToSave
}


function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}


// Test Data
// userService.signup({username: 'bobo', password: 'bobo', fullname: 'Bobo McPopo'})
// userService.login({username: 'bobo', password: 'bobo'})



