<template>
  <h1>Week List</h1>
  <div v-if="weeks">
    <ul class="list-group" >
      <a v-for="week in weeks" 
      href="/public/week/{{week.id}}" class="list-group-item" 
      v-bind:class="{ active: activeId == week.id }">
        {{week.name}}
      </a>
    </ul>
  </div>
  <span v-else>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      No weeks were found
    </div>
  </span>
</template>

<script>
utils = require('../../utils');
module.exports = {
  props: ['activeId'],
  data: function () {
    //TODO: Add loading indicators

    //Get the data from the api
    this.$http.get('/api/week/').then(function (response) {
      //use timeout to simulate network delay - REMOVE IN PROD
      //vueInstance = this;
      //setTimeout(function() {vueInstance.week = response.body; vueInstance.loading = false}, 1);
      console.log(response.body.weeks);
      this.weeks = response.body.weeks; 
      this.loading = false;
    }, function (response) {
      console.error("Error retreiving the list of weeks");
      this.loading = false;
    });

    return { weeks: null, loading: true }
  },
  methods: {
    monify: utils.poundStr
  }
}
</script>
