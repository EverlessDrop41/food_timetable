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

module.exports = {
	props: ["foodId"],
  data: function () {

  	//Get the data from the api
    this.$http.get('/api/food/' + this.foodId).then(function (response){
      vueInstance = this;
      //use timeout to simulate network delay - REMOVE IN PROD
      setTimeout(function() {vueInstance.food = response.body;}, 1);
    }, function (response) {
      console.error("Error retreiving the food");
    });

    return { food: null }
  },
  methods: {
    monify: utils.poundStr
  }
}
</script>
