import { storageService } from './async-storage.service.js'
import { utilService } from './util.service.js'
import { userService } from './user.service.js'

const STORAGE_KEY = 'toyDB'

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
}
function query(filterBy = getDefaultFilter(), sortBy = getDefaultSort()) {

    return storageService.query(STORAGE_KEY)
        .then(toys => {
            let toysToShow = toys
            if (!filterBy.txt) filterBy.txt = ''
            if (!filterBy.inStock) filterBy.inStock = ''

            if (filterBy.inStock !== 'all') {
                toysToShow = toysToShow.filter((toy) => (filterBy.inStock === 'inStock' ? toy.inStock : !toy.inStock))
            }
            if (filterBy.labels && filterBy.labels.length) {
                toysToShow = toys.filter(toy =>
                    filterBy.labels.some(label => Array.isArray(toy.labels) && toy.labels.includes(label))
                )
            }
            const regExp = new RegExp(filterBy.txt, 'i')
            toysToShow = toysToShow.filter(toy => regExp.test(toy.name) && (filterBy.inStock ? toy.inStock : true))

            if (sortBy.type === 'createdAt') {
                toysToShow.sort((b1, b2) => (+sortBy.dir) * (b1.createdAt - b2.createdAt))
            } else if (sortBy.type === 'price') {
                toysToShow.sort((b1, b2) => (+sortBy.dir) * (b1.price - b2.price))
            } else if (sortBy.type === 'name') {
                toysToShow.sort((a, b) => sortBy.dir * a.name.localeCompare(b.name))
            }
            return toysToShow
        })
}

function getById(toyId) {
    return storageService.get(STORAGE_KEY, toyId)
}

function remove(toyId) {
    // return Promise.reject('Not now!')
    return storageService.remove(STORAGE_KEY, toyId)
}


function save(toy) {
    if (toy._id) {
        return storageService.put(STORAGE_KEY, toy)
    } else {
        // when switching to backend - remove the next line
        // toy.owner = userService.getLoggedinUser()
        return storageService.post(STORAGE_KEY, toy)
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
        inStock: true,
    }
}
function getEmptyRandomtoy() {
    return {
        name: utilService.makeLorem(2),
        price: 30,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
    }
}


function getDefaultFilter() {
    return { txt: '', labels: [], inStock: '' }
}
function getDefaultSort() {
    return { type: '', dir: 1 }
}
