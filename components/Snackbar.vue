<template>
  <v-snackbar v-model="show" :timeout="2000" :color="color" location="bottom right">
    {{ message }}

    <template v-slot:actions>
      <v-btn icon="$close" size="x-small" variant="plain" @click="show = false" />
    </template>
  </v-snackbar>
</template>

<script setup lang="ts">
import { useSnackbarStore } from '@composables/utilities/useSnackbar';

const snackBarStore = useSnackbarStore()
const { color, message, show } = storeToRefs(snackBarStore)
</script>

<style scoped></style>