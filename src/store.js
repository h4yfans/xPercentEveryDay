import Vue from 'vue'
import VueResource from 'vue-resource'
import Vuex from 'vuex'
import moment from 'moment'
import db from '@/firebase/init'


Vue.use(Vuex)
Vue.use(VueResource)

const state = {
  days: [],
  from: new Date(),
  to: new Date(),
  percent: null,
  balance: null,
  USDValue: null,
};


const actions = {
  setPercent({commit}, percent) {
    commit('SET_PERCENT', percent)
  },
  setBalance({commit}, balance) {
    balance = balance.replace(/,/g, '.');
    commit('SET_BALANCE', balance)
  },
  setTo({commit}, to) {
    commit('SET_TO', to)
  },
  setFrom({commit}, from) {
    commit('SET_FROM', from)
  },
  setDays({commit}, payload) {
    commit('SET_DAYS', payload)
  },
  calculateBalanceDateBTC({commit}) {
    Vue.http.get('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(data => {
        commit('CALCULATE_BALANCE_DATE_BTC', data.body.bpi.USD.rate_float)
      })
      .catch(err => console.log(err))
  },
  saveToFirebase({commit, state}) {
    if (state.percent && state.balance) {
      db.collection('dates').add({
        from: state.from,
        to: state.to,
        percent: state.percent,
        balance: state.balance
      }).then(() => {
        M.toast({html: 'Saved', classes: 'rounded', displayLength: '1000'});
      }).catch(err => {
        console.log(err)
      })
    } else {
      M.toast({html: 'Enter a value', classes: 'rounded', displayLength: '1000'})
    }

  },
  clearInfos({commit}) {
    commit('CLEAR_INFOS');
  }
};

const mutations = {
  "SET_PERCENT"(state, percent) {
    state.percent = percent
  },
  "SET_BALANCE"(state, balance) {
    state.balance = balance
  },
  "SET_TO"(state, to) {
    state.to = to;
  },
  "SET_FROM"(state, from) {
    state.from = from
  },
  'SET_DAYS'(state, payload) {
    state.days.push({
      date: payload.date,
      balance: payload.balance.toFixed(4)
    })
  },
  'CALCULATE_BALANCE_DATE_BTC'(state, USDValue) {
    let to = moment(state.to);
    let from = moment(state.from);
    let balance = state.balance;
    let percent = state.percent;
    let diffDays = to.diff(from, 'days') + 1;

    let processedBalance = Number(balance);
    let processedDate = null;
    state.USDValue = USDValue;
    state.days = [];

    for (let i = 0; i < diffDays; i++) {
      processedBalance += (processedBalance / 100) * percent;
      processedDate = moment(from).add(i, 'days');
      state.days.push({
        date: processedDate,
        balance: processedBalance.toFixed(4)
      })
    }
  },
  'CLEAR_INFOS'(state) {
    state.days = []
    state.from = new Date()
    state.to = new Date()
    state.percent = null
    state.balance = null
    state.USDValue = null
  }
};

const getters = {
  getPercent: state => {
    return state.percent;
  },
  getBalance: state => {
    return state.balance;
  },
  getTo: state => {
    return state.to;
  },
  getFrom: state => {
    return state.from;
  },
  getDays: state => {
    return state.days
  },
  getUSDValue: state => {
    return state.USDValue
  }
};


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
