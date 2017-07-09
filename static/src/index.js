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
  var Food = require("./components/Food/Food.vue");
  var FoodList = require("./components/Food/FoodList.vue");

  $(document).ready(function () {
    new Vue({
      el: 'body',
      components: {
        "app": App,
        "week": Week,
        "weeklist": WeekList,
        "course": Course,
        "courselist": CourseList,
        "food": Food,
        "foodlist": FoodList
      },
      data: {
        title: "Food Menu"
      }
    });
  });
}
