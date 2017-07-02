module.exports = function () {
  //Import libaries
  var Vue = require("Vue");
  var jq = require("jquery");

  //configure jQuery
  window.$ = jq;
  window.jQuery = jq;

  //Import Components
  var App = require("./components/App.vue");
  var Week = require("./components/Week.vue")

  $(document).ready(function () {
    console.log("READY");
    new Vue({
      el: 'body',
      components: {
        "app": App,
        'week': Week
      },
      data: {
        title: "FOOD"
      }
    });
  });
}
