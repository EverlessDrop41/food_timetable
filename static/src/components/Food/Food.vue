<template>
	<span v-if="food">
		<h1>{{food.name}} <span class="label label-default" v-if="food.category">{{food.category}}</span></h1>
    <p>{{food.description}}</p>
    <p>Cost: {{monify(food.price)}}</p>
    
    <dl>
      <dt>Vegetarian</dt>
      <dd><span v-if="food.vegetarian">Yes</span><span v-else>No</span></dd>

      <dt>Vegan</dt>
      <dd><span v-if="food.vegan">Yes</span><span v-else>No</span></dd>

      <dt>Dairy Free</dt>
      <dd><span v-if="food.dairyFree">Yes</span><span v-else>No</span></dd>

      <dt>Gluten Free</dt>
      <dd><span v-if="food.glutenFree">Yes</span><span v-else>No</span></dd>
    </dl>
	</span>
	<div v-else>food not found </div>
</template>

<script>
utils = require('../../utils');
EventBus= require('../../EventBus');

module.exports = {
	props: ["foodId"],
  data: function () {
    vu = this;
    vu.updateData();

    EventBus.$on("UpdateFood", function () {
      console.log("Food updating event");
      vu.updateData();
    });

    return { food: null }
  },
  methods: {
    monify: utils.poundStr,
    updateData: function () {
      vu = this;
      this.$http.get('/api/food/' + this.foodId).then(function (response){
        vu.food = response.body;
      }, function (response) {
        vu.food = null;
        console.error("Error retreiving the food");
      });
    }
  }
}
</script>
