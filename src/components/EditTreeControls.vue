<script setup lang="ts">
import { useEditControls } from '@/composables/useEditControls'

defineProps({
  isEditMode: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits<{
  edit: []
}>()

const toggleEditMode = () => emit('edit')

const { canUndo, canRedo, undo, redo } = useEditControls()
</script>

<template>
  <div class="edit-controls">
    <span class="edit-controls__mode">
      <span @click="toggleEditMode"
            class="edit-controls__mode-toggle">
        {{ isEditMode ? 'Режим: просмотр' : 'Режим: редактирование' }}
      </span>
    </span>

    <template v-if="isEditMode">
      <button
        type="button"
        @click="undo"
        :disabled="!canUndo"
        class="edit-controls__button edit-controls__button--undo"
      >
        <img src="@/assets/icons/icon-arrow.svg" alt="undo" />
      </button>
      <button
        type="button"
        @click="redo"
        :disabled="!canRedo"
        class="edit-controls__button edit-controls__button--redo"
      >
        <img src="@/assets/icons/icon-arrow.svg" alt="redo" />
      </button>
    </template>
  </div>
</template>

<style lang="scss">
.edit-controls {
  display: flex;
  gap: 8px;
  margin: 16px 0;
  align-items: center;

  &__mode {
    font-weight: 500;
    color: #1e88e5;
  }

  &__mode-toggle {
    cursor: pointer;
    color: #1e88e5;
    text-decoration: none;
    transition: 0.2s;

    &:hover {
      opacity: 0.7;
    }
  }

  &__button {
    border: none;
    background-color: white;
    cursor: pointer;
    transition: all 0.2s ease;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__button--redo {
    img {
      width: 12px;
      transform: scaleX(-1);
    }
  }

  &__button--undo {
    img {
      width: 12px;
    }
  }
}
</style>
