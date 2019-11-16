<template>
  <div v-bind:class="{ low: isMobile }" class="main">
    <img
      @click="navigateTo('dashboard')"
      src="../../../assets/img/arrow_back.png"
      class="arrow_back"
      alt
    />
    <div class="main__wrapper">
      <div class="main__wrapper__header">
        <img class="avatar_profile" src="../../../assets/img/girl_1.png" alt />
        <p class="title">{{ this.form.name }}</p>
        <p class="subtitle">{{ this.form.summary }}</p>
      </div>
      <div
        v-bind:style="{ width: !isMobile ? '50%' : '100%' }"
        class="main__wrapper__information"
      >
        <div class="main__wrapper__information__item">
          <div class="center_label">
            <p class="label">Correo electronico</p>
          </div>
          <div
            v-bind:style="{ width: !emailActive ? '60%' : '50%' }"
            class="center_text"
          >
            <p v-if="!emailActive" class="information">
              {{ this.userInfo.email | truncate(17, "...", this.isMobile) }}
            </p>
            <md-field v-if="emailActive" :class="getValidationClass('email')">
              <label for="email">Correo electronico</label>
              <md-input
                type="email"
                name="email"
                id="email"
                v-model="form.email"
              />
              <span class="md-error" v-if="!$v.form.email.required"
                >El email es requerido</span
              >
              <span class="md-error" v-else-if="!$v.form.email.minlength"
                >Tiene que ser mayor a 3 caracteres</span
              >
            </md-field>
          </div>
          <div
            v-bind:style="{ width: !emailActive ? '20%' : '30%' }"
            class="buttons"
          >
            <md-button
              :disabled="sending"
              v-if="!emailActive"
              @click="emailActive = true"
              class="btn_private md-primary"
              >Actualizar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="emailActive"
              @click="validateUser('email')"
              class="btn_private md-primary"
              >Guardar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="emailActive"
              @click="emailActive = false"
              class="btn_cancel md-primary"
              >Cancelar</md-button
            >
          </div>
        </div>
        <hr />

        <div class="main__wrapper__information__item">
          <div class="center_label">
            <p class="label">Nombre completo</p>
          </div>
          <div
            v-bind:style="{ width: !nameActive ? '60%' : '50%' }"
            class="center_text"
          >
            <p v-if="!nameActive" class="information">
              {{ this.userInfo.name | truncate(15, "...", this.isMobile) }}
            </p>
            <md-field v-if="nameActive" :class="getValidationClass('name')">
              <label for="text">Nombre completo</label>
              <md-input type="name" name="name" id="name" v-model="form.name" />
              <span class="md-error" v-if="!$v.form.name.required"
                >El nombre completo es requerido</span
              >
              <span class="md-error" v-else-if="!$v.form.name.minlength"
                >Tiene que ser mayor a 3 caracteres</span
              >
            </md-field>
          </div>
          <div
            v-bind:style="{ width: !nameActive ? '20%' : '30%' }"
            class="buttons"
          >
            <md-button
              :disabled="sending"
              v-if="!nameActive"
              @click="nameActive = true"
              class="btn_private md-primary"
              >Actualizar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="nameActive"
              @click="validateUser('name')"
              class="btn_private md-primary"
              >Guardar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="nameActive"
              @click="nameActive = false"
              class="btn_cancel md-primary"
              >Cancelar</md-button
            >
          </div>
        </div>
        <hr />

        <div class="main__wrapper__information__item">
          <div class="center_label">
            <p class="label">Numero de telefono</p>
          </div>

          <div
            v-bind:style="{ width: !phoneActive ? '60%' : '50%' }"
            class="center_text"
          >
            <p v-if="!phoneActive" class="information">
              {{ this.userInfo.phone }}
            </p>
            <md-field v-if="phoneActive">
              <label for="phone">Numero de telefono</label>
              <md-input
                type="phone"
                name="phone"
                id="phone"
                v-model="form.phone"
              />
            </md-field>
          </div>
          <div
            v-bind:style="{ width: !phoneActive ? '20%' : '30%' }"
            class="buttons"
          >
            <md-button
              :disabled="sending"
              v-if="!phoneActive"
              @click="phoneActive = true"
              class="btn_private md-primary"
              >Actualizar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="phoneActive"
              @click="validateUser('phone')"
              class="btn_private md-primary"
              >Guardar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="phoneActive"
              @click="phoneActive = false"
              class="btn_cancel md-primary"
              >Cancelar</md-button
            >
          </div>
        </div>
        <hr />

        <div class="main__wrapper__information__item">
          <div class="center_label">
            <p class="label">Ocupación</p>
          </div>

          <div
            v-bind:style="{ width: !summaryActive ? '60%' : '50%' }"
            class="center_text"
          >
            <p v-if="!summaryActive" class="information">
              {{ this.userInfo.summary }}
            </p>
            <md-field v-if="summaryActive">
              <label for="text">Ocupación</label>
              <md-input
                type="text"
                name="summary"
                id="summary"
                v-model="form.summary"
              />
            </md-field>
          </div>
          <div
            v-bind:style="{ width: !summaryActive ? '20%' : '30%' }"
            class="buttons"
          >
            <md-button
              :disabled="sending"
              v-if="!summaryActive"
              @click="summaryActive = true"
              class="btn_private md-primary"
              >Actualizar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="summaryActive"
              @click="validateUser('summary')"
              class="btn_private md-primary"
              >Guardar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="summaryActive"
              @click="summaryActive = false"
              class="btn_cancel md-primary"
              >Cancelar</md-button
            >
          </div>
        </div>
        <hr />

        <div class="main__wrapper__information__item">
          <div class="center_label">
            <p class="label">Contraseña</p>
          </div>

          <div
            v-bind:style="{ width: !passwordActive ? '60%' : '50%' }"
            class="center_text"
          >
            <p v-if="!passwordActive" class="information">
              {{ this.userInfo.password }}
            </p>
            <md-field
              v-if="passwordActive"
              :class="getValidationClass('password')"
            >
              <label for="password">Contraseña</label>
              <md-input
                type="password"
                name="password"
                id="password"
                v-model="form.password"
              />
              <span class="md-error" v-if="!$v.form.password.required"
                >El contraseña es requerido</span
              >
              <span class="md-error" v-else-if="!$v.form.password.minlength"
                >Tiene que ser mayor a 3 caracteres</span
              >
            </md-field>
          </div>
          <div
            v-bind:style="{ width: !passwordActive ? '20%' : '30%' }"
            class="buttons"
          >
            <md-button
              :disabled="sending"
              v-if="!passwordActive"
              @click="passwordActive = true"
              class="btn_private md-primary"
              >Actualizar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="passwordActive"
              @click="validateUser('password')"
              class="btn_private md-primary"
              >Guardar</md-button
            >
            <md-button
              :disabled="sending"
              v-if="passwordActive"
              @click="passwordActive = false"
              class="btn_cancel md-primary"
              >Cancelar</md-button
            >
          </div>
        </div>
        <hr />
      </div>
    </div>
  </div>
</template>
<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "UserProfile",
  mixins: [validationMixin],
  data: () => ({
    emailActive: false,
    nameActive: false,
    passwordActive: false,
    phoneActive: false,
    summaryActive: false,
    isMobile: false,
    sending: false,
    userInfo: {
      email: "manri725@gmail.com",
      password: "********",
      name: "Maria Jose Manrique Ayaro",
      phone: "3196743065",
      summary: ""
    },
    form: {
      email: null,
      password: null,
      name: null,
      phone: null,
      summary: null
    }
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
      name: {
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
    validateUser(inputName) {
      this.$v.$touch();
      console.log("holis");
      console.log(this.form.email);
      if (!this.$v.$invalid) {
        this.sending = true;
        window.setTimeout(() => {
          this.sending = false;
          this.saveUser(inputName);
        }, 2000);
      }
    },
    navigateTo(route) {
      this.$router.push(route);
    },
    saveUser(inputName) {
      const info = {
        name: this.form.name,
        email: this.form.email,
        password: this.form.password,
        phone: this.form.phone,
        summary: this.form.summary
      };
      console.log(info);
      this.closeInput(inputName);
    },
    onResize() {
      if (window.innerWidth <= 1280) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    },
    truncName(name) {
      return name.truncName(10);
    },
    back() {
      alert("hola");
    },
    closeInput(inputName) {
      switch (inputName) {
        case "email":
          this.emailActive = false;
          break;
        case "phone":
          this.phoneActive = false;
          break;
        case "password":
          this.passwordActive = false;
          break;
        case "name":
          this.nameActive = false;
          break;
        case "summary":
          this.summaryActive = false;
          break;
      }
    }
  },
  filters: {
    truncate: function(text, length, suffix, isMobile) {
      if ((text.length > length, isMobile)) {
        return text.substring(0, length) + suffix;
      } else {
        return text;
      }
    }
  },
  mounted() {
    this.form.email = this.userInfo.email;
    this.form.password = this.userInfo.password;
    this.form.name = this.userInfo.name;
    this.form.phone = this.userInfo.phone;
    this.form.summary = this.userInfo.summary;
    this.onResize();
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.container_dissolve {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 3;
}

.low {
  .arrow_back {
    top: -1rem !important;
    height: 1.5rem !important;
    left: 1rem !important;
  }
  .main__wrapper {
    padding-top: 1rem;
  }
  .main__wrapper__header {
    margin-bottom: 0 !important;
  }
  .avatar_profile {
    height: 5rem !important;
  }
  .center_text {
    width: 50% !important;

    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }

  .buttons {
    width: 30% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    flex-direction: column !important;
  }
  p,
  input,
  label {
    font-size: 0.7rem !important;
  }
  input {
    width: 10% !important;
  }
  button {
    margin-bottom: 1rem !important;
  }
  .md-button {
    width: auto !important;
    font-size: 0.6rem !important;
    margin: 0;
  }
  .main__wrapper__information {
    padding: 1rem;
  }
}
.main {
  height: 100vh;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-top: 2rem;
  position: relative;
  .arrow_back {
    position: absolute;
    top: 0rem;
    height: 1.5rem !important;
    left: 2rem;
    cursor: pointer;
  }
  .md-button {
    font-size: 0.8rem !important;
  }
  .center_text {
    width: 50%;
  }
  .center_label {
    width: 20%;
  }

  .buttons {
    width: 20%;
  }
  .md-field {
    height: 3.5rem !important;
    width: 80% !important;
    margin: 0 !important;
  }
  &__wrapper {
    width: 100%;
    justify-content: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__header {
      margin-bottom: 2rem;
      text-align: center;
      img {
        height: 10rem;
      }
      .title {
        font-size: 1.3rem;
        margin-top: 1rem;
        text-align: center;
        color: $title-text-color;
        margin-bottom: 0.5rem;
      }
      .subtitle {
        color: $subtitle-text-color;
        text-align: center;
        font-size: 1rem;
      }
    }
    &__information {
      width: 50%;

      hr {
        margin-bottom: 1rem;
        margin-bottom: 1rem;
        color: $primary-color;
        background-color: $primary-color;
        opacity: 0.1;
      }
      &__item {
        margin-bottom: 0.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .label {
          text-align: left;
        }
        p {
          font-size: 1.1rem;
          color: $title-text-color;
        }
        .information {
          font-weight: 500;
          text-align: center;
        }
        md-button {
          text-align: right;
        }
      }
    }
  }
}
</style>
