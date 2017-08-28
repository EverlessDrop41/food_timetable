<template>
	<span v-if="course">
		<h1>{{course.name}}</h1>

		<ul>
			<li v-for="f in course.Food">
				<a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
			</li>
		</ul>
	</span>
	<div v-else>Course not found </div>
</template>

<script>
utils = require('../../utils');
EventBus = require('../../EventBus');
module.exports = {
	props: ["courseId"],
  data: function () {
    const v = this;
    v.getCourse();
    EventBus.$on("UpdateCourse", function () {
      v.getCourse();
    });

    return { course: null }
  },
  methods: {
    monify: utils.poundStr,
    getCourse: function () {
      //Get the data from the api
      this.$http.get('/api/course/' + this.courseId).then(function (response){
        vueInstance = this;
        //use timeout to simulate network delay - REMOVE IN PROD
        setTimeout(function() {vueInstance.course = response.body;}, 1);
      }, function (response) {
        console.error("Error retreiving the course");
      });
    }
  }
}
</script>
