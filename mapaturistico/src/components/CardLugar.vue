<template>
  <div class="card">
    <h3>{{ lugar.nombre }}</h3>
    <p class="precio">$ {{ lugar.precio }}</p>
    <span :class="lugar.disponible ? 'ok' : 'off'">
      {{ lugar.disponible ? 'Disponible' : 'No disponible' }}
    </span>
    <button @click="ir">Ver mapa</button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'

const props = defineProps({ lugar: Object })
const router = useRouter()

const ir = () => router.push('/mapa')
</script>

<style>
.card {
  background: #1e293b;
  padding: 20px;
  border-radius: 14px;
  border: 1px solid #334155;
}

.precio {
  color: #3b82f6;
}

.ok {
  background: #22c55e;
  padding: 4px 8px;
  border-radius: 10px;
}

.off {
  background: #ef4444;
  padding: 4px 8px;
  border-radius: 10px;
}
</style>