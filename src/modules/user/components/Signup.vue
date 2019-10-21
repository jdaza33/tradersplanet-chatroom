<template>
  <div
    v-if="!isMobile || (isMobile && forgotRoute)"
    class="container__one md-layout-item md-medium-size-100 md-large-size-50 md-small-size-100 md-xsmall-size-100"
  >
    <img class="round" src="../../../assets/img/round.png" alt />
    <div class="container__one__logo">
      <img class="logo" src="../../../assets/img/gray_logo.png" alt />
    </div>
    <div class="container__one__content" v-bind:class="{ mobile: isMobile }">
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
    isMobile: false
  }),
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

      // Instead of this timeout, here you can call your API
      window.setTimeout(() => {
        this.lastUser = `${this.form.email}`;
        console.log("save");
        this.clearForm();
      }, 1500);
    },
    validateUser() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.registerUser();
      }
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
<style lang="scss" scoped>
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
        color: #aaaaaa;
        span {
          color: #000;
          font-weight: 500;
        }
      }
      &__subtitle {
        color: #aaaaaa;
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
    border: 1.5px solid #aaaaaa;
    text-transform: unset;
    color: #aaaaaa !important;
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
}
</style>