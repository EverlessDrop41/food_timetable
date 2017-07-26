<template>
  <span>
    <h1>Food Creator</h1>
    <div class="form-group">
      <label for="foodNameInput">Name</label>
      <input type="text" class="form-control" id="foodNameInput" maxlength="255" placeholder="e.g. Pasta" require v-model="name">
    </div>
    <div class="form-group">
      <label for="foodDescriptionInput">Description</label>
      <textarea class="form-control" id="foodDescriptionInput" maxlength="255" placeholder="Description (optional)" v-model="description"></textarea>
    </div>
    <div class="form-group">
      <label for="foodCostInput">Cost</label>
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
    <button v-on="submit()" class="btn btn-default">Submit</button>
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
    nameError: false, descriptionError: true, costError: true };
  },
  methods: {
    monify: utils.poundStr,
    submit: function() {
      validate(function () {
        console.log("submit");
      });
    },
    validate: function (successCallback) {
      var invalidForm = false;

      if (name.length > 0 && name.length <= 255) {
        nameError = false;
      } else {
        invalidForm = true;
        nameError = true;
      }

      if (description.length <= 255) {
        descriptionError = false;
      } else {
        descriptionError = true;
        invalidForm = true;
      }

      if (cost >= 0) {
        cost = parseInt(cost);
        costError = false
      } else {
        costError = true;
        invalidForm = true;
      }

      category = parseInt(category);
      if ([0, 1, 2, 3, 4].indexOf(category) === -1) {
        category = -1;
      }

      if (!invalidForm) { successCallback(); }
    }
  }
}

</script>