<template>
  <div class="chatroom">
    <div class="chatroom__profile_bar">
      <div class="chatroom__profile_bar__box">
        <img src="../../../assets/img/gray_logo.png" alt="logo" />
      </div>
    </div>
    <div class="chatroom__streaming">
      <div class="chatroom__streaming__header">
        <div class="chatroom__streaming__header__section_1">
          <img src="../../../assets/img/girl.png" alt="avatar" />
          <p>
            Maria
            <br />Manrique
          </p>
          <div class="live">En vivo</div>
        </div>
        <div class="chatroom__streaming__header__section_2">
          Finalizar clase
        </div>
      </div>
      <div class="chatroom__streaming__video">
        <div @click="fullScreen" class="chatroom__streaming__video__fullscreen">
          <i class="fas fa-compress"></i>
        </div>
      </div>
      <div id="videos">
        <div id="subscribers" v-for="(stream, index) in streams" :key="index">
          <subscriber
            @error="errorHandler"
            :opts="configSubscriber"
            :stream="stream"
            :session="session"
          ></subscriber>
        </div>
        <div class="hola" id="publisher"></div>
      </div>
      <div class="chatroom__streaming__footer">
        <h1>Clase numero 1</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime,
          ratione! Molestiae praesentium dolorem ad impedit quia exercitationem
          amet quod minus fugit, totam obcaecati? Officia a explicabo
          perferendis illo, ratione dicta.
        </p>
      </div>
    </div>
    <div class="chatroom__box">
      <div class="chatroom__box__header">
        <i @click="handleChatView()" class="fas" :class="arrow"></i>
        <p v-if="hideChat">Chat del streaming</p>
      </div>
      <div @scroll="onScroll" v-if="hideChat" class="chatroom__box__messages">
        <div
          v-for="message in messages"
          :key="message.text"
          class="chatroom__box__messages__data"
        >
          <div class="chatroom__box__messages__data__profile">VM</div>
          <div class="chatroom__box__messages__data__message">
            {{ message.text }}
          </div>
        </div>
      </div>
      <div v-if="hideChat" class="chatroom__box__text">
        <form novalidate class>
          <textarea
            type="text"
            name="message"
            id="message"
            v-model="form.message"
            maxlength="100"
            @keypress="onSendMessageKeyboard()"
            placeholder="Mensaje rapido..."
          ></textarea>
        </form>
        <img
          @click="validateMessage()"
          src="../../../assets/img/send.png"
          alt="Enviar"
        />
      </div>
    </div>
  </div>
</template>

<script>
import OT from "@opentok/client";
import Subscriber from "../components/Subscriber";
import { required } from "vuelidate/lib/validators";
const $ = require("jquery");
export default {
  components: { Subscriber },
  data() {
    return {
      apiKey: "46438732",
      token:
        "T1==cGFydG5lcl9pZD00NjQzODczMiZzaWc9MGM2ZDE3NjRkZjY1ZDMyYTYzMTE0OGM2ZmFlM2I2MTg3MzYyNGQ5YzpzZXNzaW9uX2lkPTJfTVg0ME5qUXpPRGN6TW41LU1UVTNNVEUyTnpJeE1UUXdOSDVYU3k5eVVWbDVXRGx0V2tvelJrZHJabkE0UlZWaFIyOS1mZyZjcmVhdGVfdGltZT0xNTcxMTY3MjI3Jm5vbmNlPTAuMzIwNjIxNjA4MzM2NzAxMDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3Mzc2MjgyNyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==",
      sessionId:
        "2_MX40NjQzODczMn5-MTU3MTE2NzIxMTQwNH5XSy9yUVl5WDltWkozRkdrZnA4RVVhR29-fg",
      session: null,
      publisher: null,
      configPublisher: {
        insertMode: "append",
        width: "500px",
        height: "550px"
      },
      configSubscriber: {
        insertMode: "append",
        width: "250px",
        height: "250px"
      },
      streams: [],
      form: {
        message: null
      },
      firstTime: true,
      messages: [],
      hideChat: true,
      arrow: "fa-arrow-right",
      onBottom: true
    };
  },
  validations: {
    form: {
      message: {
        required
      }
    }
  },
  created() {
    this.initializeSession();
    this.session = OT.initSession(this.apiKey, this.sessionId);
    this.session.connect(this.token, function(error) {
      if (error) console.log(error);
    });

    if (this.publisher != null) {
      this.publisher.on("streamCreated", function() {
        console.log("The publisher started streaming.");
      });
      this.publisher.on("streamDestroyed", function() {
        console.log("The publisher stopped streaming. Reason: " + event.reason);
      });
    }

    this.session.on("streamCreated", event => {
      console.log(event);
      this.streams.push(event.stream);
    });
  },
  methods: {
    validateMessage() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sendMessage();
      }
    },
    handleChatView() {
      this.hideChat = !this.hideChat;
      const videoStreaming = document.querySelector(".chatroom__streaming");
      const chatBox = document.querySelector(".chatroom__box");
      const arrow = document.querySelector(".fa-arrow-right");
      if (!this.hideChat) {
        this.arrow = "fa-arrow-left";
        videoStreaming.setAttribute("style", "width: 90%;");
        chatBox.setAttribute("style", "width: 5%");
        arrow.setAttribute("style", "width: 100%; text-align:center");
      } else {
        const arrow = document.querySelector(".fa-arrow-left");
        this.arrow = "fa-arrow-right";
        videoStreaming.removeAttribute("style");
        chatBox.removeAttribute("style");
        arrow.removeAttribute("style");
      }
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      if (scrollTop + clientHeight >= scrollHeight) {
        this.onBottom = true;
      } else {
        this.onBottom = false;
      }
    },
    onSendMessageKeyboard() {
      let key = window.event.keyCode;
      if (key === 13) {
        this.sendMessage();
      }
    },
    sendMessage() {
      const message = {
        classId: "123",
        email: "text",
        text: this.form.message
      };
      this.messages.push(message);
      if (this.onBottom) {
        this.scrollToBottom();
      }
      this.clearForm();
    },
    clearForm() {
      this.$v.$reset();
      this.form.message = null;
    },
    scrollToBottom() {
      $(".chatroom__box__messages")
        .stop()
        .animate(
          { scrollTop: $(".chatroom__box__messages")[0].scrollHeight },
          1000
        );
    },
    fullScreen() {
      const elem = document.querySelector(".OT_publisher");
      if (elem.requestFullscreen) {
        elem.requestFullscreen();
      } else if (elem.mozRequestFullScreen) {
        /* Firefox */
        elem.mozRequestFullScreen();
      } else if (elem.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        elem.webkitRequestFullscreen();
      } else if (elem.msRequestFullscreen) {
        /* IE/Edge */
        elem.msRequestFullscreen();
      }
    },
    initializeSession() {
      this.publisher = OT.initPublisher(
        "publisher",
        this.configPublisher,
        error => {
          if (error) console.log(error);
        }
      );
      this.session.publish(this.publisher, err => {
        if (err) console.log(err);
      });
    }
  },
  mounted() {
    window.setTimeout(() => {
      document
        .querySelector(".chatroom__streaming__video")
        .appendChild(document.querySelector(".OT_publisher"));
    }, 1);
  }
};
</script>

<style lang="scss">
.OT_fit-mode-cover .OT_video-element {
  object-fit: contain !important;
}
.chatroom {
  display: flex;

  &__profile_bar {
    width: 5%;
    height: 100vh;
    background-color: #fafafa;
    &__box {
      height: 13%;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid #f2f2f2;
    }
  }
  &__streaming {
    width: 65%;
    transition: 1s;
    &__video {
      position: relative;
      &__fullscreen {
        position: absolute;
        z-index: 1;
        background: #fff;
        width: 3rem;
        bottom: 10px;
        right: 10px;
        display: flex;
        height: 3rem;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        i {
          font-size: 1.5rem;
        }
      }
    }
    &__header {
      display: flex;
      justify-content: space-between;
      padding: 0rem 3rem;
      height: 13%;
      background-color: #ffffff;
      align-items: center;
      border-bottom: 2px solid #f2f2f2;
      &__section_1 {
        display: flex;
        width: 17rem;
        align-items: center;
        justify-content: space-between;
        p {
          font-family: "Rubik", sans-serif;
          font-weight: 500;
          color: #000;
          font-size: 1rem;
        }
        .live {
          color: #fff;
          font-family: "Rubik", sans-serif;
          background-color: #c90101;
          height: 2rem;
          width: 5rem;
          font-size: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 5px;
          font-weight: 500;
        }
      }
      &__section_2 {
        color: #fff;
        font-family: "Rubik", sans-serif;
        background-color: #6359ff;
        height: 2rem;
        padding: 1rem;
        cursor: pointer;
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 5px;
        font-weight: 500;
        transition: 1s;
        &:hover {
          background-color: #4840bd;
          transition: 1s;
        }
      }
    }
    &__footer {
      padding: 1rem;
      h1 {
        font-weight: 400;
      }
      p {
        margin-top: 1rem;
        font-size: 1rem;
      }
    }
    .OT_publisher {
      width: 100% !important;
    }
  }
  &__box {
    width: 30%;
    transition: 1s;
    background-color: #fafafa;
    height: 100vh;
    &__header {
      height: 13%;
      background: #ffffff;
      border: 2px solid #f2f2f2;
      display: flex;
      align-items: center;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      i {
        width: 20%;
        cursor: pointer;
        padding: 1rem;
        font-size: 1.5rem;
      }
      p {
        font-size: 2rem;
        width: 80%;
      }
    }
    &__text {
      height: 9%;
      background: #ffffff;
      border: 2px solid #f2f2f2;
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      form {
        height: 100%;
        width: 100%;
      }
      textarea {
        font-size: 1rem;
        padding-right: 5rem !important;
        border: none;
        width: 100%;
        height: 100%;
        resize: none;
        padding: 1rem;
      }
      textarea:focus,
      input:focus {
        outline: none;
      }
      img {
        height: 3rem !important;
        right: 10px;
        position: absolute;
      }
    }
    &__messages {
      height: 78%;
      border-left: 2px solid #f2f2f2;
      overflow-y: scroll;
      background: #fafafa;

      &__data {
        width: 100%;
        padding: 0.2rem 1rem;
        &__profile {
          width: 3rem;
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          background: blue;
          border-radius: 50%;
          font-size: 1rem;
          font-weight: 500;
          color: #fff;
        }
        &__message {
          margin-left: 2rem;
          margin-top: 0.5rem;
          margin-bottom: 1rem;
          background: #fff;
          word-break: break-all;
          word-wrap: break-word;
          border-radius: 8px;
          min-height: 3rem;
          padding: 1rem;
          -webkit-box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.14);
          -moz-box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.14);
          box-shadow: 0px 0px 32px 0px rgba(0, 0, 0, 0.14);
        }
      }
    }
  }
}
</style>
