<template>
  <div class="flex flex-row h-full w-full">
    <WebPageTaskDrawer></WebPageTaskDrawer>

    <div class="w-full h-full overflow-y-scroll no-scrollbar static" style="background-color: #edeff3">
      <div class="h-100px"></div>

      <div
        v-for="task in state.taskList"
        :key="task.webPageTask?.id"
        class="w-3/4 flex items-center flex-col gap-4 rounded-md mx-auto mb-8px"
      >
        <div class="w-full h-190px flex items-center gap-4 rounded-md mx-auto mb-4px bg-light-100">
          <div class="h-160px flex items-center">
            <div class="w-280px h-160px bg-black ml-14px rounded-md relative cursor-pointer" @click="handlePlay(task)">
              <img :src="task.thumbnail" class="rounded-md absolute inset-0 w-full h-full object-cover" />
            </div>
          </div>

          <div class="h-160px w-11/20 flex flex-col text-sm">
            <div class="flex mb-8px max-h-24 line-clamp-2">
              <p class="text-base subpixel-antialiased font-semibold">{{ task.webPage.title }}</p>
            </div>
            <div class="flex">
              <div class="flex items-center justify-between">
                视频来源：
                <img :src="task.webPage?.favicon" class="h-16px w-16px" />
              </div>
            </div>
            <div class="flex">
              <div>视频时长：{{ secondsToTimeFormat(task.webPageTask.videoDuration) }}</div>
            </div>
            <div class="flex">
              <div>视频大小：{{ formatBytes(parseInt(task.webPageTask.videoSize)) }}</div>
            </div>
            <div class="flex">
              <div>创建时间：{{ task.webPageTask.createTime }}</div>
            </div>

            <div v-if="task.webPageTask.type === 1" class="flex mt-10px">
              <div
                v-if="task.webPageTask.type === 1 && task.taskVisible === 0"
                class="w-full text-center cursor-pointer text-blue-500"
                @click="task['taskVisible'] = 1"
              >
                展开
              </div>
              <div
                v-if="task.webPageTask.type === 1 && task.taskVisible === 1"
                class="w-full text-center cursor-pointer text-blue-500"
                @click="task['taskVisible'] = 0"
              >
                收缩
              </div>
            </div>
          </div>
          <div v-if="task.webPageTask.status === 0" class="flex flex-col w-140px justify-center items-center ml-auto">
            <div class="flex items-center">
              <el-progress type="circle" :percentage="task.webPageTask.videoProgress" :width="72" />
            </div>
            <div class="flex items-center mt-16px">
              <div class="text-xs pl-6px text-neutral-700">正在下载视频</div>
            </div>
          </div>

          <div v-if="task.webPageTask.status === 1" class="flex flex-col w-140px justify-center items-center ml-auto">
            <div class="flex items-center">
              <el-progress type="circle" :percentage="100" status="success" :width="72" />
            </div>
            <div class="flex items-center mt-16px">
              <div class="text-xs pl-6px text-neutral-700">下载成功</div>
            </div>
          </div>
          <div class="h-160px flex flex-col justify-center items-center pr-48px">
            <div class="flex h-32px items-center mt-12px">
              <div><el-button type="primary" text bg @click="handlePause(task)">暂停</el-button></div>
            </div>
            <div class="flex h-32px items-center mt-12px">
              <div><el-button type="primary" text bg @click="handleRemove(task)">删除</el-button></div>
            </div>
            <div class="flex h-32px items-center mt-12px">
              <div><el-button type="primary" text bg @click="handleRetry(task)">重试</el-button></div>
            </div>
            <div class="flex h-32px items-center mt-12px">
              <div><el-button type="primary" text bg @click="handlePlay(task)">播放</el-button></div>
            </div>
          </div>
        </div>
        <div
          v-if="task.webPageTask.type === 1 && task.taskVisible === 1"
          class="flex flex-col w-full h-600px bg-light-100 rounded-md mb-10px pt-4px pb-4px"
        >
          <div class="flex w-full mt-20px w-9/10 mx-auto border-b-solid border-b-1">
            <div class="w-full text-center">名称</div>
            <div class="w-full text-center">大小</div>
            <div class="w-full text-center">时长</div>
            <div class="w-full text-center">进度</div>
            <div class="w-full text-center">操作</div>
          </div>
          <div class="overflow-y-scroll no-scrollbar">
            <div
              v-for="videoTask in task.webPageVideoTaskList"
              :key="videoTask.id"
              class="flex w-full mt-20px w-9/10 mx-auto"
            >
              <div class="w-full text-center truncate">{{ videoTask.title }}</div>
              <div class="w-full text-center">{{ formatBytes(parseInt(videoTask.videoSize)) }}</div>
              <div class="w-full text-center">{{ secondsToTimeFormat(videoTask.videoDuration) }}</div>
              <div class="w-full text-center">{{ videoTask.progress }}%</div>
              <div class="w-full text-center">
                <el-button type="primary" text bg @click="handlePlay(videoTask)">播放</el-button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-show="visible" class="dialog-mask">
      <el-dialog
        v-model="visible"
        :class="{ 'w-3/5': widthFirst, 'h-3/5': !widthFirst }"
        class="rounded-dialog"
        draggable
        @close="handleClose"
      >
        <div ref="videoRef" class="w-full h-full"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import WebPageTaskDrawer from '@/components/web-page/WebPageTaskDrawer.vue'
import DPlayer from 'dplayer'
import { nextTick } from 'process'
import 'moment/dist/locale/zh-cn'
import { taskApi } from '@/api/web-page-task'
import config from '@/config'

class WebPageTask {
  thumbnail: string
  webPage: {
    page: number
    pageSize: number
    id: string
    userId: string
    url: string
    title: string
    source: string
    isStar: string
    favicon: string
    description: string
    createTime: string
    updateTime: string
    type: any
  }
  webPageTask: {
    page: number
    pageSize: number
    id: string
    userId: string
    webPageId: string
    videoProgress: number
    audioProgress: number
    videoLength: string
    audioLength: string
    videoDownloadedLength: string
    audioDownloadedLength: string
    videoPath: string
    audioPath: string
    filePath: string
    thumbnailPath: string
    videoDownloadSpeed: string
    audioDownloadSpeed: string
    videoDownloadEta: string
    audioDownloadEta: string
    videoSize: string
    videoDuration: number
    isMerge: number
    width: number
    height: number
    createTime: string
    updateTime: string
    status: number
    progress: number
  }

  constructor(thumbnail: string, webPage?: any, webPageTask?: any) {
    this.thumbnail = thumbnail
    this.webPage = webPage
    this.webPageTask = webPageTask
  }
}

const token = localStorage.getItem('token')

let state = reactive<{
  taskList: WebPageTask[]
  playTask: WebPageTask | null
}>({
  taskList: [],
  playTask: null
})

const widthFirst = computed(() => {
  console.log(state.playTask)
  if (state.playTask) {
    if (state.playTask.width == null || state.playTask.height == null) {
      return true
    }
    return state.playTask.width > state.playTask.height
  } else {
    return true
  }
})

const visible = ref(false)
const videoRef = ref()

class WebSocketClient {
  private socket!: WebSocket
  private readonly url: string
  private readonly reconnectInterval: number

  constructor(url: string, reconnectInterval: number) {
    this.url = url
    this.reconnectInterval = reconnectInterval
    this.connect()
  }

  private connect() {
    this.socket = new WebSocket(this.url)

    this.socket.onmessage = (event) => {
      const dataStr = event.data
      const dataJson = JSON.parse(dataStr)

      const oldTaskList = state.taskList

      dataJson.data.forEach((item) => {
        oldTaskList.forEach((oldItem) => {
          if (item.webPageTask.id === oldItem.webPageTask.id) {
            item.taskVisible = oldItem.taskVisible
          }
        })
        if (!item.taskVisible) {
          item.taskVisible = 0
        }
      })

      state.taskList = dataJson.data
    }

    this.socket.onclose = () => {
      setTimeout(() => {
        this.connect()
      }, this.reconnectInterval)
    }
  }

  public send(message: string) {
    this.socket.send(message)
  }
}

onMounted(() => {
  new WebSocketClient(config.getWebSocketRequestPath() + '/ws/task/list?token=' + token, 5000)
})

let dp: DPlayer

function handlePlay(task: any) {
  visible.value = true

  if (task.width) {
    state.playTask = task
  } else {
    state.playTask = task.webPageVideoTaskList[0]
  }

  let url = config.getHttpRequestPath() + '/web-page-task/video/'
  if (task.videoIndex) {
    url = url + task.taskId + '/' + task.id
  } else {
    url = url + task.webPageTask.id
  }
  nextTick(() => {
    const options = {
      container: videoRef.value,
      autoplay: true,
      video: {
        url: url
      }
    }
    if (dp) {
      dp.switchVideo({
        url: url
      })
    } else {
      dp = new DPlayer(options)
    }
    dp.play()
  })
}

function handlePause(task: any) {
  taskApi.pause({
    id: task.webPageTask.id
  })
}

function handleRetry(task: any) {
  taskApi.retry({
    id: task.webPageTask.id
  })
}

function handleRemove(task: any) {
  taskApi.remove({
    id: task.webPageTask.id
  })
}

function handleClose() {
  dp.pause()
}

function formatBytes(bytes: number): string {
  if (bytes < 1024) {
    return bytes + ' bytes'
  } else if (bytes < 1048576) {
    return (bytes / 1024).toFixed(2) + ' KB'
  } else if (bytes < 1073741824) {
    return (bytes / 1048576).toFixed(2) + ' MB'
  } else {
    return (bytes / 1073741824).toFixed(2) + ' GB'
  }
}
function secondsToTimeFormat(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = remainingSeconds.toString().padStart(2, '0')

  return hours > 0
    ? `${formattedHours}:${formattedMinutes}:${formattedSeconds}`
    : `${formattedMinutes}:${formattedSeconds}`
}
</script>

<style>
.el-dialog__body {
  height: 100%;
  width: 100%;
  padding: 0;
}
.el-dialog__header {
  display: none;
}
.dialog-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
}

.rounded-dialog {
  border-radius: 8px;
  overflow: hidden;
}
</style>
