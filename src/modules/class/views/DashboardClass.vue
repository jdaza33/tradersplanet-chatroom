<template>
  <div>
    <div v-if="enable" class="container_dissolve"></div>
    <div class="container">
      <img
        v-bind:style="{ height: isMobile ? '50% !important' : '90%'}"
        class="avatar"
        src="../../../assets/img/streaming.png"
        alt
      />
      <div v-if="!isMobile" class="main">
        <div class="main__header">
          <p>
            Traders
            <span>Planet</span>
          </p>
        </div>
        <div class="main__first_box">
          <p>Webinarios ({{ webinars.length }})</p>
          <md-button class="btn_one md-primary">Crear Webinario</md-button>
        </div>
        <div class="main__second_box">
          <table>
            <tr>
              <th>
                <p>Autor</p>
              </th>
              <th>
                <p>Nombre del Webinario</p>
              </th>
              <th>
                <p>Descripción</p>
              </th>
              <th>
                <p>Fecha</p>
              </th>
              <th>
                <p>Canal</p>
              </th>
              <th></th>
              <th></th>
            </tr>
            <tr v-for="item in webinars" :key="item.id" class="content">
              <td class="author">
                <img src="../../../assets/img/girl.png" alt="avatar" />
                <p>
                  {{ item.author }}
                  <!--
                  <br />
                  <span>CEO Traders Planet</span>-->
                </p>
              </td>
              <td>
                <p>{{ item.className }}</p>
              </td>
              <td>
                <p>{{ item.description }}</p>
              </td>
              <td>
                <p>{{ item.date }}</p>
              </td>
              <td>
                <md-button class="btn_private md-primary">
                  {{
                  item.channel
                  }}
                </md-button>
              </td>
              <td>
                <md-button class="btn_three md-primary">Unirse</md-button>
              </td>
              <td>
                <div class="buttons">
                  <img src="../../../assets/img/edit.png" alt="update" />
                  <img src="../../../assets/img/delete-button.png" alt="delete" />
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div v-if="isMobile" class="main_mobile">
        <p class="main_mobile__title">
          Traders
          <span>Planet</span>
        </p>
        <p class="main_mobile__subtitle">Webinarios ({{ webinars.length }})</p>

        <md-button class="btn_one md-primary">Crear Webinario</md-button>
        <div v-for="item in webinars" :key="item.id">
          <div class="main_mobile__box">
            <div class="main_mobile__box__item_1 item">Autor</div>
            <div class="main_mobile__box__item_2 item">{{ item.author }}</div>

            <div class="main_mobile__box__item_1 item">Nombre del webinario</div>
            <div class="main_mobile__box__item_2 item">{{ item.className }}</div>

            <div class="main_mobile__box__item_1 item">Descripción</div>
            <div class="main_mobile__box__item_2 item">{{ item.description }}</div>

            <div class="main_mobile__box__item_1 item">Fecha</div>
            <div class="main_mobile__box__item_2 item">{{ item.date }}</div>

            <div class="main_mobile__box__item_1 item">Canal</div>
            <div class="main_mobile__box__item_2 item">
              <md-button class="btn_private md-primary">
                {{
                item.channel
                }}
              </md-button>
            </div>

            <div class="main_mobile__box__item_1 item">
              <md-button class="btn_three md-primary">Unirse</md-button>
            </div>
            <div class="main_mobile__box__icon item">
              <img src="../../../assets/img/edit.png" alt="update" />
              <img src="../../../assets/img/delete-button.png" alt="delete" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "dashboardClass",
  methods: {
    setInitAnimation() {
      window.setTimeout(() => {
        const container = document.querySelector(".container_dissolve");
        container.classList.add("animate_min");
      }, 1000);
      window.setTimeout(() => {
        this.enable = false;
      }, 2000);
    },
    onResize() {
      if (window.innerWidth <= 1280) {
        console.log("active");
        this.isMobile = true;
        return;
      }
      this.isMobile = false;
    }
  },
  data: () => ({
    enable: true,
    isMobile: false,
    webinars: [
      {
        id: 1,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 2,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 3,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      },
      {
        id: 4,
        author: "Maria Manrique",
        className: "Mi primera clase",
        description: "Mi descripcion",
        date: "12/20/19 a las 8:00am",
        channel: "Privado"
      }
    ]
  }),
  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
    this.setInitAnimation();
  }
};
</script>
<style scoped lang="scss">
.container_dissolve {
  height: 100vh;
  width: 100%;
  background-color: #fff;
  position: absolute;
  z-index: 2;
}
.container {
  position: relative;
  width: 100%;
  height: 100vh;
  background-color: #f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;

  .avatar {
    padding-left: 1rem;
    height: 90%;
    position: absolute;
    left: -0;
    bottom: 0;
  }

  .main {
    padding: 3rem 0rem;
    width: 90%;
    background-color: #ffffff;
    z-index: 1;
    border-radius: 10px;
    &__header {
      text-align: center;
      padding-top: 2.3rem;
      p {
        font-size: 2.2rem;
        font-weight: 500;
        color: #aaaaaa;
        span {
          color: #333;
        }
      }
    }
    &__first_box {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
      padding: 1rem 2rem;
      p {
        font-size: 1.5rem;
        font-weight: 500;
      }
    }
    &__second_box {
      display: flex;
      align-items: center;
      justify-content: center;
      table {
        width: 95%;
        border-collapse: collapse;
        tr:first-child {
          background-color: #eeeeee;
          border-style: hidden;
          height: 2.5rem;
          border: none;
        }
        tr {
          width: 100%;
          th {
            font-weight: 500;
            color: #797d8b;
          }
          th,
          td {
            text-align: center;
            p {
              font-size: 1rem;
            }
          }
        }
        .content {
          p {
            color: #464850;
          }
        }
        .buttons {
          display: flex;
          align-items: center;
          justify-content: space-around;
          img {
            height: 1.6rem;
            cursor: pointer;
          }
        }
        .author {
          display: flex;
          align-items: center;
          img {
            height: 4rem;
          }
          p {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            color: #464850;
            span {
              color: #9da1b3;
            }
          }
        }
      }
    }
  }

  .main_mobile {
    z-index: 1;
    height: 100vh;
    width: 100%;
    padding: 4rem 1rem;
    overflow-y: scroll;
    &__title {
      margin-bottom: 3.5rem;
      font-size: 2.4rem;
      font-weight: 500;
      text-align: center;
      color: #aaaaaa;
      span {
        color: #333;
      }
    }
    &__subtitle {
      font-weight: 500;
      font-size: 1.5rem;
      color: #333;
    }
    .btn_one {
      margin: 1rem 0rem !important;
    }
    .btn_three {
      margin: 0 !important;
    }
    .btn_private {
      margin: 0 !important;
    }
    &__box {
      margin-top: 2rem;
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      background: #fff;
      padding: 1rem;
      border-radius: 5px;
      .item {
        flex: 0 50%;
        margin-bottom: 1rem;
      }
      &__item_1 {
        color: #797d8b;
        font-size: 0.9rem;
        font-weight: 500;
        text-transform: uppercase;
      }
      &__item_2 {
        color: #464850;
        font-size: 0.9rem;
        text-align: right;
        justify-content: flex-end;
        display: flex;
        span {
          color: #9da1b3;
        }
      }

      &__icon {
        display: flex;
        justify-content: space-around;
      }
    }
  }
}

.animate_min {
  width: 0%;
  transition: 1s;
}

@keyframes min {
  from {
    width: 100% !important;
  }
  to {
    width: 50% !important;
  }
}
</style>
