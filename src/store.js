import Vue from 'vue'
import Vuex from 'vuex'
import moment from 'moment'
import db from '@/firebase/init'

Vue.use(Vuex)

const state = {
  days: [
   /* {date: moment('2015-03-25T12:00:00Z').format('MMM Do'), balance: 1000},
    {date: moment('2015-03-26T12:00:00Z').format('MMM Do'), balance: 2000},
    {date: moment('2015-03-27T12:00:00Z').format('MMM Do'), balance: 3000},
    {date: moment('2015-03-28T12:00:00Z').format('MMM Do'), balance: 4000},
    {date: moment('2015-03-29T12:00:00Z').format('MMM Do'), balance: 5000},
    {date: moment('2015-03-30T12:00:00Z').format('MMM Do'), balance: 6000},*/
  ],
  from: new Date(),
  to: new Date(),
  percent: null,
  balance: null
};


//  action mutation commit ediyor.
//  components üzerinden iletişime geçirilir
//  dispatch edilir
//  payload
const actions = {
  setPercent({commit}, percent) {
    commit('SET_PERCENT', percent)
  },
  setBalance({commit}, balance) {
    commit('SET_BALANCE', balance)
  },
  setTo({commit}, to) {
    commit('SET_TO', to)
  },
  setFrom({commit}, from) {
    commit('SET_FROM', from)
  },
  setDays({commit}, payload){
    commit('SET_DAYS', payload)
  },
  calculateBalanceDatePrice({commit}, payload){
    commit('SET_BALANCE_DATE_PRICE', payload)
  }
};


//state'e eşitle
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
  'SET_DAYS'(state, payload){
    state.days.push({
      date: payload.date,
      balance: payload.balance.toFixed(4)
    })
  },
  'SET_BALANCE_DATE_PRICE'(state,payload){

  }
};

const getters = {};


const store = new Vuex.Store({
  state,
  getters,
  mutations,
  actions
});

export default store;
