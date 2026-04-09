<template>
<div class='toast-container'>
<div v-for='t in toasts' :key='t.id' class='toast'>{{t.msg}}</div>
</div>
</template>
<script setup>
import { toasts } from '../../store/uiStore'
</script>
<style>
.toast-container{position:fixed;top:20px;right:20px}
.toast{background:#111;color:#fff;padding:10px;margin:5px;border-radius:6px}
</style>
