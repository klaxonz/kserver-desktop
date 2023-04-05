<template>
  <div class="flex flex-row h-full">
    <div class="bg-blue-500 w-2/3 h-full"></div>
    <div class="w-1/3 h-full">
      <div class="flex justify-center items-center mt-1/3">
        <div v-if="isLogin">
          <div>
            <h1 class="text-center text-3xl font-medium">欢迎回来</h1>
          </div>
          <div class="mt-10px">
            <h3 class="text-center text-sm text-gray-500">第三方登录</h3>
          </div>
          <div class="mt-100px w-300px">
            <el-divider content-position="center"
              ><p class="text-gray-300 text-sm font-normal">使用邮箱登录</p></el-divider
            >
          </div>
          <div>
            <el-form
              :label-position="loginFormState.labelPosition"
              label-width="140px"
              :model="userInfo"
              style="max-width: 460px"
            >
              <el-form-item label="邮箱">
                <el-input v-model="userInfo.email" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item label="密码">
                <el-input v-model="userInfo.password" type="password" show-passwords placeholder="请输入密码" />
              </el-form-item>
              <el-form-item>
                <div class="flex items-center justify-between w-full">
                  <el-checkbox v-model="loginFormState.rememberMe" label="记住我" />
                  <a href="#" class="text-xs text-blue-500">忘记密码</a>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="w-full" @click="submit">登录</el-button>
              </el-form-item>
              <el-form-item>
                <span class="text-center w-full text-gray-500"
                  >还没有账号?&nbsp;&nbsp;
                  <a href="#" class="text-blue-500" @click="handleClickSwitchRegister">立即注册</a></span
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
        <div v-if="!isLogin">
          <div>
            <h1 class="text-center text-3xl font-medium">欢迎访问</h1>
          </div>

          <div class="mt-100px w-300px">
            <el-divider content-position="center"
              ><p class="text-gray-300 text-sm font-normal">使用邮箱注册</p></el-divider
            >
          </div>
          <div>
            <el-form
              :label-position="loginFormState.labelPosition"
              label-width="140px"
              :model="registerInfo"
              style="max-width: 460px"
            >
              <el-form-item label="用户名" required>
                <el-input v-model="registerInfo.username" placeholder="请输入用户名" />
              </el-form-item>
              <el-form-item label="密码" required>
                <el-input v-model="registerInfo.password" type="password" show-passwords placeholder="请输入密码" />
              </el-form-item>
              <el-form-item label="确认密码" required>
                <el-input
                  v-model="registerInfo.repassword"
                  type="password"
                  show-passwords
                  placeholder="请再次输入密码"
                />
              </el-form-item>
              <el-form-item label="邮箱" required>
                <el-input v-model="registerInfo.email" placeholder="请输入邮箱" />
              </el-form-item>
              <el-form-item>
                <el-button type="primary" class="w-full" @click="register">注册</el-button>
              </el-form-item>
              <el-form-item>
                <span class="text-center w-full text-gray-500"
                  >已经有账号?&nbsp;&nbsp;
                  <a href="#" class="text-blue-500" @click="handleClickSwitchLogin">返回登录</a></span
                >
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Base64 } from 'js-base64'
import { accountApi } from '@/api/account'
import { message } from '@/utils/message'
const router = useRouter()

const isLogin = ref(true)

const userInfo = reactive({
  email: '',
  password: '',
  username: ''
})

const registerInfo = reactive({
  email: '',
  password: '',
  repassword: '',
  username: ''
})

const loginFormState = reactive({
  rememberMe: false,
  labelPosition: 'top'
})

onMounted(() => {
  const email = localStorage.getItem('email')
  if (email) {
    userInfo.email = email
    const password = localStorage.getItem('password')
    if (password) {
      userInfo.password = Base64.decode(password)
    }
    loginFormState.rememberMe = true
  }
})

function submit() {
  const loginData = {
    email: userInfo.email,
    password: userInfo.password
  }
  if (loginFormState.rememberMe) {
    localStorage.setItem('email', loginData.email)
    localStorage.setItem('password', Base64.encode(loginData.password))
  } else {
    localStorage.removeItem('email')
    localStorage.removeItem('password')
  }
  accountApi.login(loginData).then((resp) => {
    // 路由跳转
    router.push('/webpage/collect')
  })
}

function register() {
  const registerData = {
    username: registerInfo.username,
    password: registerInfo.password,
    email: registerInfo.email
  }
  accountApi.register(registerData).then((resp) => {
    message.success('注册成功')
    isLogin.value = true
  })
}

function handleClickSwitchLogin() {
  isLogin.value = true
}

function handleClickSwitchRegister() {
  isLogin.value = false
}
</script>

<style scoped></style>
