<template>
  <v-card>
    <v-card-title>
      <span class="headline">Диалог</span>
    </v-card-title>
    <v-card-text>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-text-field label="Dessert name"></v-text-field>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="cancel">Cancel</v-btn>
      <v-btn color="blue darken-1" text @click="save">Save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  methods: {
    cancel() {
      this.$emit('closedialog')
    },
    save() {
      this.$emit('closedialog')
    }
  }
}
</script>

<style></style>
