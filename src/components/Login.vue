<template>
  <b-container id="login" fluid class="p-0 wrapper">
    <b-card title="Login" header-tag="header" class="h-100">
      <form action="login.php" method="POST">
        <div class="form-group row">
          <div class="offset-md-1 col-md-10">
            <input
              type="text"
              id="username"
              class="form-control"
              name="username"
              placeholder="Insert your username"
              required
              autofocus
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="offset-md-1 col-md-10">
            <input
              type="password"
              id="password"
              class="form-control"
              placeholder="Introduce your password"
              name="password"
              required
            />
          </div>
        </div>

        <div class="form-group row">
          <div class="offset-md-1 col-md-10">
            <button
              type="submit"
              onclick="event.preventDefault(); post();"
              class="btn btn-block btn-primary"
            >
              LOGIN
            </button>
          </div>
        </div>

        <div class="offset-md-1 col-md-10">
          <a class="btn btn-link"> Forgot Your Password? </a>
          <a class="btn btn-link"> Need an account? </a>
        </div>
      </form>
    </b-card>
  </b-container>
</template>

<script>
export default {
  name: "Login",
  props: {
    msg: String,
  },
  methods: {},
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#login {
}
</style>
