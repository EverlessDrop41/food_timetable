<template>
  <h1>Course List</h1>
  <div v-if="courses">
    <ul class="list-group">
      <a v-for="course in courses" 
      href="/public/course/{{course.id}}" class="list-group-item" 
      v-bind:class="{ active: activeId == course.id }">
        {{course.name}}
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
  props: ["activeId"],
  data: function () {
    this.$http.get('/api/course/').then(function (response) {
      console.log(response.body.courses);
      this.courses = response.body.courses; 
      this.loading = false;
    }, function (response) {
      console.error("Error retreiving the list of courses");
      this.loading = false;
    });

    return { courses: null, loading: true }
  },
  methods: {
    monify: utils.poundStr
  }
}
</script>
