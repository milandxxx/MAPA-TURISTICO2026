<template>
<div v-if='loading' class='overlay'><div class='loader'></div></div>
</template>
<script setup>
import { loading } from '../../store/uiStore'
</script>
<style>
.overlay{position:fixed;inset:0;background:#0008;display:flex;justify-content:center;align-items:center}
.loader{width:40px;height:40px;border:4px solid #fff;border-top:transparent;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
