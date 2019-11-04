<template>
  <router-view />
</template>
<style lang="scss">
@import "./assets/scss/_variables.scss";

::-webkit-scrollbar {
  width: 3px;
}
::-webkit-scrollbar-track {
  background: #fafafa;
  border-radius: 27px;
}
::-webkit-scrollbar-thumb {
  background: #6359ff;
  border-radius: 27px;
}
* {
  margin: 0;
  padding: 0;
  font-family: "Rubik", sans-serif;
}
h1,
p {
  font-family: "Rubik", sans-serif;
}

a {
  color: #fff;
  text-decoration: none;
  transition: 1s;
}

.md-field {
  background-color: #ffffff !important;
  border: 1.5px solid $secondary-color;
  padding: 1rem;
  -webkit-box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 17px 39px -10px rgba(0, 0, 0, 0.2);

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
  --md-theme-default-primary: #6c63ff !important;
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
  color: $primary-color !important;
}

.btn_one {
  height: 3rem !important;
  font-weight: 100 !important;
  width: 10rem !important;
  background: $primary-color !important;
  text-transform: unset;
  color: #fff !important;
  font-size: 16px;
}

.btn_two {
  height: 3rem !important;
  font-weight: 100 !important;
  width: 10rem !important;
  background-color: #fff !important;
  border: 1.5px solid $secondary-color !important;
  text-transform: unset !important;
  color: $secondary-color !important;
  font-size: 16px !important;
  &:hover {
    background-color: #fff !important;
  }
}
</style>
