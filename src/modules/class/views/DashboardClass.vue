<template>
  <div>
    <div v-if="enable" class="container_dissolve"></div>
    <div class="container">
      <img
        v-bind:style="{ height: isMobile ? '50% !important' : '90%' }"
        class="avatar"
        src="../../../assets/img/streaming.png"
        alt
      />
      <img
        v-bind:style="{
          height: isMobile ? '3rem !important' : 'auto',
          top: isMobile ? '0rem !important' : '1rem'
        }"
        class="avatar_profile"
        src="../../../assets/img/girl.png"
        alt
      />

      <Class :webinars="webinars" :isMobile="isMobile" />
    </div>
  </div>
</template>
<script>
import Class from "../components/Class";
export default {
  name: "dashboardClass",
  methods: {
    setInitAnimation() {
      window.setTimeout(() => {
        const container = document.querySelector(".container_dissolve");
        container.classList.add("animate_min");
      }, 1000);
      window.setTimeout(() => {
        this.enable = false;
      }, 2000);
    },
    onResize() {
      if (window.innerWidth <= 1280) {
        console.log("active");
        this.isMobile = true;
        return;
      }
      this.isMobile = false;
    }
  },
  components: { Class },
  data: () => ({
    enable: true,
    isMobile: false,
    webinars: [
      {
        id: 1,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 2,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 3,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 4,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      }
    ]
  }),
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.setInitAnimation();
  }
};
</script>
<style lang="scss">
.container_dissolve {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 3;
}
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;

  .avatar {
    padding-left: 1rem;
    height: 90%;
    position: absolute;
    left: -0;
    bottom: 0;
  }
  .avatar_profile {
    z-index: 2;
    position: absolute;
    top: 1rem;
    right: 1rem;
    cursor: pointer;
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
