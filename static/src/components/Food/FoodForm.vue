<template>
  <span>
    <h1>
      Food 
      <span v-if="update == null || update == ''">Create</span> 
      <span v-else>Update</span>
    </h1>
    <div class="form-group" v-bind:class="{ 'has-error':nameError }">
      <div class="alert alert-danger" v-if="nameError">{{ nameErrorMsg }}</div>
      <label for="foodNameInput">Name</label>
      <input type="text" class="form-control" id="foodNameInput" maxlength="255" placeholder="e.g. Pasta" require v-model="name">
    </div>
    <div class="form-group" v-bind:class="{ 'has-error':descriptionError }">
      <div class="alert alert-danger" v-if="descriptionError">{{ descriptionErrorMsg }}</div>
      <label for="foodDescriptionInput">Description</label>
      <textarea class="form-control" id="foodDescriptionInput" maxlength="255" placeholder="Description (optional)" v-model="description"></textarea>
    </div>
    <div class="form-group" v-bind:class="{ 'has-error':costError }">
      <div class="alert alert-danger" v-if="costError">{{ costErrorMsg }}</div>
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
    <button v-on:click="create()" class="btn btn-default">Create</button>
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
EventBus = require('../../EventBus');
module.exports = {
  props: ['update'],
  data: function () {
    return { name: "", cost: 0, description: "", category: 0, 
    vegetarian: false, vegan: false, dairyFree: false, glutenFree: false,
    nameError: false, nameErrorMsg: "", descriptionError: false, descriptionErrorMsg: "", costError: false, costErrorMsg: "" };
  },
  methods: {
    monify: utils.poundStr,
    validate: function (successCallback) {
      var invalidForm = false;

      if (this.name.length > 0 && this.name.length <= 255) {
        this.nameError = false;
      } else {
        this.nameError = true;
        this.nameErrorMsg = this.name.length == 0 ? "Name must have a vlaue" : "Name is too long";
        invalidForm = true;
      }

      if (this.description.length <= 255) {
        this.descriptionError = false;
      } else {
        this.descriptionError = true;
        this.descriptionErrorMsg = "Description is too long, must be under 255 characters";
        invalidForm = true;
      }

      if (this.cost >= 0) {
        this.cost = parseInt(this.cost);
        if (isNaN(this.cost)) { this.cost=0; }
        this.costError = false
      } else {
        this.costError = true;
        this.costErrorMsg = "Can't have a negative cost";
        invalidForm = true;
      }

      this.category = parseInt(this.category);
      if ([0, 1, 2, 3, 4].indexOf(this.category) === -1) {
        this.category = -1;
      }

      if (!invalidForm) { successCallback(); }
    },
    create: function() {
      const v = this;
      this.validate(function () {
        const body = {
          name: v.name,
          price: v.cost,
          description: v.description,
          category: v.category,
          vegetarian: v.vegetarian,
          vegan: v.vegan,
          dairyFree: v.dairyFree,
          glutenFree: v.glutenFree
        }
        console.log(body);
        v.$http.post('/api/food/', body).then(function (response){
          console.log(response.body);
          v.clearData();
          EventBus.$emit('UpdateFood');
        }, function (response) {
          console.error("Error creating new food");
        });
      });
    },
    clearData: function () {
      console.log("clear data");
      this.name = null;
      this.cost = null;
      this.description = null;
      this.category = 0;
      this.vegetarian = false;
      this.vegan = false;
      this.dairyFree = false;
      this.glutenFree = false;
    }
  }
}

</script>