<template>
  <div>
    <h1>Chatroom</h1>
    <button @click="initializeSession">Habilitar</button>
    <div id="videos">
      <div id="subscriber"></div>
      <div id="publisher"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      apiKey: process.env.VUE_APP_API_KEY_OPENTOK,
      token:
        "T1==cGFydG5lcl9pZD00NjQzODczMiZzaWc9MGM2ZDE3NjRkZjY1ZDMyYTYzMTE0OGM2ZmFlM2I2MTg3MzYyNGQ5YzpzZXNzaW9uX2lkPTJfTVg0ME5qUXpPRGN6TW41LU1UVTNNVEUyTnpJeE1UUXdOSDVYU3k5eVVWbDVXRGx0V2tvelJrZHJabkE0UlZWaFIyOS1mZyZjcmVhdGVfdGltZT0xNTcxMTY3MjI3Jm5vbmNlPTAuMzIwNjIxNjA4MzM2NzAxMDYmcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU3Mzc2MjgyNyZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==",
      sessionId:
        "2_MX40NjQzODczMn5-MTU3MTE2NzIxMTQwNH5XSy9yUVl5WDltWkozRkdrZnA4RVVhR29-fg",
      session: null,
      publisher: null,
      configPublisher: {
        insertMode: "append",
        width: "500px",
        height: "500px"
      }
    };
  },
  created() {
    // this.initializeSession();
  },
  methods: {
    initializeSession() {
      this.session = OT.initSession(this.apiKey, this.sessionId);

      this.publisher = OT.initPublisher(
        "publisher",
        this.configPublisher,
        error => {
          if (error) console.log(error);
        }
      );

      this.session.connect(this.token, function(error) {
        if (error) console.log(error);
        session.publish(this.publisher, err => {
          if (err) console.log(err);
        });
      });
    }
  }
};
</script>
