<template>
  <h1>Food List</h1>
  <div v-if="food">
    <ul class="list-group" >
      <a v-for="food in food" 
      href="/public/food/{{food.id}}" class="list-group-item clearfix" 
      v-bind:class="{ active: activeId == food.id }">
        {{food.name}}
        <span v-if="IS_ADMIN" class="pull-right">
          <span class="btn btn-xs btn-danger" v-on:click="deleteFood(food.id, $event)">
            <span class="glyphicon glyphicon-remove"></span> Delete
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
      No foods were found
    </div>
  </span>
</template>

<script>
utils = require('../../utils');
EventBus = require('../../EventBus');
module.exports = {
  props: ["activeId"],
  data: function () {
    v = this;
    v.updateFood();

    EventBus.$on("UpdateFood", function () {
      v.updateFood();
    });

    return { food: null, loading: true, IS_ADMIN: IS_ADMIN }
  },
  methods: {
    monify: utils.poundStr,
    updateFood: function () {
      this.$http.get('/api/food/').then(function (response) {
        this.food = response.body.food; 
        this.loading = false;
      }, function (response) {
        console.error("Error retreiving the list of food");
        this.loading = false;
      });
    },
    deleteFood: function(id, e) {
      if (e) {e.preventDefault();}
      this.loading = true;
      this.$http.delete('/api/food/' + id).then(function (response) {
        this.loading = false;
        EventBus.$emit("UpdateFood");
      }, function (response) {
        console.error("Error deleting food");
        this.loading = false;
      });
    }
  }
}
</script>
