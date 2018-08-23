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
        <input type="text" placeholder="Balance" v-model="balance" @keyup.enter="calculateBalanceAndDate">
      </div>
      <div class="col s2 m1">
        <a
          class="btn-floating green lighten-1 tooltipped"
          data-position="top"
          data-tooltip="Calculate"
          @click="calculateBalanceAndDate">
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
        <div class="col s4 m2" v-for="day in days">
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
  import Datepicker from 'vuejs-datepicker';
  import moment from 'moment'
  import db from '@/firebase/init'

  export default {
    name: 'Index',
    components: {
      Datepicker
    },
    methods: {
      calculateBalanceAndDate() {
        let to = moment(this.$store.state.to)
        let from = moment(this.$store.state.from)
        let balance = this.$store.state.balance
        let percent = this.$store.state.percent
        let diffDays = to.diff(from, 'days') + 1;

        let processedBalance = Number(balance);
        let processedDate = new Date();

        for (let i = 0; i < diffDays; i++) {
          processedBalance += (processedBalance / 100) * percent;
          processedDate = moment(from).add(i, 'days').format('MMM Do')

          this.$store.dispatch('setDays', {date: processedDate, balance: processedBalance})
        }
      },
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
        this.from = new Date();
        this.to = new Date();
        this.balance = null;
        this.percent = null;
        this.days = []
      },
    },
    computed: {
      percent: {
        get() {
          return this.$store.state.percent
        },
        set(percent) {
          this.$store.dispatch('setPercent', percent)
        }
      },
      balance: {
        get() {
          return this.$store.state.balance
        },
        set(balance) {
          this.$store.dispatch('setBalance', balance)
        }
      },
      dateTo: {
        get() {
          return this.$store.state.to
        },
        set(to) {
          this.$store.dispatch('setTo', to)
        }
      },
      dateFrom: {
        get() {
          return this.$store.state.from
        },
        set(from) {
          this.$store.dispatch('setFrom', from)
        }
      },
      days: {
        get() {
          return this.$store.state.days
        },
        set(days) {
          this.$store.dispatch('setDays', days)
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
