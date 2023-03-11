<template>
    <div @contextmenu.prevent="">
        <div class="menu" v-if="isShow" :style="{top: menuTop+'px', left: menuLeft+'px'}">
          <div class="menu-item" @click="handleClick('copy')">复制</div>
          <div class="menu-item" @click="handleClick('paste')">粘贴</div>
          <div class="menu-item" @click="handleClick('cut')">剪切</div>
        </div>
      </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, Ref } from "vue";


  defineEmits(['right-click'])
  
  const isShow: Ref<boolean> = ref(true);  // 菜单是否显示
  const menuTop: Ref<number> = ref(0);  // 菜单距离顶部的距离
  const menuLeft: Ref<number> = ref(0);  // 菜单距离左侧的距离
  
  // 显示右键菜单
  function showMenu(event: MouseEvent): void {
    event.preventDefault();  // 阻止默认事件
    isShow.value = true;
    menuTop.value = event.clientY;
    menuLeft.value = event.clientX;
  }
  
  // 处理菜单点击事件
  function handleClick(type: string): void {
    console.log(type);
    isShow.value = false;
  }
  </script>
  
  