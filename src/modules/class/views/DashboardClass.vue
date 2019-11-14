<template>
  <div>
    <div v-if="enable" class="container_dissolve"></div>
    <div class="container">
      <img src="../../../assets/img/streaming.png" alt />
      <CreateClass />
    </div>
  </div>
</template>
<script>
import CreateClass from "../components/CreateClass";
export default {
  name: "dashboardClass",
  components: {
    CreateClass
  },
  methods: {
    setInitAnimation() {
      window.setTimeout(() => {
        console.log("init");
        const container = document.querySelector(".container_dissolve");
        container.classList.add("animate_min");
      }, 1000);
      window.setTimeout(() => {
        this.enable = false;
      }, 2000);
    }
  },
  data: () => ({
    enable: true
  }),
  mounted() {
    this.setInitAnimation();
  }
};
</script>
<style scoped lang="scss">
.container_dissolve {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 2;
}
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    padding-left: 1rem;
    height: 90%;
    position: absolute;
    left: -0;
    bottom: 0;
  }
}

.animate_min {
  width: 0%;
  transition: 1s;
}

@keyframes min {
  from {
    width: 100% !important;
  }
  to {
    width: 50% !important;
  }
}
</style>