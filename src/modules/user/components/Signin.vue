<template>
  <div
    id="content"
    v-if="signinRoute"
    class="container__one md-layout-item md-medium-size-100 md-large-size-50 md-small-size-100 md-xsmall-size-100"
  >
    <Loader v-if="loader" />
    <img class="round" src="../../../assets/img/round.png" alt />
    <div class="container__one__logo">
      <img class="logo" src="../../../assets/img/gray_logo.png" alt />
    </div>
    <div id="formLogin" class="container__one__content" v-bind:class="{ mobile: isMobile }">
      <div class="container__one__content__section_one">
        <p class="container__one__content__section_one__title">
          Traders
          <span>Planet</span>
        </p>
        <p class="container__one__content__section_one__subtitle">
          Bienvenido de vuelta, por favor
          <br />inicia sesión.
        </p>
      </div>
      <div class="container_one__content__form">
        <form novalidate class @submit.prevent="validateUser">
          <div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('email')">
                <label for="email">Correo electronico</label>
                <md-input
                  type="email"
                  name="email"
                  id="email"
                  v-model="form.email"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.email.required">El email es requerido</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.email.minlength"
                >Tiene que ser mayor a 3 caracteres</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('password')">
                <label for="password">Contraseña</label>
                <md-input
                  type="password"
                  name="password"
                  id="password"
                  v-model="form.password"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.password.required">La contraseña es requerida</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.password.minlength"
                >Tiene que ser mayor a 3 caracteres</span>
              </md-field>
            </div>
            <div class="split md-layout-item md-small-size-100">
              <md-checkbox class="md-primary" v-model="rememberme">
                <p>Recuerdame</p>
              </md-checkbox>
              <p class="forgot">Olvide mi contraseña</p>
            </div>
          </div>
          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
        <div class="split min-width">
          <md-button
            type="submit"
            @click="validateUser()"
            class="btn_one md-primary"
            :disabled="sending"
          >Iniciar sesión</md-button>
          <md-button @click="moveElement()" class="btn_two md-primary">Registrate</md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";
import { ServiceFactory } from "../../core/services/ServiceFactory";
const authenticationService = ServiceFactory.get("authenticationService");
export default {
  name: "Signin",
  mixins: [validationMixin],
  props: ["signinRoute"],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    lastUser: null,
    userSaved: false,
    sending: false,
    rememberme: null,
    isMobile: false,
    loader: false
  }),
  components: {
    Loader: () => import("../../shared/components/Loader")
  },
  validations: {
    form: {
      email: {
        required,
        minLength: minLength(3)
      },
      password: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
    login() {
      const user = {
        user: "hola",
        password: "12345"
      };
      authenticationService.login(user).then(
        resp => {
          console.log(resp);
        },
        error => console.log(error)
      );
    },
    getValidationClass(fieldName) {
      const field = this.$v.form[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    clearForm() {
      this.$v.$reset();
      this.form.email = null;
      this.form.password = null;
    },
    saveUser() {
      this.sending = true;
      this.loader = true;
      //SI FALLA
      // window.setTimeout(() => {
      // this.Loader = false;
      // window.setTimeout(() => {
      //   this.disableAnimations();
      //   this.sending = false;
      //   // this.$router.push("dashboard");
      // }, 1000);
      // }, 3000);

      // SI NO FALLA
      window.setTimeout(() => {
        this.Loader = false;
        window.setTimeout(() => {
          this.sending = false;
          this.$router.push("dashboard");
        }, 1000);
      }, 3000);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.animateElements();
        this.clearForm();
        window.setTimeout(() => {
          this.saveUser();
        }, 2000);
      }
    },
    moveElement() {
      if (!this.isMobile) {
        this.$emit("toLeft", {});
        this.clearForm();
        return;
      }
      this.$emit("changeView", this.isMobile);
    },
    onResize() {
      if (window.innerWidth <= 1280) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    animateElements() {
      const form = document.getElementById("formLogin");
      const content = document.getElementById("content");
      const logo = document.querySelector(".logo");
      const container = document.querySelector(".round");
      logo.classList.add("opacity");
      container.classList.add("opacity");
      form.classList.add("animate_dissolve");
      window.setTimeout(() => {
        content.classList.add("animate_extend");
      }, 1000);
    },
    disableAnimations() {
      this.loader = false;
      const form = document.getElementById("formLogin");
      const content = document.getElementById("content");
      const logo = document.querySelector(".logo");
      const container = document.querySelector(".round");
      content.classList.add("animate_dismiss");
      logo.classList.remove("opacity");
      logo.classList.add("opacity_lose");
      container.classList.remove("opacity");
      container.classList.add("opacity_lose");
      window.setTimeout(() => {
        content.classList.remove("animate_extend");
        form.classList.remove("animate_dissolve");
        form.classList.add("animate_appaer");
        window.setTimeout(() => {
          form.classList.remove("animate_appaer");
          container.classList.remove("opacity_lose");
          logo.classList.remove("opacity_lose");
          content.classList.remove("animate_dismiss");
        }, 1000);
      }, 1000);
    }
  },
  mounted() {
    this.login();
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.animate_extend {
  z-index: 3;
  min-width: 100% !important;
  transition: 1s ease-in-out;
}

.animate_dismiss {
  z-index: 3;
  min-width: 50% !important;
  transition: 1s ease-in-out;
}

.opacity_lose {
  animation: show 1s forwards;
}

.opacity {
  animation: hide 1s forwards;
}

.container__one {
  background: #fff;
  position: relative;
  padding-left: 5% !important;
  height: 100vh;
  min-width: 50%;
  max-width: 50%;

  .mobile {
    width: 95%;
  }
  &__content {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    height: 90%;
    transform: translateY(0rem);

    &__section_one {
      height: 8rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      &__title {
        font-size: 3rem;
        color: $secondary-color;
        span {
          color: $primary-color;
          font-weight: 500;
        }
      }
      &__subtitle {
        color: $secondary-color;
        font-size: 1.1rem;
      }
    }
  }

  .min-width {
    width: 22rem;
  }

  button {
    margin: 0;
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
    border: 1.5px solid $secondary-color;
    text-transform: unset;
    color: $secondary-color !important;
    font-size: 16px;
    &:hover {
      background-color: #fff !important;
    }
  }

  .split {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    height: 6rem;
    .md-primary {
      color: gray;
    }
    .forgot {
      font-weight: 500;
    }
  }

  .round {
    position: absolute;
    right: 0;
  }
  .logo {
    height: 4rem;
    padding-top: 1rem;
    opacity: 0.5;
  }

  .animate_dissolve {
    animation: dissolve 1s forwards;
  }
  .animate_appaer {
    animation: appaer 1s forwards;
  }

  @keyframes dissolve {
    from {
      transform: translateY(0rem);
      opacity: 1;
    }
    to {
      transform: translateY(10rem);
      opacity: 0;
    }
  }
  @keyframes appaer {
    from {
      transform: translateY(10rem);
      opacity: 0;
    }
    to {
      transform: translateY(0rem);
      opacity: 1;
    }
  }

  @keyframes max {
    from {
      min-width: 50% !important;
    }
    to {
      min-width: 100% !important;
    }
  }

  @keyframes hide {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  @keyframes show {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>
