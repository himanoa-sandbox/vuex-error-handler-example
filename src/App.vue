<template>
  <div id="app">
    <div class="navbar">
      <p class="title">example!</p>
    </div>
    <div class="box">
      <a class="button is-primary" @click="ok">押すとOKが出るボタン</a>
      <a class="button is-danger" @click="onClickFail">押すと例外が飛ぶボタン</a>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: 'app',
  methods: {
    ...mapActions("example", ["ok", "fail"]),
    onClickFail(e) {
      this.fail().catch(err => {
        this.$toasted.show(err.message, {
          position: "top-center"
        })
      })
    }
  }
}
</script>

<style>
* {
  box-sizing: inherit;
}
html, body {
  height: 100%;
  margin: 0;
}
div {
  display: block;
}
.box {
  padding: 1em;
  margin: 1em;
}
.button {
  border: 1px solid;
  padding: 0.5rem;
  padding-left: 1rem;
  padding-right: 1rem;
  display: inline-block;
  cursor: pointer;
}
.is-primary {
  background-color: #0074bf;
  color: #fff;
}
.is-danger {
  background-color: #c60019;
  color: #fff;
}
.navbar {
  flex: 1;
  background-color: #d16b16;
  padding-left: 0.5rem;
  font-weight: bold;
  color: #fff;
}
#app {
  color: #2c3e50;
  display: flex;
  flex-direction: column;
}
</style>
