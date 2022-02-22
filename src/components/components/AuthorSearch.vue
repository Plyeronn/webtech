<template>
  <!-- TODO: implement me -->
  <!--<img src='@/assets/AuthorSearch.jpg' class='img-fluid rounded' alt=''>-->
  <p>AuthorSearch</p>
  <div class="search-wrapper">
    <label>Search books of author:</label>
    <p><input class="form-control mb-3" 
        type="text"  
        v-model="author" 
        placeholder="Steven King, ..."
        @input="passSearchString"/></p>
  </div>
</template>

<script>
export default {
  name: 'AuthorSearch',
  props:['authorsdata'],
  data() {
    return{
    author: '',
    };
  },
  methods: {
    testSearch(author) {
      this.$emit('select-author', author);
    },
    passSearchString() {
      //console.log(this.author)
      this.testSearch(this.author)
      return true
    }
  }
}
</script>