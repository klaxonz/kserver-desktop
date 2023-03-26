<template>
    <transition name="contexmenu">
        <div v-if="store.visible"
            class="absolute h-120px w-140px bg-light-50 rounded-md shadow-md text-sm text-gray-500 pt-4px overflow-hidden"
            v-bind:style="{ top: store.top + 'px', left: store.left + 'px', zIndex: 1000 }">
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="openUrl(store.webpage.url)">
                <div class="flex justify-start items-center">
                    <View style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">访问网页</p>
                </div>
            </div>
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="copyUrl(store.webpage.url)">
                <div class="flex justify-start items-center">
                    <Link style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">复制链接</p>
                </div>
            </div>
            <div class="hover:bg-gray-200 hover:rounded-md hover:cursor-pointer h-30px flex justify-start items-center ml-6px mr-4px mt-4px"
                @click="deleteCard(store.webpage.id)">
                <div class="flex justify-start items-center">
                    <DeleteFilled style="width: 1.2em; height: 1.2em; margin-left: 12px; margin-right: 8px" />
                    <p class="ml-4px">删除收藏</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script setup lang="ts">
import { nextTick } from 'vue'
import { clipboard } from 'electron'
import { message } from '../../utils/message'

import { useWebpageStore } from '../../stores'
import { ElMessageBox } from 'element-plus';
import { webpageApi } from '../../api/webpage';
import { View, Link, DeleteFilled } from '@element-plus/icons-vue'

const store = useWebpageStore()

function openUrl(url: string) {
    store.dialogVisible = true
    closeContentMenu()
    nextTick(() => {
        const wv = document.getElementById("webview")
        if (wv !== null) {
            wv.setAttribute('src', url)
        } else {
            const wrapper = document.getElementById('webview-wrapper')
            const _wv = document.createElement('webview')
            _wv.setAttribute('id', 'webview')
            _wv.setAttribute('class', 'w-full h-full')
            _wv.setAttribute('nodeintegration', '')
            _wv.setAttribute('allowpopups', '')
            _wv.setAttribute('src', url)
            wrapper?.appendChild(_wv)
        }
    })
}

function copyUrl(url: string) {
    clipboard.writeText(url, 'selection')
    closeContentMenu()
    message.success("链接已成功复制到粘贴板")
}

function deleteCard(id: any) {
    ElMessageBox.confirm(
        '确认删除卡片吗?',
        '警告',
        {
            type: 'warning',
            cancelButtonText: '取消',
            confirmButtonText: '确认',
        }
    ).then(async () => {
        await webpageApi.remove({ id: id })
        closeContentMenu()
        message.success("删除成功")
    })
}

function closeContentMenu() {
    store.visible = false
}


</script>

<style lang="scss" scoped></style>    