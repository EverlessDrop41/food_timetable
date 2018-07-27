<template>
  <div class="form-group">
    <label for="confirmPasswordInput">{{ label }}</label>
    <input type="password" class="form-control" id="confirmPasswordInput" 
      maxlength="255" placeholder="{{ placeholder }}" require v-model="confirmPassword">
  </div>
</template>

<script>
</script>