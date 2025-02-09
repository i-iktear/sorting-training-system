<template>
  <div class="sorting-training">
    <div class="header">
      <h1>Sorting Training System</h1>
      <button class="start-button" @click="showModal" v-if="isTrainingStarted">
        Start sorting!
      </button>
    </div>

    <button class="start-button" @click="showModal" v-if="!isTrainingStarted">
      Start sorting!
    </button>

    <PeopleGrid
      v-if="isTrainingStarted"
      :people="people"
      :formatTime="formattedTime"
      @drop="handleDrop"
      @restart="showModal"
    />

    <Modal
      v-if="showPeopleModal"
      confirmText="Start"
      title="How many people?"
      description="Enter a number of how many people you want to add to the list."
      :isConfirmButtonDisabled="!isValidPeopleCount"
      @cancel="cancelModal"
      @confirm="startTraining"
    >
      <input
        type="number"
        v-model="numberOfPeople"
        min="20"
        max="100"
        class="number-input"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import Modal from "./components/Modal.vue";
import PeopleGrid from "./components/PeopleGrid.vue";
import { useTimer } from "./composables/useTimer";
import { usePeopleGenerator } from "./composables/usePeopleGenerator";
import { useToast } from "./composables/useToast";

// State
const people = ref([]);
const showPeopleModal = ref(false);
const numberOfPeople = ref(null);
const isTrainingStarted = ref(false);

// Composables
const { startTimer, stopTimer, formattedTime } = useTimer();
const { generatePeople } = usePeopleGenerator();

// Computed
const isValidPeopleCount = computed(() => {
  const count = Number(numberOfPeople.value);
  return count >= 20 && count <= 100;
});

// Methods
const showModal = () => {
  showPeopleModal.value = true;
};

const cancelModal = () => {
  showPeopleModal.value = false;
  numberOfPeople.value = null;
};

const startTraining = () => {
  people.value = generatePeople(numberOfPeople.value);
  showPeopleModal.value = false;
  isTrainingStarted.value = true;
  startTimer();
};

const handleDrop = ({ event, targetPerson }) => {
  if (event?.dataTransfer) {
    const personId = Number(event?.dataTransfer?.getData("personId"));
    console.log(event, personId, "c78");

    const sourceIndex = people.value.findIndex((p) => p.id === personId);
    const targetIndex = people.value.findIndex((p) => p.id === targetPerson.id);

    const [movedPerson] = people.value.splice(sourceIndex, 1);
    people.value.splice(targetIndex, 0, movedPerson);

    checkSorting();
  }
};

const isAscending = (arr) => {
  if (arr.length <= 1) return true;
  return arr.every((val, i) => i === 0 || val >= arr[i - 1]);
};

const isDescending = (arr) => {
  if (arr.length <= 1) return true;
  return arr.every((val, i) => i === 0 || val <= arr[i - 1]);
};

const toast = useToast();

const checkSorting = () => {
  const potatoValues = people.value.map((person) => Number(person.potatoes));
  const isSorted = isDescending(potatoValues);

  if (isSorted) {
    stopTimer();
    toast.showSuccess(`🎉 Congratulations! You completed the sorting in ${formattedTime.value}`);
  }
};
</script>

<style scoped>
.sorting-training {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

h1 {
  margin: 0;
  font-size: 24px;
  font-weight: 600;
}

.start-button {
  padding: 8px 16px;
  background-color: #f4811e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
}

.start-button:hover {
  background-color: #e67300;
}

.number-input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
