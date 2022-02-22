<template>
  <!-- TODO: implement me -->
  <div id="book">
    <img id="book-image" :src="imgsrc" class='img-fluid rounded' alt=''>
    <div id="book-title">{{booktitle}}</div>
    <div v-for="(value, name) in restdata" :key="name">
      <div><b>{{name}}</b> </div><div class="book-property"> {{value}}</div>
    </div>
    <!--<img src='@/assets/BookView.jpg' class='img-fluid rounded' alt=''>-->
  </div>
</template>

<script>
export default {
  name: 'BookVue',
  props:['bookdata'],
  computed:{
    imgsrc() {
      return ''+this.bookdata.thumbnail
    },
    booktitle() {
      let result = this.bookdata.title
      if (this.bookdata.subtitle.length > 0) {
        result+=' - ' + this.bookdata.subtitle
      }
      return result
    },
    restdata() {
      let copy = {...this.bookdata}
      Reflect.deleteProperty(copy, 'thumbnail')
      Reflect.deleteProperty(copy, 'title')
      Reflect.deleteProperty(copy, 'subtitle')
      return Object.keys(copy).sort().reduce((r, k) => (r[k] = copy[k], r), {})
      //return copy 
    }
  }
}
</script>