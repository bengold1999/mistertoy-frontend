import { utilService } from './util.service.js'
import { httpService } from './http.service.js'


const BASE_URL = 'toy/'


export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptytoy,
    getDefaultFilter,
    getEmptyRandomtoy,
    getLabels,
    getDefaultSort,
    saveMsg,
    getEmptyMsg,
    removeMsg

}
function query(filterBy, sortBy) {
    return httpService.get(BASE_URL, { params: { filterBy, sortBy } })
}

function getById(toyId) {
    return httpService.get(BASE_URL + toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return httpService.delete(BASE_URL + toyId)
}

function saveMsg(toyId, msg) {
    const url = `${BASE_URL}/${toyId}/msg`
    return httpService.post(url, msg)
}

function removeMsg(toyId, msg) {
    const url = `${BASE_URL}/${toyId}/msg/`
    console.log(msg)
    return httpService.delete(url + msg.id)
}
function getEmptyMsg() {
    return {
        msgs: [
            {
                txt: ''
            }
        ]
    }
}

function save(toy) {
    if (toy._id) {
        return httpService.put(BASE_URL + toy._id, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return httpService.post(BASE_URL, toy)
    }
}

function getLabels() {
    return ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
        'Outdoor', 'Battery Powered']
}
const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle',
    'Outdoor', 'Battery Powered']

function getEmptytoy() {
    return {
        name: '',
        price: 5,
        labels: [],
        createdAt: Date.now(),
        inStock: "true",
        img: utilService.getRandomImg()
    }
}
function getEmptyRandomtoy() {
    return {
        name: utilService.makeLorem(2),
        price: 30,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
        img: utilService.getRandomImg()
    }
}

function getDefaultFilter() {
    return { txt: '', labels: [], inStock: null }
}
function getDefaultSort() {
    return { type: '', dir: 1 }
}
