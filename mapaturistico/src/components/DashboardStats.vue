<template>
  <div class="stats">
    <div>Total: {{ lugares.length }}</div>
    <div v-if="lugares.length">
      Último: {{ lugares[lugares.length - 1].nombre }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['lugares']
}
</script>