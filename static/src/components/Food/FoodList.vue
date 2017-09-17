<template>
  <h1>Food List</h1>
  <div v-if="search" class="input-group">
    <input type="text" class="form-control" id="searchQuery" placeholder="Search..." v-model="searchQuery">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" v-on:click="showList = !showList">
        <span v-if="showList">Hide</span><span v-else>Show</span>
      </button>
    </span>
  </div>
  <div v-if="food && showList" class="flist" v-animate>
    <ul class="list-group" >
      <a v-for="food in food | filterBy searchQuery in 'name'" 
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
    <div v-if="!loading && food == null">
      No foods were found
    </div>
  </span>
</template>

<style>
.flist {
    transition: all .3s ease;
    height: auto;
    overflow: hidden;
}
.flist.v-enter, .flist.v-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
</style>

<script>
utils = require('../../utils');
EventBus = require('../../EventBus');
module.exports = {
  props: ["activeId", "search"],
  data: function () {
    v = this;
    v.updateFood();

    EventBus.$on("UpdateFood", function () {
      v.updateFood();
    });

    return { food: null, loading: true, IS_ADMIN: IS_ADMIN, searchQuery: null, showList: true }
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
    },
    showHide: function() {
      showList = !showList;
    }
  }
}
</script>
