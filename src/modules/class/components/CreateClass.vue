<template>
  <div class="box">
    <div class="box__content">
      <div class="box__content__title">
        Traders
        <span>Planet</span>
      </div>
      <div class="box__content__subtitle">Indica el nombre de la clase</div>
      <div class="box__content__form">
        <form novalidate class @submit.prevent="validateClass">
          <div>
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('className')">
                <label for="className">Nombre de la clase</label>
                <md-input
                  type="className"
                  name="className"
                  id="className"
                  v-model="form.className"
                />
                <span class="md-error" v-if="!$v.form.className.required"
                  >El className es requerido</span
                >
                <span class="md-error" v-else-if="!$v.form.className.minlength"
                  >Tiene que ser mayor a 3 caracteres</span
                >
              </md-field>
            </div>
          </div>
        </form>
      </div>
      <div class="box__content__button">
        <md-button
          type="submit"
          @click="validateClass()"
          class="btn_one md-primary"
          :disabled="sending"
          >Iniciar streaming</md-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, minLength } from "vuelidate/lib/validators";

export default {
  name: "CreateClass",
  mixins: [validationMixin],
  data: () => ({
    sending: false,
    form: {
      className: null
    }
  }),
  validations: {
    form: {
      className: {
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
      this.form.className = null;
    },
    createClass() {
      this.sending = true;
      window.setTimeout(() => {
        this.clearForm();
        this.$router.push("chatroom");
      }, 1500);
    },
    validateClass() {
      this.$v.$touch();

      if (!this.$v.$invalid) {
        this.createClass();
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../assets/scss/_variables.scss";

.box {
  height: 20rem;
  width: 35rem;
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem 2rem;
  background: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  &__content {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &__title {
      font-size: 2.5rem;
      color: $secondary-color;
      text-align: center;
      span {
        color: #000;
        font-weight: 500;
      }
    }
    &__subtitle {
      font-size: 1.2rem;
      color: $secondary-color;
      margin-top: 1.2rem;
    }
    &__button {
      text-align: center;
    }
  }
}
</style>
