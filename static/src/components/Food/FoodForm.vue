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
    <div class="form-group" v-bind:class="{ 'has-error':priceError }">
      <div class="alert alert-danger" v-if="priceError">{{ priceErrorMsg }}</div>
      <label for="foodpriceInput">price</label>
      <div class="input-group">
        <span class="input-group-addon">{{ monify(price) }}</span>
        <input type="number" class="form-control" id="foodpriceInput" min="0" v-model="price"></input>
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

    <button v-if="update == null || update == ''" 
      v-on:click="create()" class="btn btn-default">
      Create
    </button>

    <button v-else v-on:click="submitUpdate()" class="btn btn-default">
      Update
    </button>
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

    if (this.update != null && this.update != '') {
      this.$http.get('/api/food/' + this.update).then(function (response){
        this.name = response.body.name;
        this.description = response.body.description;
        this.price = response.body.price;
        this.category = response.body.category;
        this.vegetarian = response.body.vegetarian;
        this.vegan = response.body.vegan;
        this.dairyFree = response.body.dairyFree;
        this.glutenFree = response.body.glutenFree;
        setTimeout(function () {
          $("#foodCategoryInput").selectpicker('refresh');
        }, 1);
      }, function (response) {
        console.error("Error retreiving the food");
      });
    } else {
      setTimeout(function () {
        $("#foodCategoryInput").selectpicker('refresh');
      }, 1);
    }

    
    

    return { name: "", price: 0, description: "", category: 0, 
    vegetarian: false, vegan: false, dairyFree: false, glutenFree: false,
    nameError: false, nameErrorMsg: "", descriptionError: false, descriptionErrorMsg: "", priceError: false, priceErrorMsg: "" };
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

      if (this.description == null || this.description.length <= 255 ) {
        this.descriptionError = false;
      } else {
        this.descriptionError = true;
        this.descriptionErrorMsg = "Description is too long, must be under 255 characters";
        invalidForm = true;
      }

      if (this.price >= 0) {
        this.price = parseInt(this.price);
        if (isNaN(this.price)) { this.price=0; }
        this.priceError = false
      } else {
        this.priceError = true;
        this.priceErrorMsg = "Can't have a negative price";
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
          price: v.price,
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
    submitUpdate: function () {
      const v = this;
      this.validate(function () {
        const body = {
          name: v.name,
          price: v.price,
          description: v.description,
          category: v.category,
          vegetarian: v.vegetarian,
          vegan: v.vegan,
          dairyFree: v.dairyFree,
          glutenFree: v.glutenFree
        }
        console.log(body);
        v.$http.put('/api/food/' + v.update, body).then(function (response){
          console.log(response.body);
          EventBus.$emit('UpdateFood');
        }, function (response) {
          console.error("Error updating food");
        });
      });
    },
    clearData: function () {
      console.log("clear data");
      this.name = null;
      this.price = 0;
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