<template>
	<span v-if="user">
		<h1>{{ user.name }}</h1>
    <p>Is admin: {{ user.is_admin }}</p>
	</span>
	<div v-else>User not found </div>
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
