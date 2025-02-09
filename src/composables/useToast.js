import { useToast as useVueToast } from 'vue-toastification'

export function useToast() {
  const toast = useVueToast()

  const showSuccess = (message, options = {}) => {
    toast.success(message, {
      timeout: 5000,
      position: "top-center",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      ...options
    })
  }

  const showError = (message, options = {}) => {
    toast.error(message, {
      timeout: 5000,
      position: "top-center",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      ...options
    })
  }

  const showInfo = (message, options = {}) => {
    toast.info(message, {
      timeout: 5000,
      position: "top-center",
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "colored",
      ...options
    })
  }

  return {
    showSuccess,
    showError,
    showInfo
  }
}