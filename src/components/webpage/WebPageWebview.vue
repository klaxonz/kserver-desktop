<template>
    <el-dialog v-model="store.dialogVisible" width="60%" @close="stopWebView">
        <div style="height:70vh;" id="webview-wrapper">
            <webview nodeintegration allowpopups id="webview" class="w-full h-full"></webview>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { useWebpageStore } from '../../stores';

const store = useWebpageStore()


function stopWebView() {
    console.log(111)
    const wv = document.getElementById("webview")
    if (wv !== null) {
        wv.parentNode?.removeChild(wv)
    }
}

</script>

<style lang="scss" scoped>
</style>