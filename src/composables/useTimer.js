import { ref, computed } from "vue";

export function useTimer() {
  const timer = ref(0);
  const timerInterval = ref(null);

  const formattedTime = computed(() => {
    const mins = Math.floor(timer.value / 60);
    const secs = timer.value % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  });

  const startTimer = () => {
    stopTimer();
    timer.value = 0;
    timerInterval.value = setInterval(() => {
      timer.value++;
    }, 1000);
  };

  const stopTimer = () => {
    if (timerInterval.value) {
      clearInterval(timerInterval.value);
      timerInterval.value = null;
    }
  };

  const resetTimer = () => {
    stopTimer();
    timer.value = 0;
  };

  return {
    timer,
    formattedTime,
    startTimer,
    stopTimer,
    resetTimer,
  };
}
