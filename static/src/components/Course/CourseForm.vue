<template>
  <span>
    <h1>
      Course 
      <span v-if="update == null || update == ''">Create</span> 
      <span v-else>Update</span>
    </h1>
    <div class="form-group" v-bind:class="{ 'has-error':nameError }">
      <div class="alert alert-danger" v-if="nameError">{{ nameErrorMsg }}</div>
      <label for="courseNameInput">Name</label>
      <input type="text" class="form-control" id="courseNameInput" maxlength="255" placeholder="e.g. Monday 1" require v-model="name">
    </div>
    <div class="form-group">
      <label for="courseFoodInput">Food</label>
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
    const v =this;
    this.getAvailableFood();

    EventBus.$on("UpdateFood", function () {
      v.getAvailableFood();
    });

    return { 
      name: "", nameError: false, nameErrorMsg: "",
      foodSelection: [], foodSelectionError: false, foodSelectionErrorMsg: "",
      availableFood: []
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
    getAvailableFood: function () {
      const v = this;
      this.$http.get('/api/food/').then(function (response){
        if (response.body) {
          v.availableFood = response.body.food;
        }
      }, function (response) {
        console.error("Error retreiving the available food");
      });
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