<template>
<div v-if='loading' class='overlay'><div class='loader'></div></div>
</template>

<script setup>
import { loading } from '../../store/uiStore'
</script>

<style>
.overlay{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.6);display:flex;justify-content:center;align-items:center}
.loader{width:40px;height:40px;border:4px solid #fff;border-top:4px solid transparent;border-radius:50%;animation:spin 1s linear infinite}
@keyframes spin{to{transform:rotate(360deg)}}
</style>
