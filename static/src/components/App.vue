// app.vue
<style>
  .red {
    color: #F00;
  }
</style>

<template>
  <p class="red">Apple {{msg}}</p>
</template>

<script>
module.exports = {
  data: function () {
    return {
      msg: 'Hello world!'
    }
  }
}
</script>
