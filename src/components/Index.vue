<template>
  <div class="index container">
    <div class="dates row">
      <div class="col s6 m2">
        <datepicker placeholder="From" v-model="dateFrom"></datepicker>
      </div>
      <div class="col s6 m2">
        <datepicker placeholder="To" v-model="dateTo"></datepicker>
      </div>
      <div class="col s3 m2">
        <input type="text" placeholder="Percent" v-model="percent">
      </div>
      <div class="col s3 m2">
        <input type="text" placeholder="BTC Balance" v-model="balance" @keyup.enter="calculateBalanceDateBTC">
      </div>
      <div class="col m4">
        <div class="col s2 m4">
          <a
            class="btn-floating green lighten-1 tooltipped"
            data-position="top"
            data-tooltip="Calculate"
            @click="this.calculateBalanceDateBTC">
            <i class="material-icons">mode_edit</i></a>
        </div>
        <div class="col s2 m4">
          <a
            class="btn-floating red tooltipped"
            data-position="top"
            data-tooltip="Clear"
            @click="clear"><i
            class="material-icons">clear</i></a>
        </div>
        <div class="col s2 m4">
          <a
            class="btn-floating blue tooltipped"
            data-position="top"
            data-tooltip="Firebase"
            @click="saveDataToFirebase"><i
            class="material-icons">cloud_upload</i></a>
        </div>
      </div>
    </div>
    <div class="days">
      <div class="row">
        <div class="col s3 m2" v-for="day in days">
          <div class="card blue-grey darken-1" :class="{ 'grey darken-4' : isToday(day.date) }">
            <div class="card-content white-text ">
              <span>{{ day.date | dateFormat }}</span>
            </div>
            <div class="card-action">
              <div class="price usd">{{ USDValue(day.balance) }}</div>
              <div class="price btc">₿{{ day.balance }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  $(document).ready(function () {
    $('.tooltipped').tooltip();
  });

  import {mapActions, mapGetters} from 'vuex';

  import Datepicker from 'vuejs-datepicker';
  import db from '@/firebase/init'
  import moment from 'moment'

  export default {
    name: 'Index',
    components: {
      Datepicker
    },
    methods: {
      ...mapActions([
        'calculateBalanceDateBTC',
        'setDays',
        'setPercent',
        'setBalance',
        'setTo',
        'setFrom',
        'setDays',
        'clearInfos',
        'saveToFirebase'
      ]),
      saveDataToFirebase() {
        this.saveToFirebase()
      },
      clear() {
        this.clearInfos()
      },
      USDValue(balance) {
        let result = this.getUSDValue * Number(balance);
        return '$' + result.toFixed(0);
      },
      isToday(date) {
        return date.isSame(moment(), 'day')
      }
    },
    computed: {
      ...mapGetters([
        'getPercent',
        'getBalance',
        'getTo',
        'getFrom',
        'getDays',
        'getUSDValue'
      ]),
      percent: {
        get() {
          return this.getPercent;
        }
        ,
        set(percent) {
          this.setPercent(percent)
        }
      },
      balance: {
        get() {
          return this.getBalance
        }
        ,
        set(balance) {
          this.setBalance(balance)
        }
      },
      dateTo: {
        get() {
          return this.getTo
        }
        ,
        set(to) {
          this.setTo(to)
        }
      },
      dateFrom: {
        get() {
          return this.getFrom
        }
        ,
        set(from) {
          this.setFrom(from)
        }
      },
      days: {
        get() {
          return this.getDays
        }
        ,
        set(days) {
          this.setDays(days)
        }
      }
    },
    filters: {
      dateFormat(date) {
        return date.format('ll')
      }
    }
  }
</script>

<style>
  .index {
    margin-top: 60px;
  }

  .card .card-content {
    margin: 3px;
    padding: 12px;
  }

  .price {
    font-size: 1.1em;
    color: #ffab40;
  }

  html {
    background-color: #e7e7e7;
  }

</style>
