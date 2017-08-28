<template>
  <span>
    <h1>
      Week 
      <span v-if="update == null || update == ''">Create</span> 
      <span v-else>Update</span>
    </h1>
    <div class="form-group" v-bind:class="{ 'has-error':nameError }">
      <div class="alert alert-danger" v-if="nameError">{{ nameErrorMsg }}</div>
      <label for="weekNameInput">Name</label>
      <input type="text" class="form-control" id="weekNameInput" maxlength="255" placeholder="e.g. Week 1" require v-model="name">
    </div>
    <div class="form-group">
      <label for="mondayCourseInput">Monday</label>
      <select class="form-control course-select" id="mondayCourseInput" v-model="monday">
        <option v-for="course in availableCourses" value="{{course.id}}">{{course.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="tuesdayCourseInput">Tuesday</label>
      <select class="form-control course-select" id="tuesdayCourseInput" v-model="tuesday">
        <option v-for="course in availableCourses" value="{{course.id}}">{{course.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="wednesdayCourseInput">Wednesday</label>
      <select class="form-control course-select" id="wednesdayCourseInput" v-model="wednesday">
        <option v-for="course in availableCourses" value="{{course.id}}">{{course.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="thursdayCourseInput">Thursday</label>
      <select class="form-control course-select" id="thursdayCourseInput" v-model="thursday">
        <option v-for="course in availableCourses" value="{{course.id}}">{{course.name}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="fridayCourseInput">Friday</label>
      <select class="form-control course-select" id="fridayCourseInput" v-model="friday">
        <option v-for="course in availableCourses" value="{{course.id}}">{{course.name}}</option>
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

    this.getAvailableCourses();

    if (this.update != null && this.update != '') {
      this.$http.get('/api/week/' + this.update).then(function (response){
        this.name = response.body.name;
        this.monday = response.body.MondayId;
        this.tuesday = response.body.TuesdayId;
        this.wednesday = response.body.WednesdayId;
        this.thursday = response.body.ThursdayId;
        this.friday = response.body.FridayId;
      }, function (response) {
        console.error("Error retreiving the week");
      });
    }

    EventBus.$on("UpdateCourses", function () {
      v.getAvailableCourses();
    });

    return { 
      name: "", nameError: false, nameErrorMsg: "",
      monday: null, mondayError: false, mondayErrorMsg: "",
      tuesday: null, tuesdayError: false, tuesdayErrorMsg: "",
      wednesday: null, wednesdayError: false, wednesdayErrorMsg: "",
      thursday: null, thursdayError: false, thursdayErrorMsg: "",
      friday: null, fridayError: false, fridayErrorMsg: "",
      availableCourses: []
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
      v.validate(function () {
        var body = {
          name: v.name,
          MondayId: v.monday,
          TuesdayId: v.tuesday,
          WednesdayId: v.wednesday,
          ThursdayId: v.thursday,
          FridayId: v.friday
        };
        v.$http.post('/api/week/', body).then(function (response){
          console.log(response.body);
          v.clearData();
          EventBus.$emit('UpdateWeek');
        }, function (response) {
          console.error("Error creating new week");
        });
      });
    },
    submitUpdate: function () {
      // const v = this;
      // v.validate(function () {
      //   var body = {
      //     name: v.name,
      //     food: v.mondaySelection
      //   };
      //   v.$http.put('/api/week/' + v.update, body).then(function (response){
      //     console.log(response.body);
      //     EventBus.$emit('UpdateWeek');
      //   }, function (response) {
      //     console.error("Error updating week");
      //   });
      // });
    },
    getAvailableCourses: function () {
      const v = this;
      this.$http.get('/api/course/').then(function (response){
        if (response.body) {
          v.availableCourses = response.body.courses;
          setTimeout(function () {
            //Use timeout to allow for vue to update html
            $(".course-select").selectpicker('refresh');
          }, 1);
          
        }
      }, function (response) {
        console.error("Error retreiving the available food");
      });
    },
    clearData: function () {
      console.log("clear data");
      this.name = null;
      this.monday = null;
    }
  }
}

</script>