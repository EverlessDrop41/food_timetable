<template>
  <h1>Food List</h1>
  <div v-if="food">
    <ul class="list-group" >
      <a v-for="food in food" 
      href="/public/food/{{food.id}}" class="list-group-item" 
      v-bind:class="{ active: activeId == food.id }">
        {{food.name}}
      </a>
    </ul>
  </div>
  <span v-else>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      No foods were found
    </div>
  </span>
</template>

<script>
utils = require('../../utils');
module.exports = {
  props: ["activeId"],
  data: function () {
    this.$http.get('/api/food/').then(function (response) {
      this.food = response.body.food; 
      this.loading = false;
    }, function (response) {
      console.error("Error retreiving the list of food");
      this.loading = false;
    });

    return { food: null, loading: true }
  },
  methods: {
    monify: utils.poundStr
  }
}
</script>
