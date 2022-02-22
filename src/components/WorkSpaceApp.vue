<template>
  <div class='container'>
    <tests v-if='testing'></tests>

    <div class='row mb-3'>
      <div class='col'>
        <nav-bar
          ref='navBar'
          :tests-open='testing'
          :darkThemeUrl = 'darkThemeUrl'
          :lightThemeUrl = 'lightThemeUrl'
          @toggle-tests='toggleTests'>
        </nav-bar>
      </div>
    </div>
    
    <div class='row'>
      <div class='col'>
        <author-search ref='authorSearch'
        :authorsdata = "authorsList"
        @select-author='selectedAuthor'></author-search>

        <books-list ref='booksListView' 
        :listdata = "booksList"
        :windowSize = "windowSize"
        :page = "page"
        :selectedIndex = "selectedIndex"
        @clicked="clickedBook" ></books-list>
        
        <books-list-pagination ref='booksListPagination'
        :page = "page"
        :maxPage="maxPage"
        @clicked="updatePage"></books-list-pagination>
      </div>

      <div class='col'>
        <book-view
        :bookdata = "bookToShow"></book-view>
      </div>
      
    </div>

  </div>
</template>

<script>
import books from '../../server/books.json'
import AuthorSearch from './components/AuthorSearch.vue';
import BooksList from './components/BooksList.vue';
import BooksListPagination from './components/BooksListPagination.vue';
import BookView from './components/BookView.vue';
import NavBar from './components/NavBar.vue';
import Tests from './components/Tests.vue';

export default {
  name: 'App',
  components: {
    AuthorSearch,
    BooksList,
    BooksListPagination,
    BookView,
    NavBar,
    Tests
  },
  data() {
    return {
      page: 0,
      windowSize: 5,
      selectedIndex: 0,
      filterFn: () => true,
      lightThemeUrl: 'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css',
      darkThemeUrl: 'https://cdn.jsdelivr.net/npm/bootstrap-dark-5@1.1.3/dist/css/bootstrap-night.min.css',
      testing: false
      };
  },
  computed: {
    booksList() {
      return this.getDeepClone(books)
      .sort((a,b)=>a.title.localeCompare(b.title))
      .map(p=>{
          p.authors = p.authors.replace(/;/g, ', ')
          return p
        })
      .filter(e=>this.filterFn(e.authors))
       // TODO: implement me
    },
    maxPage() {
      return Math.round(this.booksList.length / this.windowSize)
    },
    authorsList() {
      // return this.booksList
      return Object.values(
        this.getDeepClone(books)
          .reduce((acc,it)=>{
            it.authors.split(';')
              .reduce((acc_2, it_2)=>{
                let tmp = it_2.trim()
                  acc[tmp] = tmp
                return acc
              },acc)
            return acc
          },{})
      ).sort()

      // TODO: implement me
    },
    bookToShow() {
      return this.booksList[this.selectedIndex]
    }
  },
  methods: {
    toggleTests() {
      this.testing = !this.testing;
    },
    clickedBook(index) {
      this.selectedIndex = index;
      //console.log(this.selectedIndex)
    },
    selectedAuthor(author) {
      // console.log(author)
      if (author.length > 0){
        this.filterFn = function(e) {
          return e.includes(author)
        }
      }else{
        this.filterFn = () => true
      }
      
    },
    updatePage(newPage){
      if (newPage<books.length && newPage>=0) {
      this.page = newPage;
      }
     // console.log(this.page)
      
    },
    getDeepClone(books) {
      return JSON.parse(JSON.stringify(books))       
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
