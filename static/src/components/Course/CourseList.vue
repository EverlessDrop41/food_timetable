<template>
  <h1>Course List</h1>
  <div v-if="search" class="form-group">
    <input type="text" class="form-control" id="searchQuery" placeholder="Search..." v-model="searchQuery">
  </div>
  <div v-if="courses">
    <ul class="list-group">
      <a v-for="course in courses | filterBy searchQuery in 'name'" 
      href="/public/course/{{course.id}}" class="list-group-item clearfix" 
      v-bind:class="{ active: activeId == course.id }">
        {{course.name}}
        <span v-if="IS_ADMIN" class="pull-right">
          <span class="btn btn-xs btn-danger" v-on:click="deleteCourse(course.id, $event)">
            <span class="glyphicon glyphicon-remove"></span> Delete
          </span>
        </span>
      </a>
    </ul>
  </div>
  <span v-else>
    <div v-if="loading">
      Loading...
    </div>
    <div v-else>
      No courses were found
    </div>
  </span>
</template>

<script>
utils = require('../../utils');
module.exports = {
  props: ["activeId", "search"],
  data: function () {
    const v = this;
    v.updateCourse();

    EventBus.$on("UpdateCourse", function () {
      v.updateCourse();
    });

    return { courses: null, loading: true, IS_ADMIN: IS_ADMIN, searchQuery: null }
  },
  methods: {
    monify: utils.poundStr,
    updateCourse: function () {
      this.loading = true;
      this.$http.get('/api/course/').then(function (response) {
        console.log(response.body.courses);
        this.courses = response.body.courses; 
        this.loading = false;
      }, function (response) {
        console.error("Error retreiving the list of courses");
        this.loading = false;
      });
    },
    deleteCourse: function(id, e) {
      if (e) {e.preventDefault();}
      this.loading = true;
      this.$http.delete('/api/course/' + id).then(function (response) {
        this.loading = false;
        EventBus.$emit("UpdateCourse");
      }, function (response) {
        console.error("Error deleting course");
        this.loading = false;
      });
    }
  }
}
</script>
