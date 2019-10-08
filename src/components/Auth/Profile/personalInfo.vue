 <template>
  <v-card class="mx-auto">
    <v-card-title class="align-end fill-height">{{ currentUser.name }}</v-card-title>
    <v-card-text>{{ currentUser.email }}</v-card-text>
  </v-card>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'personalInfo',
  computed: {
    ...mapGetters(['error', 'currentUser', 'isLoggedIn'])
  }
}
</script>