<template>
  <div class="container">
    <div class="container__one"></div>
    <div class="container__two">
      <div class="container__two__header">content</div>
      <div class="container__two__content">
        <img src="./assets/images/gray_logo.png" alt="logo" />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Signin"
};
</script>

<style lang="scss" scoped>
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  &__one {
    width: 50%;
    background: #fff;
  }
  &__two {
    width: 50%;
    background: #000;
  }
}
</style>
