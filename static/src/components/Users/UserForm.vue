<template>
	<span>
		<h1>
      [NOT FINISHED] User 
      <span v-if="update == null || update == ''">Register</span> 
      <span v-else>Update</span>
    </h1>
    <div class="form-group" v-bind:class="{ 'has-error':userNameError }">
      <div class="alert alert-danger" v-if="userNameError">{{ UserNameErrorMsg }}</div>
      <label for="courseUserNameInput">Username</label>
      <input type="text" class="form-control" id="courseUserNameInput" maxlength="255" placeholder="e.g. Monday 1" require v-model="username">
    </div>
    <div class="form-group">
      <label for="passwordInput">Password</label>
      <input type="password" class="form-control" id="passwordInput" maxlength="255" placeholder="Password" require v-model="password">
    </div>
    <div class="form-group">
      <label for="confirmPasswordInput">Confirm Password</label>
      <input type="password" class="form-control" id="confirmPasswordInput" maxlength="255" placeholder="Confirm Password" require v-model="confirmPassword">
    </div>
    <button v-if="update == null || update == ''" 
      v-on:click="create()" class="btn btn-default">
      Register
    </button>

    <button v-else v-on:click="submitUpdate()" class="btn btn-default">
      Update
    </button>
	</span>
</template>

<script>
utils = require('../../utils');
EventBus= require('../../EventBus');

module.exports = {
	props: ["userId"],
  data: function () {
    vu = this;
    vu.updateData();

    EventBus.$on("UpdateUser", function () {
      console.log("User updating event");
      vu.updateData();
    });

    return { user: null, IS_ADMIN: IS_ADMIN }
  },
  methods: {
    updateData: function () {
      vu = this;
      this.$http.get('/api/user/' + this.userId).then(function (response){
        vu.user = response.body;
      }, function (response) {
        vu.user = null;
        console.error("Error retreiving the user");
      });
    }
  }
}
</script>
