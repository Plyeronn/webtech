<template>
  <nav class='navbar navbar-light bg-light border rounded mt-2'>
    <div class='container-fluid'>

      <a class='navbar-brand' href='#'>
        <i class='bi bi-book-half'></i>
        HAUSAUFGABE 4
      </a>

      <div>
        <!-- TODO: implement -->
        <button id = 'btn-dark-mode' class='btn btn-primary me-3' @click="toggleDarkMode">
        <i class='bi bi-robot'></i>
          {{ (!isDark) ? "Dark mode" : "Lights on" }}
          </button>
        <button class='btn btn-primary me-3' type='submit' @click='toggleTests'>
          <i class='bi bi-robot'></i>
          {{ (!testsOpen) ? "Run tests" : "Close tests" }}
        </button>
      </div>

    </div>
  </nav>  
</template>

<script>
export default {
  name: 'NavBar',
  props: ['testsOpen', 'darkThemeUrl','lightThemeUrl' ],
  data() {
    return {
      isDark : false
    };
  },
  methods: {
    toggleDarkMode() {
      this.isDark = !this.isDark;
      document.getElementById('bootstrap-theme').href = this.isDark ? this.darkThemeUrl : this.lightThemeUrl
      // this.isDark ? this.darkThemeUrl : this.lightThemeUrl

      // TODO: implement me
    },
    toggleTests() {
      this.$emit('toggle-tests');
    }    
  }
}
</script>