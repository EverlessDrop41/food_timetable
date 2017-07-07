// app.vue
<style>
  .red {
    color: #F00;
  }
</style>

<template>
  <h1>Week: {{weekId}}</h1>
  <table class="table table-bordered" v-if="week">
 		<!-- <tr>
  		<th>Day</th> <th>Main</th> <th>Hot Ready to Go</th> <th>Pasta Bar</th> <th>Dessert</th> <th>Drink</th>
  	</tr> -->

    <tr>
      <th>Day</th> <th>Food</th> <th></th>
    </tr>

  	<tr v-if="week.Monday">
      <td>Monday</td> 
      <td><span v-for="f in week.Monday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a href="/public/course/{{week.MondayId}}">view in detail</a></td>
    </tr>

    <tr v-if="week.Tuesday">
      <td>Tuesday</td> 
      <td><span v-for="f in week.Tuesday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a href="/public/course/{{week.TuesdayId}}">view in detail</a></td>
    </tr>

    <tr v-if="week.Wednesday">
      <td>Wednesday</td> 
      <td><span v-for="f in week.Wednesday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a href="/public/course/{{week.WednesdayId}}">view in detail</a></td>
    </tr>

    <tr v-if="week.Thursday">
      <td>Thursday</td> 
      <td><span v-for="f in week.Thursday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a href="/public/course/{{week.ThursdayId}}">view in detail</a></td>
    </tr>

    <tr v-if="week.Friday">
      <td>Friday</td> 
      <td><span v-for="f in week.Friday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a href="/public/course/{{week.FridayId}}">view in detail</a></td>
    </tr>
  </table>
  <div v-else>
    Week not found
  </div>
</template>

<script>
/*
null, not in expected range: Other
0: Main
2: Hot Ready To Go
3: Pasta Bar
4: Dessert
5: Drink
*/
module.exports = {
	props: ["weekId"],
  data: function () {
    //TODO: load week data via network
    this.$http.get('/api/week/' + this.weekId).then(function (response){
      console.log(response.body);
      vueInstance = this;
      //use timeout to simulate network delay - REMOVE IN PROD
      setTimeout(function() {vueInstance.week = response.body;}, 1);
    }, function (response) {
      console.error("Error retreiving the week");
    });
    return { week: null }
  }
}
</script>
