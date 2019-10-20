<template>
  <div class="container__two">
    <div class="container__two__header">
      <div class="container__two__header__links">
        <a href>Inicio</a>
        <a href>Nosotros</a>
        <a href>Contactanos</a>
        <a href>Blog</a>
      </div>
    </div>
    <div class="container__two__content">
      <div class="container__two__content__center">
        <div class="container__two__content__center__background"></div>
        <div class="container__two__content__center__point"></div>
        <img class="link" src="../../../assets/img/link.png" alt />
        <img class="logo" src="../../../assets/img/white_logo.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Slider"
};
</script>
<style lang="scss" scoped>
.container__two {
  width: 50%;
  background-image: url("../../../assets/img/trade.jpg");

  &__header {
    color: #fff;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    &__links {
      width: 75%;
      padding-right: 4rem;
      display: flex;
      justify-content: space-evenly;
      a {
        font-size: 20px;
        text-transform: uppercase;
        font-weight: 500;
      }
    }
  }
  &__content {
    height: 90%;
    display: flex;
    align-items: columns;
    justify-content: center;
    align-items: center;
    &__center {
      position: relative;
      height: 25rem;
      width: 25rem;
      display: flex;
      align-items: center;
      justify-content: center;
      &__background {
        height: 100%;
        background: #fff;
        width: 100%;
        position: absolute;
        opacity: 0.3;
        border-radius: 20px;
      }
      &__point {
        height: 1.5rem;
        width: 1.5rem;
        border-radius: 100%;
        background: gray;
        position: absolute;
        left: 1rem;
        top: 1rem;
      }

      .logo {
        height: 20rem;
        z-index: 1;
      }
      .link {
        position: absolute;
        bottom: 1rem;
        right: 1rem;
      }
    }
  }
}
</style>