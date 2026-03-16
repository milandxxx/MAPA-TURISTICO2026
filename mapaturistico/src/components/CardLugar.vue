<template>
  <div class="card" :class="{ inactivo: !lugar.activo }" @click="irALugar">
    <div class="card-badge" :class="lugar.seguridad">
      <span v-if="lugar.seguridad === 'seguro'">✅ Zona segura</span>
      <span v-else-if="lugar.seguridad === 'poco-seguro'">⚠️ Precaución</span>
      <span v-else>🚫 No recomendado</span>
    </div>
    <div class="card-tipo">{{ lugar.tipo }}</div>
    <h3>{{ lugar.nombre }}</h3>
    <p>{{ lugar.info }}</p>
    <div class="card-footer">
      <span class="precio">{{ lugar.precio }}</span>
      <span v-if="!lugar.activo" class="estado inactivo-label">No disponible</span>
      <span v-else class="estado ver-mas">Ver más →</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardLugar',
  props: {
    lugar: {
      type: Object,
      required: true
    }
  },
  emits: ['click'],
  methods: {
    irALugar() {
      if (this.lugar.activo) {
        this.$emit('click', this.lugar)
      }
    }
  }
}
</script>

<style scoped>
.card {
  background: white;
  border-radius: 14px;
  padding: 1.4rem;
  cursor: pointer;
  border: 1px solid #e8e4dc;
  transition: transform .2s, box-shadow .2s;
  font-family: Georgia, serif;
}
.card:hover:not(.inactivo) { transform: translateY(-4px); box-shadow: 0 12px 32px rgba(0,0,0,.1); }
.card.inactivo { opacity: .6; cursor: default; }
.card-badge { font-size: 12px; margin-bottom: 8px; }
.card-tipo {
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: .1em;
  color: #999;
  margin-bottom: 5px;
}
.card h3 { font-size: 1.1rem; margin: 0 0 6px; color: #1a1a1a; }
.card p { font-size: 14px; color: #666; margin: 0 0 1rem; line-height: 1.5; }
.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}
.precio { color: #0a4f6e; font-weight: 600; }
.ver-mas { color: #1a7a5e; font-weight: 600; }
.inactivo-label { color: #ccc; }
</style>
