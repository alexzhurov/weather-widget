<template>
  <div class="settings">
    <h3>Settings</h3>

    <!-- DRAGGABLE LIST -->
    <draggable v-model="cities" handle=".drag-handle" item-key="id" @end="save">
      <template #item="{ element }">
        <div class="city-item">
          <font-awesome-icon icon="bars" class="drag-handle" />

          <span class="city-name">
            {{ element.name }}
          </span>

          <font-awesome-icon
            icon="trash-can"
            class="delete"
            @click="removeCity(element.id)"
          />
        </div>
      </template>
    </draggable>

    <!-- ADD NEW CITY -->
    <div class="add-block">
      <label>Add Location:</label>

      <div class="add-row">
        <input
          v-model="newCity"
          type="text"
          placeholder="Enter city name"
          @keydown.enter="addCity"
        />

        <font-awesome-icon
          icon="arrow-turn-down"
          rotation="90"
          class="add-btn"
          @click="addCity"
        />
      </div>

      <div v-if="error" class="error">
        {{ error }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import draggable from "vuedraggable";
import { defineComponent } from "vue";
import { useCitiesStore } from "@/stores/useCitiesStore";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "SettingsComponent",
  components: { draggable },

  setup() {
    const store = useCitiesStore();
    const { cities, newCity, error } = storeToRefs(store);

    return {
      cities,
      newCity,
      error,
      addCity: store.addCity,
      removeCity: store.removeCity,
      save: store.saveToLocalStorage,
    };
  },
});
</script>

<style scoped>
.settings {
  user-select: none;
}
.city-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin-bottom: 8px;
  border-radius: 6px;
  background: #f4f4f4;
}

.drag-handle {
  cursor: grab;
  margin-right: 10px;
}

.city-name {
  flex: 1;
  cursor: pointer;
}

.delete {
  cursor: pointer;
}

.add-block {
  margin-top: 20px;
}

.add-row {
  display: flex;
  align-items: center;
  gap: 8px;
}

input {
  flex: 1;
  padding: 6px 8px;
  border-radius: 4px;
  border: 1px solid #bbb;
}

.add-btn {
  cursor: pointer;
}
.error {
  color: red;
}
</style>
