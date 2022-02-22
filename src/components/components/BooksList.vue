<template>
  <!-- TODO: implement me -->
  <!--<img src='@/assets/BooksList.jpg' class='img-fluid rounded' alt=''> -->
   <tr v-for="(valule, index) in BooksList"
         :key = "index">
       
            <td>{{ value.title }}</td>
        </tr>
  
<div id = "books" class="form-control mb-3">
  <div class="book" v-show="page*windowSize + index!=selectedIndex" v-on:click="selectItem(index)" v-for="(value, index) in getBooks"
  :key="index">
      <div class = "book-title">{{value.title}}</div>
      <div class = "book-authors" style = "font-size: x-small;">{{value.authors}}</div>

  </div>
</div>
</template>

<script>
export default {
  name: 'BooksList',
  props:[
    'listdata',
    'windowSize',
    'page',
    'selectedIndex'
  ],
  data() {
    return {
      localListData: this.listdata
      };
  },
computed: {
  getBooks(){
    return this.listdata.slice(this.page*this.windowSize, this.page*this.windowSize+this.windowSize)
  }
},
methods:{
  selectItem(index) {
    // console.log(index)
    this.$emit('clicked', this.page*this.windowSize + index)
  }
}
}
</script>