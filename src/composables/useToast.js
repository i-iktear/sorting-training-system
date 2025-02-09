import { useToast as useVueToast } from 'vue-toastification'

export function useToast() {
  const toast = useVueToast()

  const showSuccess = (message, options = {}) => {
    toast.success(message, options)
  }

  const showError = (message, options = {}) => {
    toast.error(message, options)
  }

  const showInfo = (message, options = {}) => {
    toast.info(message, options)
  }

  return {
    showSuccess,
    showError,
    showInfo
  }
}