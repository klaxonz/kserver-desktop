<template>
    <el-dialog v-model="_visible" width="60%">
        <div style="height:70vh;">
            <webview nodeintegration allowpopups id="webview" class="w-full h-full"></webview>
        </div>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';

defineEmits(['update:visible'])

const props = defineProps({
    visible: {
        type: Boolean,
        required: true
    }
})

const _visible = ref(props.visible)




function updateVisible(newValue: boolean) {
  _visible.value = newValue;
  // 向父组件发送 update:visible 事件，通知更新 visible 的值
  emit('update:visible', newValue);
}
</script>

<style lang="scss" scoped>
</style>