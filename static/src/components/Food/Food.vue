<template>
	<span v-if="food">
		<h1>{{food.name}} 
      <span class="label label-info" v-if="food.category">{{categorize(food.category)}}</span>
    </h1>
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
    },
    categorize: function (category) {
      /*
      0: Main
      1: Hot Ready To Go
      2: Pasta Bar
      3: Dessert
      4: Drink
      */

      switch (category) {
        case 0: 
          return "Main";
        case 1:
          return "Hot Ready To Go";
        case 2:
          return "Pasta Bar";
        case 3:
          return "Dessert";
        case 4:
          return "Drink";
        default:
          return "Other"
      }
    }
  }
}
</script>
