<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="modal-content">
        <div class="modal-header">
          <h2>{{ title }}</h2>
          <button class="close-button" @click="$emit('cancel')">×</button>
        </div>
        <div class="modal-body">
          <p v-if="description" class="description">{{ description }}</p>
          <slot></slot>
        </div>
        <div class="modal-actions">
          <button class="cancel-button" @click="$emit('cancel')">Cancel</button>
          <button
            class="success-button"
            :disabled="isConfirmButtonDisabled"
            @click="$emit('confirm')"
          >
            {{ confirmText }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    confirmText: {
      type: String,
      default: "Start",
    },
    isConfirmButtonDisabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  animation: modal-appear 0.3s ease-out;
}

@keyframes modal-appear {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.modal-content {
  background: white;
  padding: 0;
  border-radius: 16px;
  width: 437px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.modal-header {
  padding: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e8e8e8;
}

.modal-header h2 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 21.09px;
  color: #000000;
  letter-spacing: 0;
}

.close-button {
  background: none;
  border: none;
  font-size: 28px;
  cursor: pointer;
  color: #999;
  padding: 0;
  line-height: 1;
  transition: color 0.2s;
}

.close-button:hover {
  color: #666;
}

.modal-body {
  padding: 24px;
  text-align: center;
  max-height: calc(90vh - 180px);
  overflow-y: auto;
}

.description {
  color: #666;
  font-size: 16px;
  line-height: 24px;
  margin: 0 0 24px 0;
}

:deep(input) {
  width: 100%;
  height: 48px;
  padding: 12px 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 16px;
  box-sizing: border-box;
}

:deep(input:focus) {
  outline: none;
  border-color: #f4811e;
}

.modal-actions {
  padding: 24px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid #e8e8e8;
  background: white;
}

.cancel-button {
  padding: 12px 24px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background-color: #f5f5f5;
  color: #666;
  transition: background-color 0.2s;
}

.cancel-button:hover {
  background-color: #ebebeb;
}

.success-button {
  padding: 12px 32px;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  border: none;
  background-color: #f4811e;
  color: white;
  transition: background-color 0.2s;
}

.success-button:hover:not(:disabled) {
  background-color: #e07319;
}

.success-button:disabled {
  background-color: #ffd0a8;
  cursor: not-allowed;
}
</style>
