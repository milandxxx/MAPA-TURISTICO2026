<template>
<div class='toast-container'>
<div v-for='t in toasts' :key='t.id' class='toast'>{{t.msg}}</div>
</div>
</template>

<script setup>
import { toasts } from '../../store/uiStore'
</script>

<style>
.toast-container{position:fixed;top:20px;right:20px;z-index:999}
.toast{background:#111;color:#fff;padding:10px;border-radius:6px;margin-bottom:8px}
</style>
