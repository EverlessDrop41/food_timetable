// app.vue
<style>
  .red {
    color: #F00;
  }
</style>

<template>
  <h1>Week: {{weekId}}</h1>
  <table class="table table-bordered">
 		<tr>
  		<th>Day</th> <th>Food</th> <th></th>
  	</tr>

  	<tr>
  		<td>Monday</td> <td>Pasta: £2.00 <br>Pizza: £2.25 <br>Curry: £3.00</td> <td><a>view in detail</a></td>
  	</tr>

  	<tr>
  		<td>Tuesday</td> <td>Pasta: £2.00 <br>Pizza: £2.25 <br>Curry: £3.00</td> <td><a>view in detail</a></td>
  	</tr>

  	<tr>
  		<td>Wednesday</td> <td>Pasta: £2.00 <br>Pizza: £2.25 <br>Curry: £3.00</td> <td><a>view in detail</a></td>
  	</tr>

  	<tr>
  		<td>Thursday</td> <td>Pasta: £2.00 <br>Pizza: £2.25 <br>Curry: £3.00</td> <td><a>view in detail</a></td>
  	</tr>

  	<tr>
  		<td>Friday</td> <td>Pasta: £2.00 <br>Pizza: £2.25 <br>Curry: £3.00</td> <td><a>view in detail</a></td>
  	</tr>
  </table>
</template>

<script>
module.exports = {
	props: ["weekId"]
}
</script>
