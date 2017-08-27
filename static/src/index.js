module.exports = function () {
  //Import libaries
  var jq = require("jquery");
  var Vue = require("Vue");
  var VueResource = require('vue-resource');

  //configure vue extensions
  Vue.use(VueResource);

  //configure jQuery
  window.$ = jq;
  window.jQuery = jq;

  //Import Components
  var App = require("./components/App.vue");
  var Week = require("./components/Week/Week.vue");
  var WeekList = require("./components/Week/WeekList.vue");
  var Course = require("./components/Course/Course.vue");
  var CourseList = require("./components/Course/CourseList.vue");
  var CourseForm = require("./components/Course/CourseForm.vue");
  var Food = require("./components/Food/Food.vue");
  var FoodList = require("./components/Food/FoodList.vue");
  var FoodForm = require("./components/Food/FoodForm.vue");

  $(document).ready(function () {
    new Vue({
      el: 'body',
      components: {
        "app": App,
        "week": Week,
        "weeklist": WeekList,
        "course": Course,
        "courselist": CourseList,
        "courseform": CourseForm,
        "food": Food,
        "foodlist": FoodList,
        "foodform": FoodForm
      },
      data: {
        title: "Food Menu"
      }
    });
  });
}
