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
      <td><a>view in detail</a></td>
    </tr>

    <tr v-if="week.Tuesday">
      <td>Tuesday</td> 
      <td><span v-for="f in week.Tuesday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a>view in detail</a></td>
    </tr>

    <tr v-if="week.Wednesday">
      <td>Wednesday</td> 
      <td><span v-for="f in week.Wednesday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a>view in detail</a></td>
    </tr>

    <tr v-if="week.Thursday">
      <td>Thursday</td> 
      <td><span v-for="f in week.Thursday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a>view in detail</a></td>
    </tr>

    <tr v-if="week.Friday">
      <td>Friday</td> 
      <td><span v-for="f in week.Friday.Food">{{ f.name }}: {{f.price}}<br></span></td> 
      <td><a>view in detail</a></td>
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
    return { week: {
      id: 1,
      name: "Week",
      createdAt: "2017-07-03T22:58:05.000Z",
      updatedAt: "2017-07-03T22:58:05.000Z",
      MondayId: 1,
      TuesdayId: 1,
      WednesdayId: 1,
      ThursdayId: 1,
      FridayId: null,
      Monday: {
        id: 1,
        name: "Monday 1",
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        Food: [
        {
          id: 1,
          name: "Pasta",
          description: null,
          price: 150,
          category: null,
          vegetarian: false,
          vegan: false,
          dairyFree: false,
          glutenFree: false,
          createdAt: "2017-07-03T22:58:05.000Z",
          updatedAt: "2017-07-03T22:58:05.000Z",
          FoodCourseAssoc: {
            createdAt: "2017-07-03T22:58:05.000Z",
            updatedAt: "2017-07-03T22:58:05.000Z",
            FoodId: 1,
            CourseId: 1
          }
        }, {
          id: 2,
          name: "Pizza",
          description: null,
          price: 100,
          category: null,
          vegetarian: false,
          vegan: false,
          dairyFree: false,
          glutenFree: false,
          createdAt: "2017-07-03T22:58:05.000Z",
          updatedAt: "2017-07-03T22:58:05.000Z",
          FoodCourseAssoc: {
            createdAt: "2017-07-03T22:58:05.000Z",
            updatedAt: "2017-07-03T22:58:05.000Z",
            FoodId: 2,
            CourseId: 1
          }
        }]
      },
      Tuesday: {
        id: 1,
        name: "Monday 1",
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        Food: [
          {
            id: 1,
            name: "Pasta",
            description: null,
            price: 150,
            category: null,
            vegetarian: false,
            vegan: false,
            dairyFree: false,
            glutenFree: false,
            createdAt: "2017-07-03T22:58:05.000Z",
            updatedAt: "2017-07-03T22:58:05.000Z",
            FoodCourseAssoc: {
              createdAt: "2017-07-03T22:58:05.000Z",
              updatedAt: "2017-07-03T22:58:05.000Z",
              FoodId: 1,
              CourseId: 1
            }
          },{
            id: 2,
            name: "Pizza",
            description: null,
            price: 100,
            category: null,
            vegetarian: false,
            vegan: false,
            dairyFree: false,
            glutenFree: false,
            createdAt: "2017-07-03T22:58:05.000Z",
            updatedAt: "2017-07-03T22:58:05.000Z",
            FoodCourseAssoc: {
              createdAt: "2017-07-03T22:58:05.000Z",
              updatedAt: "2017-07-03T22:58:05.000Z",
              FoodId: 2,
              CourseId: 1
          }
        } ]
      },
      Wednesday: {
        id: 1,
        name: "Monday 1",
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        Food: [
        {
        id: 1,
        name: "Pasta",
        description: null,
        price: 150,
        category: null,
        vegetarian: false,
        vegan: false,
        dairyFree: false,
        glutenFree: false,
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodCourseAssoc: {
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodId: 1,
        CourseId: 1
        }
        },
        {
        id: 2,
        name: "Pizza",
        description: null,
        price: 100,
        category: null,
        vegetarian: false,
        vegan: false,
        dairyFree: false,
        glutenFree: false,
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodCourseAssoc: {
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodId: 2,
        CourseId: 1
        }
        }
        ]
      },
      Thursday: {
        id: 1,
        name: "Monday 1",
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        Food: [
        {
        id: 1,
        name: "Pasta",
        description: null,
        price: 150,
        category: null,
        vegetarian: false,
        vegan: false,
        dairyFree: false,
        glutenFree: false,
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodCourseAssoc: {
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodId: 1,
        CourseId: 1
        }
        },
        {
        id: 2,
        name: "Pizza",
        description: null,
        price: 100,
        category: null,
        vegetarian: false,
        vegan: false,
        dairyFree: false,
        glutenFree: false,
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodCourseAssoc: {
        createdAt: "2017-07-03T22:58:05.000Z",
        updatedAt: "2017-07-03T22:58:05.000Z",
        FoodId: 2,
        CourseId: 1
        }
        }
        ]
      },
      Friday: null} }
  }
}
</script>
