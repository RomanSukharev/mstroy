<script setup lang="ts">
import { ref } from 'vue'
import { AgGridVue } from 'ag-grid-vue3'
import 'ag-grid-community/styles/ag-theme-alpine.css'
import EditTreeControls from './EditTreeControls.vue'
import { useTreeGrid } from '@/composables/useTreeGrid'

const isEditMode = ref(false)
const {
  rowData,
  columnDefs,
  gridOptions
} = useTreeGrid(isEditMode)

</script>

<template>
  <EditTreeControls
    :is-edit-mode="isEditMode"
    @edit="isEditMode = !isEditMode"
  />

  <div class="ag-theme-alpine" style="height: 500px; width: 100%">
    <ag-grid-vue
      class="ag-theme-alpine"
      style="width: 100%; height: 100%"
      :gridOptions="gridOptions"
      :rowData="rowData"
      :key="isEditMode ? 1 : 0"
      :columnDefs="columnDefs"
      :editType="isEditMode ? 'fullRow' : undefined"
    />
  </div>
</template>

<style lang="scss">
.tree-grid {
  &__btn {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 0.2s;
    z-index: 999;

    img {
      width: 12px;
      height: 12px;
    }

    &--add {
      background-color: #e53935;

      &:hover {
        filter: brightness(1.1);
      }
    }

    &--remove {
      background-color: #1e88e5;

      img {
        transform: rotate(45deg);
      }

      &:hover {
        filter: brightness(1.1);
      }
    }
  }
}
</style>
