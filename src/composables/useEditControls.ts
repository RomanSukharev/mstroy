import { computed } from 'vue'
import { useTreeStore } from '@/stores/useTreeStore'

export function useEditControls() {
  const treeStore = useTreeStore()

  const canUndo = computed(() => treeStore.history.length > 0)
  const canRedo = computed(() => treeStore.future.length > 0)

  function undo() {
    treeStore.undo()
  }

  function redo() {
    treeStore.redo()
  }

  return {
    canUndo,
    canRedo,
    undo,
    redo
  }
}
