<template>
  <h1>User List</h1>
  <div v-if="search" class="input-group" style="margin-bottom: 15px;">
    <input type="text" class="form-control" id="searchQuery" placeholder="Search..." v-model="searchQuery">
    <span class="input-group-btn">
      <button class="btn btn-default" type="button" v-on:click="showList = !showList">
        <span v-if="showList">Hide</span><span v-else>Show</span>
      </button>
    </span>
  </div>
  <div v-if="users && showList" class="flist" >
    <ul class="list-group" >
      <a v-for="user in users | filterBy searchQuery in 'name'" 
      href="/public/user/{{user.id}}" class="list-group-item clearfix" 
      v-bind:class="{ active: activeId == user.id }">
        {{user.name}}
        <span v-if="IS_ADMIN" class="pull-right">
          <span class="btn btn-xs btn-danger" v-on:click="deleteUser(user.id, $event)">
            <span class="glyphicon glyphicon-remove"></span> Delete
          </span>
        </span>
      </a>
    </ul>
  </div>
  <span v-else>
    <div v-if="loading">
      Loading...
    </div>
    <div v-if="!loading && Users == null">
      No Users were found
    </div>
  </span>
</template>

<style>
.flist {
    transition: all .3s ease;
    height: auto;
    overflow: hidden;
}
.flist.v-enter, .flist.v-leave {
    height: 0;
    padding: 0 10px;
    opacity: 0;
}
</style>

<script>
utils = require('../../utils');
EventBus = require('../../EventBus');
module.exports = {
  props: ["activeId", "search"],
  data: function () {
    v = this;
    v.updateUsers();

    EventBus.$on("UpdateUser", function () {
      v.updateUsers();
    });

    return { users: null, loading: true, IS_ADMIN: IS_ADMIN, searchQuery: null, showList: true }
  },
  methods: {
    monify: utils.poundStr,
    updateUsers: function () {
      this.$http.get('/api/user/').then(function (response) {
        console.log(response.body);
        this.users = response.body.users; 
        this.loading = false;
      }, function (response) {
        console.error("Error retreiving the list of Users");
        this.loading = false;
      });
    },
    deleteUsers: function(id, e) {
      if (e) {e.preventDefault();}
      this.loading = true;
      this.$http.delete('/api/user/' + id).then(function (response) {
        this.loading = false;
        EventBus.$emit("UpdateUser");
      }, function (response) {
        console.error("Error deleting User");
        this.loading = false;
      });
    },
    showHide: function() {
      showList = !showList;
    }
  }
}
</script>
