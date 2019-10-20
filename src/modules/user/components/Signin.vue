<template>
  <div class="container__one">
    <img class="round" src="../../../assets/img/round.png" alt />
    <div class="container__one__logo">
      <img class="logo" src="../../../assets/img/gray_logo.png" alt />
    </div>
    <div class="container__one__content">
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

export default {
  name: "Signin",
  mixins: [validationMixin],
  data: () => ({
    form: {
      email: null,
      password: null
    },
    lastUser: null,
    userSaved: false,
    sending: false,
    rememberme: null
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
    },
    saveUser() {
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
        this.saveUser();
      }
    },
    moveElement() {
      this.$emit("toLeft", {});
      this.clearForm();
    }
  }
};
</script>
<style lang="scss" scoped>
.container__one {
  width: 50%;
  background: #fff;
  position: relative;
  padding-left: 7rem;

  &__content {
    width: 30rem;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 5rem;
    height: 65%;

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