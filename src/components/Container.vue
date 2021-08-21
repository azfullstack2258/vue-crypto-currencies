<template>
  <div class="container">
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.container {
  width: 100%;
  height: calc(100vh - 16px);
  max-width: 900px;
  margin: auto;
}
</style>
