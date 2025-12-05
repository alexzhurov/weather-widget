<template>
  <div class="settings">
    <h3>Settings</h3>

    <!-- DRAGGABLE LIST -->
    <draggable v-model="cities" handle=".drag-handle" item-key="id" @end="save">
      <template #item="{ element }: { element: { id: number, name: string } }">
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
