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
  var Week = require("./components/Week.vue");
  var Course = require("./components/Course.vue");
  var Food = require("./components/Food.vue");

  $(document).ready(function () {
    console.log("READY");
    new Vue({
      el: 'body',
      components: {
        "app": App,
        "week": Week,
        "course": Course,
        "Food": Food
      },
      data: {
        title: "Food Menu"
      }
    });
  });
}
