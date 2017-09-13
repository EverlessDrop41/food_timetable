<template>
	<span v-if="course">
		<h1>{{course.name}}</h1>

		<table v-if="course" class="table table-bordered">
      <thead>
        <tr>
          <th>Main</th> <th>Hot Ready To Go</th> <th>Pasta Bar</th> <th>Dessert</th> <th>Drink</th> <th>Other</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- Main -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in mainFood">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
          <!-- HRTG -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in hrtgFood">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
          <!-- Pasta Bar -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in pastaBarFood">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
          <!-- Desserts -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in dessertFood">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
          <!-- Drinks -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in drinks">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
          <!-- Other -->
          <td class="foodListCell">
            <ul>
              <li v-for="f in otherFood">
                <a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ monify(f.price) }}
              </li>
            </ul>
          </td>
        </tr>
      </tbody>

    </table>
	</span>
	<div v-else>Course not found </div>

      <!--
null, not in expected range, -1: Other
0: Main
1: Hot Ready To Go
2: Pasta Bar
3: Dessert
4: Drink
-->
    

</template>

<style>
.foodListCell ul {
  padding: 0px;
  margin: 0px;
  list-style-type: none;
}
</style>

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
  },
  computed: {
    mainFood: function () {
      return this.course.Food.filter(function (food) {
        return food.category === 0;
      });
    },
    hrtgFood: function () {
      return this.course.Food.filter(function (food) {
        return food.category === 1;
      });
    },
    pastaBarFood: function () {
      return this.course.Food.filter(function (food) {
        return food.category === 2;
      });
    },
    dessertFood: function () {
      return this.course.Food.filter(function (food) {
        return food.category === 3;
      });
    },
    drinks: function () {
      return this.course.Food.filter(function (food) {
        return food.category === 4;
      });
    },
    otherFood: function () {
      return this.course.Food.filter(function (food) {
        return [0,1,2,3,4].indexOf(food.category) == -1;
      });
    }
  }
}
</script>
