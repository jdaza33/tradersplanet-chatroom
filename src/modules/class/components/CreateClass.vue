<template>
  <div
    v-bind:class="{ mobile: isMobile }"
    v-bind:style="{ width: !isMobile && maxWidth ? '36rem' : '30rem' }"
    class="box"
  >
    <div class="box__content">
      <div class="box__content__title">
        Traders
        <span>Planet</span>
      </div>
      <div class="box__content__subtitle">Creacion de Webinario</div>
      <hr />
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
                  >El nombre del webinario es requerido</span
                >
                <span class="md-error" v-else-if="!$v.form.className.minlength"
                  >Tiene que ser mayor a 3 caracteres</span
                >
              </md-field>
              <md-field :class="getValidationClass('channel')">
                <label for="movie">Tipo de canal</label>
                <md-select name="channel" id="channel" v-model="form.channel">
                  <md-option value="private">Privado</md-option>
                  <md-option value="public">Publico</md-option>
                </md-select>
                <span class="md-error" v-if="!$v.form.channel.required"
                  >El tipo de canal es requerido</span
                >
              </md-field>
              <md-field :class="getValidationClass('description')">
                <label for="description">Descripción de la clase</label>
                <md-input
                  type="description"
                  name="description"
                  id="description"
                  v-model="form.description"
                />
                <span class="md-error" v-if="!$v.form.description.required"
                  >La descripción es requerida</span
                >
                <span
                  class="md-error"
                  v-else-if="!$v.form.description.minlength"
                  >Tiene que ser mayor a 10 caracteres</span
                >
              </md-field>
              <div
                v-bind:style="{
                  'flex-direction': isMobile ? 'column !important' : 'row'
                }"
                class="box_display"
              >
                <md-checkbox class="md-primary" v-model="showDate">
                  <p class="bold">
                    {{ showDate ? "Remover" : "Programar Webinario" }}
                  </p>
                </md-checkbox>
                <VueCtkDateTimePicker
                  v-on:is-shown="maxWidth = true"
                  v-on:is-hidden="maxWidth = false"
                  :label="'Introduzca la fecha y hora'"
                  v-if="showDate"
                  v-model="form.date"
                >
                  <label>Fecha programada</label>
                </VueCtkDateTimePicker>
              </div>
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
          >{{ !showDate ? "Iniciar Webinario" : "Guardar" }}</md-button
        >
        <md-button type="submit" @click="close()" class="btn_two md-primary"
          >Cancelar</md-button
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
  props: ["isMobile"],
  data: () => ({
    sending: false,
    maxWidth: false,
    form: {
      className: null,
      channel: "public",
      description: null,
      date: null
    },
    showDate: false
  }),
  validations: {
    form: {
      className: {
        required,
        minLength: minLength(3)
      },
      channel: {
        required
      },
      description: {
        required,
        minLength: minLength(10)
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
    onChangeDate(event) {
      console.log(event);
    },
    clearForm() {
      this.$v.$reset();
      this.form.className = null;
    },
    createClass() {
      this.sending = true;
      console.log(this.form.date);
      window.setTimeout(() => {
        this.clearForm();
        if (!this.showDate) {
          this.$router.push("chatroom");
          return;
        }
        this.$emit("closeCreateDialog", false);
      }, 1500);
    },
    close() {
      this.$emit("closeCreateDialog", false);
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

.box_display {
  display: flex;
}
.md-field {
  margin: 4px 0 16px !important;
}

.mobile {
  width: auto !important;
  margin: 1rem 0rem !important;
  border-radius: 0rem !important;
  padding: 1rem 1rem !important;
}
.box {
  width: 30rem;
  margin: 1rem;
  border-radius: 10px;
  padding: 1rem 2rem;
  background: #ffff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  transition: 1s;
  &__content {
    height: 90%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    &__title {
      font-size: 2rem;
      color: $secondary-color;
      text-align: center;
      margin-bottom: 3rem;
      span {
        color: #000;
        font-weight: 500;
      }
    }
    &__subtitle {
      font-size: 1.5rem;
      margin-bottom: 2rem;
      color: $primary-color;
      margin-top: 1.2rem;
    }
    hr {
      margin-bottom: 1rem;
      margin-bottom: 1rem;
      color: $primary-color;
      background-color: $primary-color;
      opacity: 0.1;
    }
    &__button {
      text-align: center;
      display: flex;
      justify-content: center;
    }
  }
}
</style>
