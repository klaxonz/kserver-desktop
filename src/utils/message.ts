import { ElMessage } from 'element-plus'

function success(message: string) {
  ElMessage({
    type: 'success',
    message: message
  })
}

function warning(message: string) {
  ElMessage({
    type: 'warning',
    message: message
  })
}

function error(message: string) {
  ElMessage({
    type: 'error',
    message: message
  })
}

function info(message: string) {
  ElMessage({
    type: 'info',
    message: message
  })
}

export const message = {
  success,
  warning,
  error,
  info
}
