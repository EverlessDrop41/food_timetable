<template>
  <span>
    <h1>Food Creator</h1>
    <div class="form-group">
      <label for="foodNameInput">Name</label>
      <input type="text" class="form-control" id="foodNameInput" placeholder="e.g. Pasta" require v-model="name">
    </div>
    <div class="form-group">
      <label for="foodDescriptionInput">Description</label>
      <textarea class="form-control" id="foodDescriptionInput" placeholder="Description (optional)" v-model="description"></textarea>
    </div>
    <div class="form-group">
      <label for="foodCostInput">Cost (in pence)</label>
      <div class="input-group">
        <span class="input-group-addon">{{ monify(cost) }}</span>
        <input type="number" class="form-control" id="foodCostInput" min="0" v-model="cost"></input>
      </div>
    </div>
    <div class="form-group">
      <label for="foodCategoryInput">Category</label>
      <select class="form-control" id="foodCategoryInput" v-model="category">
        <option value="0">Main</option>
        <option value="1">Hot ready to go</option>
        <option value="2">Pasta Bar</option>
        <option value="3">Dessert</option>
        <option value="4">Drink</option>
        <option value="-1">Other</option>
      </select>
    </div>
    <div class="form-group">
      <label class="checkbox-inline">
        <input type="checkbox" v-model="vegetarian"> Vegetarian
      </label>

      <label class="checkbox-inline" v-if="vegetarian || vegan">
        <input type="checkbox" v-model="vegan"> Vegan
      </label>

      <label class="checkbox-inline">
        <input type="checkbox" v-model="dairyFree"> Dairy Free
      </label>

      <label class="checkbox-inline">
        <input type="checkbox" v-model="glutenFree"> Gluten Free
      </label>
    </div>
  </span>
</template>

<script>
/*
null, not in expected range, -1: Other
0: Main
1: Hot Ready To Go
2: Pasta Bar
3: Dessert
4: Drink
*/
utils = require('../../utils');
module.exports = {
  data: function () {
    return { name: "", cost: 0, description: "", category: 0, 
    vegetarian: false, vegan: false, dairyFree: false, glutenFree: false.
    nameError: false, costError: true, descriptionError: false, categoryError: false  };
  },
  methods: {
    monify: utils.poundStr
  }
}
</script>
