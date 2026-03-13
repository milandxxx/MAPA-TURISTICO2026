<template>
  <div class="home">
    <section class="landing">
      <h1>Bienvenido al Mapa Turístico de Santa Marta</h1>
      <p>Explora las mejores zonas, hoteles y restaurantes</p>
      <button @click="$router.push('/mapa')">Ver Mapa</button>
    </section>

    <section class="lugares">
      <h2>Zonas Turísticas</h2>
      <div 
        class="card" 
        v-for="lugar in lugares" 
        :key="lugar.nombre"
        @click="abrirPagina(lugar)"
      >
        <h3>{{ lugar.nombre }}</h3>
        <p>{{ lugar.info }}</p>
        <p v-if="lugar.seguro">✅ Zona segura</p>
        <p v-else-if="lugar.pocoSeguro">⚠️ Zona poco segura</p>
        <p v-else>❌ Zona insegura</p>
        <p v-show="mostrarPrecios">Precios desde {{ lugar.precio }}</p>
      </div>
    </section>

    <footer class="footer">
      <p>© 2026 Mapa Turístico de Santa Marta | Proyecto Vue</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {
      mostrarPrecios: true,
      lugares: [
        { nombre: "Centro Histórico", info: "Hoteles boutique y restaurantes típicos.", seguro: true, precio: "$200.000 COP", url: "https://santamarta.gov.co/centrohistorico" },
        { nombre: "El Rodadero", info: "Playas populares y hoteles familiares.", seguro: true, precio: "$180.000 COP", url: "https://santamarta.gov.co/rodadero" },
        { nombre: "Taganga", info: "Buceo y hospedajes económicos.", pocoSeguro: true, precio: "$100.000 COP", url: "https://santamarta.gov.co/taganga" },
        { nombre: "Barrio Pescaíto", info: "Área tradicional, insegura para turistas.", inseguro: true, precio: "$80.000 COP", url: null },
        { nombre: "Quinta de San Pedro Alejandrino", info: "Museo histórico.", seguro: true, precio: "$20.000 COP entrada", url: "https://quintasanpedro.com" }
      ]
    };
  },
  methods: {
    abrirPagina(lugar) {
      if (typeof lugar.url === "string" && lugar.url.trim().length > 0) {
        window.open(lugar.url, "_blank");
      } else {
        this.$router.push({ name: 'detalle', params: { nombre: lugar.nombre } });
      }
    }
  }
};
</script>