<template>
  <div
    id="contentRegister"
    v-if="!isMobile || (isMobile && forgotRoute)"
    class="container__one md-layout-item md-medium-size-100 md-large-size-50 md-small-size-100 md-xsmall-size-100"
  >
    <Loader v-if="loader" />
    <img class="roundRegister" src="../../../assets/img/round.png" alt />
    <div class="container__one__logo">
      <img class="logoRegister" src="../../../assets/img/gray_logo.png" alt />
    </div>
    <div id="formRegister" class="container__one__content" v-bind:class="{ mobile: isMobile }">
      <div class="container__one__content__section_one">
        <p class="container__one__content__section_one__title">
          <span>¡Empecemos!</span>
        </p>
        <p class="container__one__content__section_one__subtitle">Ingresa los campos</p>
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
              <md-field :class="getValidationClass('fullname')">
                <label for="email">Nombre completo</label>
                <md-input
                  type="text"
                  name="fullname"
                  id="fullname"
                  v-model="form.fullname"
                  :disabled="sending"
                />
                <span
                  class="md-error"
                  v-if="!$v.form.fullname.required"
                >El nombre completo es requerido</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.fullname.minlength"
                >Tiene que ser mayor a 3 caracteres</span>
              </md-field>
            </div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('phone')">
                <label for="email">Numero telefonico</label>
                <md-input
                  type="number"
                  name="phone"
                  id="phone"
                  v-model="form.phone"
                  :disabled="sending"
                />
                <span class="md-error" v-if="!$v.form.phone.required">El numero es requerido</span>
                <span
                  class="md-error"
                  v-else-if="!$v.form.phone.minlength"
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
          </div>
          <md-snackbar :md-active.sync="userSaved">The user {{ lastUser }} was saved with success!</md-snackbar>
        </form>
        <div class="split min-width">
          <md-button
            type="submit"
            @click="validateUser()"
            class="btn_one md-primary"
            :disabled="sending"
          >Registrarse</md-button>
          <md-button @click="moveElement()" class="btn_two md-primary">Volver</md-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "Signup",
  props: ["forgotRoute"],
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null,
      fullname: null,
      phone: null
    },
    lastUser: null,
    userSaved: false,
    sending: false,
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
      },
      fullname: {
        required,
        minLength: minLength(3)
      },
      phone: {
        required,
        minLength: minLength(3)
      }
    }
  },
  methods: {
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
      this.form.phone = null;
      this.form.fullname = null;
    },

    moveElement() {
      if (!this.isMobile) {
        this.$emit("toRight", {});
        this.clearForm();
        return;
      }
      this.$emit("changeView", this.isMobile);
    },
    registerUser() {
      this.sending = true;
      this.loader = true;
      //SI FALLA
      window.setTimeout(() => {
        this.Loader = false;
        window.setTimeout(() => {
          this.disableAnimations();
          this.sending = false;
          // this.$router.push("dashboard");
        }, 1000);
      }, 3000);

      // SI NO FALLA
      // window.setTimeout(() => {
      //   this.Loader = false;
      //   window.setTimeout(() => {
      //     this.sending = false;
      //     this.$router.push("dashboard");
      //   }, 1000);
      // }, 3000);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.animateElements();
        this.clearForm();
        window.setTimeout(() => {
          this.registerUser();
        }, 2000);
      }
    },
    animateElements() {
      const form = document.getElementById("formRegister");
      const content = document.getElementById("contentRegister");
      const logo = document.querySelector(".logoRegister");
      const container = document.querySelector(".roundRegister");
      logo.classList.add("opacity");
      container.classList.add("opacity");
      form.classList.add("animate_dissolve");
      window.setTimeout(() => {
        content.classList.add("animate_extend");
      }, 1100);
    },
    disableAnimations() {
      this.loader = false;
      const form = document.getElementById("formRegister");
      const content = document.getElementById("contentRegister");
      const logo = document.querySelector(".logoRegister");
      const container = document.querySelector(".roundRegister");
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
    console.log(this.forgotRoute);
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.md-field,
.md-button {
  z-index: 1 !important;
}

.animate_extend {
  z-index: 4 !important;
  min-width: 100% !important;
  transition: 1s ease-in-out !important;
}

.animate_dismiss {
  z-index: 4 !important;
  min-width: 50% !important;
  transition: 1s ease-in-out !important;
}

.animate_dissolve {
  animation: dissolve 1s forwards;
}
.animate_appaer {
  animation: appaer 1s forwards;
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
  height: 100vh;
  padding-left: 5% !important;
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

  .roundRegister {
    position: absolute;
    right: 0;
  }
  .logoRegister {
    height: 4rem;
    padding-top: 1rem;
    opacity: 0.5;
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
