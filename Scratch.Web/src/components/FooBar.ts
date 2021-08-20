import { defineComponent } from 'vue'

interface Book {
  title: string
  author: string
  year: number
}


const FooBar = defineComponent({
  // type inference enabled
  data() {
    return {
      book: {
        title: 'Vue 3 Guide',
        author: 'Vue Team',
        year: 2020
      } as Book
    }
  }
})

export default FooBar
