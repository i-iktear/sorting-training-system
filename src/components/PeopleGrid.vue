<template>
  <div class="grid-container">
    <div class="grid-header">
      <span class="header-text">Time: {{ formatTime }}</span>
      <span class="header-text">{{ people.length }} people in the list</span>
    </div>

    <div class="grid-wrapper">
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Potatoes</th>
            <th>Tags</th>
            <th>Full name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="person in people"
            :key="person.id"
            draggable="true"
            @dragstart="dragStart($event, person)"
            @dragover.prevent
            @drop="drop($event, person)"
          >
            <td>{{ person.email }}</td>
            <td>{{ person.potatoes }}</td>
            <td>
              <span class="tag">{{ person.tags.join(", ") }}</span>
            </td>
            <td>{{ person.fullName }}</td>
            <td>{{ person.location }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "PeopleGrid",
  props: {
    people: {
      type: Array,
      required: true,
    },
    formatTime: {
      type: String,
      required: true,
    },
  },
  methods: {
    dragStart(event, person) {
      event.dataTransfer.setData("personId", person.id);
    },
    drop(event, targetPerson) {
      this.$emit("drop", { event, targetPerson });
    },
  },
};
</script>

<style scoped>
.grid-container {
  border: 1px solid #dddddd;
  border-radius: 8px;
  overflow: hidden;
}

.grid-header {
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  background: #ffffff;
}

.header-text {
  color: #000000;
  font-size: 14px;
  line-height: 30px;
  font-weight: 800;
}

.start-button {
  padding: 8px 16px;
  background-color: #f4811e;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: 500;
}

.grid-wrapper {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  background: #ffffff;
}

th {
  padding: 12px 24px;
  text-align: left;
  font-weight: 500;
  color: #666666;
  background: #f5f5f5;
  border-bottom: 1px solid #dddddd;
}

td {
  padding: 12px 24px;
  text-align: left;
  border-bottom: 1px solid #dddddd;
}

tr:hover {
  background: #f5f5f5;
  cursor: grab;
}

tr:active {
  cursor: grabbing;
}

.tag {
  display: inline-block;
  padding: 2px 8px;
  background: #f5f5f5;
  border-radius: 4px;
  color: #666666;
}
</style>
