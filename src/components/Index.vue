<template>
  <div class="index container">
    <div class="dates row">
      <div class="col s6 m3">
        <datepicker placeholder="From" v-model="dateFrom"></datepicker>
      </div>
      <div class="col s6 m3">
        <datepicker placeholder="To" v-model="dateTo"></datepicker>
      </div>
      <div class="col s3 m1">
        <input type="text" placeholder="Percent" v-model="percent">
      </div>
      <div class="col s3 m1">
        <input type="text" placeholder="Balance" v-model="balance" @keyup.enter="calculateBalanceDatePrice">
      </div>
      <div class="col s2 m1">
        <a
          class="btn-floating green lighten-1 tooltipped"
          data-position="top"
          data-tooltip="Calculate"
          @click="this.calculateBalanceDateBTC">
          <i class="material-icons">mode_edit</i></a>
      </div>
      <div class="col s2 m1">
        <a
          class="btn-floating red tooltipped"
          data-position="top"
          data-tooltip="Clear"
          @click="clear"><i
          class="material-icons">clear</i></a>
      </div>
      <div class="col s2 m2">
        <a
          class="btn-floating blue tooltipped"
          data-position="top"
          data-tooltip="Firebase"
          @click="save"><i
          class="material-icons">cloud_upload</i></a>
      </div>
    </div>
    <div class="days">
      <div class="row">
        <div class="col s4 m2" v-for="(day,index) in days" :key="index">
          <div class="card">
            <div class="card-content center">
              <div class="red-text">{{day.date}}</div>
              <div class="balance">{{day.balance}}</div>
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
  // :class="{ 'light-blue lighten-5' : isToday(day.date)}"
  import {mapActions, mapGetters} from 'vuex';
  import Datepicker from 'vuejs-datepicker';
  import db from '@/firebase/init'

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
        'setDays'
      ]),
      save() {
        if (this.percent && this.balance) {
          db.collection('dates').add({
            from: this.from,
            to: this.to,
            percent: this.percent,
            balance: this.balance
          }).then(() => {
            M.toast({html: 'Saved', classes: 'rounded', displayLength: '1000'});
          }).catch(err => {
            console.log(err)
          })
        } else {
          M.toast({html: 'Enter a value', classes: 'rounded', displayLength: '1000'})
        }
      },
      clear() {

      },
    },
    computed: {
      ...mapGetters([
        'getPercent',
        'getBalance',
        'getTo',
        'getFrom',
        'getDays'
      ]),
      percent:
        {
          get() {
            return this.getPercent;
          }
          ,
          set(percent) {
            this.setPercent(percent)
          }
        }
      ,
      balance: {
        get() {
          return this.getBalance
        }
        ,
        set(balance) {
          this.setBalance(balance)
        }
      }
      ,
      dateTo: {
        get() {
          return this.getTo
        }
        ,
        set(to) {
          this.setTo(to)
        }
      }
      ,
      dateFrom: {
        get() {
          return this.getFrom
        }
        ,
        set(from) {
          this.setFrom(from)
        }
      }
      ,
      days: {
        get() {
          return this.getDays
        }
        ,
        set(days) {
          this.setDays(days)
        }
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

</style>
