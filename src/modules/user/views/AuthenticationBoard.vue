<template>
  <div class="container md-layout md-gutter">
    <Signin
      v-on:toLeft="moveElementToTheLeft"
      v-on:changeView="navigateToRegister"
      v-bind:signinRoute="signinRoute"
    />
    <Slider v-if="!isMobile" id="element" class="container__element" />
    <Signup
      v-if="showForgot"
      v-on:toRight="moveElementToTheRight"
      v-on:changeView="navigateToLogin"
      v-bind:forgotRoute="forgotRoute"
    />
  </div>
</template>
<script>
import Signin from "../components/Signin";
import Slider from "../components/Slider";
import Signup from "../components/Signup";
export default {
  name: "AuthenticationBoard",
  data: () => ({
    forgotRoute: false,
    signinRoute: true,
    isMobile: false,
    showForgot: false
  }),
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
      this.showForgot = true;
    },
    moveElementToTheRight() {
      const element = document.getElementById("element");
      element.classList.remove("move_to_left");
      element.classList.add("move_to_right");

      window.setTimeout(() => {
        this.showForgot = false;
      }, 1100);
    },
    navigateToRegister(event) {
      this.forgotRoute = event;
      this.signinRoute = false;
    },
    navigateToLogin(event) {
      this.signinRoute = event;
      this.forgotRoute = false;
    },
    onResize() {
      if (window.innerWidth <= 1280) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    }
  },
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
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
  margin: 0 !important;
  background-color: #ffff;
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
