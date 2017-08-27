<template>
  <span>
    <h1>
      Course 
      <span v-if="update == null || update == ''">Create</span> 
      <span v-else>Update</span>
    </h1>
    <div class="form-group" v-bind:class="{ 'has-error':nameError }">
      <div class="alert alert-danger" v-if="nameError">{{ nameErrorMsg }}</div>
      <label for="foodNameInput">Name</label>
      <input type="text" class="form-control" id="foodNameInput" maxlength="255" placeholder="e.g. Pasta" require v-model="name">
    </div>
    <div class="form-group">
      <label for="courseFoodInput">Category</label>
      <select multiple class="form-control" id="courseFoodInput" v-model="foodSelection">
        <option v-for="food in availableFood" value="{{food.id}}">{{food.name}}</option>
      </select>
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
utils = require('../../utils');
EventBus = require('../../EventBus');
module.exports = {
  props: ['update'],
  data: function () {



    return { 
        name: "", nameError: false, nameErrorMsg: "",
        foodSelection: [], foodSelectionError: false, foodSelectionErrorMsg: "",
        availableFood: [{ id: 1, name: "Pasta"}, { id: 2, name: "Pizza"}]
    };
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

      if (!invalidForm) { successCallback(); }
    },
    create: function() {
      const v = this;
      console.log("Not yet implemented");
    },
    submitUpdate: function () {
      const v = this;
      console.log("Not yet implemented");
    },
    clearData: function () {
      console.log("clear data");
      this.name = null;
      this.foodSelection = null;
      this.availableFood = null;
    }
  }
}

</script>