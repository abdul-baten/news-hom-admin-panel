import db from '@/plugins/firebase/init'

const state = {
  sortable: [],
  city: [],
  cityResult: [],
  cities: [],
  cityNames: []
}

const getters = {
  getCitiesNames (state) {
    return state.cities
  },
  getAllCityNames (state) {
    const uniqueCityNames = state.cityNames.sort()
    return [...new Set(uniqueCityNames)]
  }
}

const mutations = {}

const actions = {
  getAllCitiesNames ({
    commit
  }) {
    db.collection('news')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(element => {
          let data = element.data().city
          state.city.push(data)
        })
      })
      .then(() => {
        let count = {}
        state.city.forEach(item => {
          if (!count.hasOwnProperty(item)) {
            count[item] = 1
          } else {
            count[item] += 1
          }
        })
        state.cityResult.push({
          cityName: count
        })
        for (let cityData in state.cityResult[0].cityName) {
          state.sortable.push([
            cityData,
            state.cityResult[0].cityName[cityData]
          ])
        }
        for (let i = 0; i < state.sortable.length; ++i) {
          state.cities.push(state.sortable[i][0])
        }
      })
  },
  onCityNamesLoaded ({
    commit
  }, countryChanged) {
    let changedShortCode
    state.cityNames.splice(0, state.cityNames.length)
    if (countryChanged) {
      changedShortCode = countryChanged
      db
        .collection('locations').doc(changedShortCode).get().then((cityName) => {
          let city = cityName.data().cities
          city.forEach(item => {
            state.cityNames.push(item)
          })
        })
    } else {
      db.collection('locations').get().then(querySnapShot => {
        querySnapShot.forEach(cityName => {
          let city = cityName.data().cities
          city.forEach(item => {
            state.cityNames.push(item)
          })
        })
      })
    }
  },
  onLoadedCityNamesCleared () {
    state.cityNames.splice(0, state.cityNames.length)
    state.cityNames = []
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
