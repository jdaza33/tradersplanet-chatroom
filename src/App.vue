<template>
  <router-view />
</template>
<style  lang="scss">
* {
  margin: 0;
  padding: 0;
  font-family: "Rubik", sans-serif;
}

a {
  color: #fff;
  text-decoration: none;
  transition: 1s;
}

.md-field {
  background-color: #ffffff !important;
  border: 1.5px solid #aaaaaa;
  padding: 1rem;
  -webkit-box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.47);
  -moz-box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.47);
  box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.47);

  label {
    padding-left: 0.3rem;
  }
  input {
    font-weight: 500;
  }
}
.md-field:after {
  height: 0px !important;
}

a:hover {
  color: #00a0c6;
  text-decoration: none;
  cursor: pointer;
  transition: 1s;
}

:root {
  --md-theme-default-primary: gray !important;
  --md-theme-default-accent: #ff5252;
  --md-theme-default-theme: light;
}

.md-theme-default a:not(.md-button) {
  color: #ffffff !important;
  text-decoration: none;
}
a:not(.md-button):hover {
  text-decoration: none !important;
}
.md-field.md-theme-default.md-focused label {
  color: gray !important;
}

.btn_one {
  height: 3rem;
  font-weight: 100;
  width: 10rem;
  background: #000;
  text-transform: unset;
  color: #fff !important;
  font-size: 16px;
}

.btn_two {
  height: 3rem;
  font-weight: 100;
  width: 10rem;
  background-color: #fff !important;
  border: 1.5px solid #aaaaaa;
  text-transform: unset;
  color: #aaaaaa !important;
  font-size: 16px;
  &:hover {
    background-color: #fff !important;
  }
}
</style>
