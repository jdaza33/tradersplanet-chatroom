<template>
  <div class="container">
    <Signin v-on:toLeft="moveElementToTheLeft" />
    <Slider id="element" class="container__element" />
    <Signup v-on:toRight="moveElementToTheRight" />
  </div>
</template>
<script>
import Signin from "../components/Signin";
import Slider from "../components/Slider";
import Signup from "../components/Signup";
export default {
  name: "AuthenticationBoard",
  components: {
    Signin,
    Slider,
    Signup
  },
  methods: {
    moveElementToTheLeft() {
      const element = document.getElementById("element");
      element.classList.add("move_to_left");
      element.classList.remove("move_to_right");
    },
    moveElementToTheRight() {
      const element = document.getElementById("element");
      element.classList.remove("move_to_left");
      element.classList.add("move_to_right");
    }
  }
};
</script>

<style lang="scss">
.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: row;
  position: relative;
  &__element {
    position: absolute;
    height: 100vh;
    z-index: 99;
    right: 0;
  }
}

.move_to_left {
  animation: left 1s forwards;
}

@keyframes left {
  from {
    right: 0;
  }
  to {
    right: 50%;
  }
}
.move_to_right {
  animation: right 1s forwards;
}

@keyframes right {
  from {
    right: 50%;
  }
  to {
    right: 0;
  }
}
</style>
