<template>
  <App-home />
</template>
<script>
import AppHome from './components/home'
import { ChatMessageAdddedSubscription } from './store/queries'

export default {
  components: {
    AppHome
  },
  mounted () {
    this.$store.dispatch('getCurrentUser')
    const observer = this.$apollo.subscribe({
      query: ChatMessageAdddedSubscription
    })
    observer.subscribe({
      next (data) {
        console.log(data)
      },
      error (error) {
        console.log(error)
      }
    })
  }
}
</script>
