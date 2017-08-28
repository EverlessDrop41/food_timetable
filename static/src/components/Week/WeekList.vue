<template>
  <h1>Week List</h1>
  <div v-if="weeks">
    <ul class="list-group" >
      <a v-for="week in weeks" 
      href="/public/week/{{week.id}}" class="list-group-item" 
      v-bind:class="{ active: activeId == week.id }">
        {{week.name}}
        <span class="pull-right">
          <span class="btn btn-xs btn-danger" v-on:click="deleteWeek(week.id, $event)">
            Delete
          </span>
        </span>
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
EventBus = require('../../EventBus');
module.exports = {
  props: ['activeId'],
  data: function () {
    const v = this;
    
    v.getWeek();

    EventBus.$on("UpdateWeek", function () {
      v.getWeek();
    });

    return { weeks: null, loading: true }
  },
  methods: {
    monify: utils.poundStr,
    getWeek: function () {
      this.$http.get('/api/week/').then(function (response) {
        console.log(response.body.weeks);
        this.weeks = response.body.weeks; 
        this.loading = false;
      }, function (response) {
        console.error("Error retreiving the list of weeks");
        this.loading = false;
      });
    },
    deleteWeek: function (id, e) {
      if (e) {e.preventDefault();}
      this.$http.delete('/api/week/' + id).then(function (response) {
        this.loading = false;
        EventBus.$emit("UpdateWeek");
      }, function (response) {
        console.error("Error deleting course");
        this.loading = false;
      });
    }
  }
}
</script>
