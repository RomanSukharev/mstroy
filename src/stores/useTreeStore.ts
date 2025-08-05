import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { IItemProps } from '@/types'
import { TreeStore } from '@/utils/TreeStore'

export const useTreeStore = defineStore('treeStore', () => {
  const initialData = [
    { id: 1, parent: null, label: 'Айтем 1' },
    { id: '2', parent: 1, label: 'Айтем 2' },
    { id: 3, parent: 1, label: 'Айтем 3' },
    { id: 4, parent: '2', label: 'Айтем 4' },
    { id: 5, parent: '2', label: 'Айтем 5' },
    { id: 6, parent: '2', label: 'Айтем 6' },
    { id: 7, parent: 4, label: 'Айтем 7' },
    { id: 8, parent: 4, label: 'Айтем 8' },
  ]

  const treeData = ref<IItemProps[]>(initialData)
  const history = ref<IItemProps[][]>([])
  const future = ref<IItemProps[][]>([])

  const getTree = (): TreeStore => new TreeStore(treeData.value)

  function pushHistory() {
    history.value.push(JSON.parse(JSON.stringify(treeData.value)))
    future.value = []
  }

  function undo() {
    if (!history.value.length) return
    future.value.unshift([...treeData.value])
    const prev = history.value.pop()
    if (prev) {
      treeData.value = prev
    }
  }

  function redo() {
    if (!future.value.length) return
    history.value.push([...treeData.value])
    const next = future.value.shift()
    if (next) {
      treeData.value = next
    }
  }

  function add(item: IItemProps) {
    pushHistory()
    const newTreeStore = new TreeStore(treeData.value)
    newTreeStore.addItem(item)
    treeData.value = newTreeStore.getAll()
  }

  function remove(id: string | number) {
    pushHistory()
    const newTreeStore = new TreeStore(treeData.value)
    newTreeStore.removeItem(id)
    treeData.value = newTreeStore.getAll()
  }

  function update(item: IItemProps) {
    pushHistory()
    const newTreeStore = new TreeStore(treeData.value)
    newTreeStore.updateItem(item)
    treeData.value = newTreeStore.getAll()
  }

  function updateLabel(id: string | number, newLabel: string) {
    pushHistory()
    const item = treeData.value.find(item => item.id === id)
    if (item) {
      update({ ...item, label: newLabel })
    }
  }

  return {
    getTree,
    treeData,
    history,
    future,
    add,
    remove,
    update,
    undo,
    redo,
    updateLabel
  }
}, {
  persist: true
})
