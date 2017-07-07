<template>
	<span v-if="course">
		<h1>{{course.name}}</h1>

		<ul>
			<li v-for="f in course.Food">
				<a href="/public/food/{{f.id}}">{{f.name}}</a> : {{ f.price }}
			</li>
		</ul>
	</span>
	<div v-else>Course not found </div>
</template>

<script>
module.exports = {
	props: ["courseId"],
  data: function () {
    return {
      course: {
				"id": 1,
				"name": "Monday 1",
				"createdAt": "2017-07-07T12:08:07.000Z",
				"updatedAt": "2017-07-07T12:08:07.000Z",
				"Food": [
					{
						"id": 1,
						"name": "Pasta",
						"description": null,
						"price": 150,
						"category": null,
						"vegetarian": false,
						"vegan": false,
						"dairyFree": false,
						"glutenFree": false
					},
					{
						"id": 2,
						"name": "Pizza",
						"description": null,
						"price": 100,
						"category": null,
						"vegetarian": false,
						"vegan": false,
						"dairyFree": false,
						"glutenFree": false
					}
				]
			}}
  }
}
</script>
