import db from '@/plugins/firebase/init'

const state = {
  sortable: [],
  country: [],
  countryResult: [],
  countries: [],
  countryNames: []
}

const getters = {
  getCountriesNames (state) {
    return state.countries
  },
  getAllCountryNames (state) {
    const uniqueCountryNames = state.countryNames.sort()
    return [...new Set(uniqueCountryNames)]
  }
}

const mutations = {}

const actions = {
  getAllCountriesNames ({ commit }) {
    db.collection('news')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(element => {
          let data = element.data().country
          state.country.push(data)
        })
      })
      .then(() => {
        let count = {}
        state.country.forEach(item => {
          if (!count.hasOwnProperty(item)) {
            count[item] = 1
          } else {
            count[item] += 1
          }
        })
        state.countryResult.push({ countryName: count })
        for (let countryData in state.countryResult[0].countryName) {
          state.sortable.push([
            countryData,
            state.countryResult[0].countryName[countryData]
          ])
        }
        for (let i = 0; i < state.sortable.length; ++i) {
          state.countries.push(state.sortable[i][0])
        }
      })
  },
  onColuntryNamesLoaded () {
    db.collection('locations')
      .get()
      .then(querySnapShot => {
        querySnapShot.forEach(location => {
          let countryName = location.id
          state.countryNames.push(countryName)
        })
      })
  },
  onLoadedCountryNamesCleared () {
    state.countryNames.splice(0, state.countryNames.length)
    state.countryNames = []
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}
