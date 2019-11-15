<template>
  <div id="loader">
    <img src="../../../assets/img/loaderLogo.png" alt />
  </div>
</template>
<script>
export default {
  name: "Loader"
};
</script>
<style scoped lang="scss">
#loader {
  position: absolute;
  height: -3rem;
  top: 50%;
  z-index: 99;
  transform: translate(-50%, -50%);
  left: 50%;
  img {
    height: 7rem;
    animation: bounce 1s infinite alternate;
  }

  @keyframes bounce {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
