<template>
  <div class="container">
    <tests v-if="testing"></tests>
    <div class="row">
      <div class="col">
        <nav-bar :tests-open="testing" @toggle-tests="toggleTests"> </nav-bar>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <work-space-app :bookdata="dataToShow"></work-space-app>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import Tests from "./components/Tests.vue";
import WorkSpaceApp from "./components/WorkSpaceApp.vue";
import axios from "axios";
import books from "../server/books.json";

const serverUrl = "http://localhost:8000";

export default {
  name: "App",
  components: {
    NavBar,
    Tests,
    WorkSpaceApp,
  },
  data() {
    return {
      testing: false,
    };
  },
  computed: {
    dataToShow() {
      return books[0];
    },
  },
  methods: {
    toggleTests() {
      this.testing = !this.testing;
    },
    get(path) {
      axios
        .get(serverUrl + path)
        .then((response) => {
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.css";
@import "./styles/app.css";
</style>
<!-- MAKE MORE DISTANCE BETWEEN NAV BAR AND BOOKVIEW -->