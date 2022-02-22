<template>
  <!-- TODO: implement me 
    <img src='@/assets/BooksListPagination.jpg' class='img-fluid rounded' alt=''>

  -->
  <div>
    <button id = "pagination-back-button" :disabled=" this.page == 0 " :class=" 'this.page == 0' ? 'disabled' : 'enabled' " v-on:click="previousPage">Previous</button>
    <button id = "pagination-next-button" :disabled=" this.page == this.maxPage " :class=" 'this.page == this.maxPage' ? 'disabled' : 'enabled' " v-on:click="nextPage">Next</button>
  </div>

</template>

<script>
export default {
  name: 'BooksListPagination',
  props:['page', 'maxPage'],
  methods: {
    nextPage() {
      
      this.$emit('clicked', this.page+1)
    },
    previousPage() {
      this.$emit('clicked', this.page-1)

    }
  },
  computed: {
    disableButtons(){
      if (this.page == 0){
        document.getElementById("pagination-back-button").className="disabled";
      }
      return true
    }
  }
}
</script>