import { ref, computed } from 'vue'
import type { IItemProps, TAny } from '@/types'
import { useTreeStore } from '@/stores/useTreeStore'

export function useTreeGrid(isEditMode = ref(false)) {
  const treeStore = useTreeStore()

  function buildPath(item: IItemProps) {
    return treeStore.getTree().getAllParents(item.id).reverse().map((i: IItemProps) => i.id.toString())
  }

  const rowData = computed(() => {
    return treeStore.getTree().getAll().map((item: IItemProps) => ({
      ...item,
      path: buildPath(item)
    }))
  })

  const columnDefs = computed(() => [
    {
      headerName: '№ п/п',
      valueGetter: (params: TAny) => params.node.rowIndex + 1,
      width: 80,
      pinned: 'left' as const
    },
    {
      headerName: 'Категория',
      width: 200,
      cellRenderer: (params: TAny) => {
        const isGroup = treeStore.getTree().getChildren(params.data.id)?.length > 0
        const typeText = isGroup ? 'Группа' : 'Элемент'
        if (!isEditMode.value) {
          return `<div>${typeText}</div>`
        }
        return `
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span>${typeText}</span>
            <div style="display:flex; gap:4px; align-items:center;">
              <div class="tree-grid__btn tree-grid__btn--add">
                <img src="/src/assets/icons/icon-plus.svg"/>
              </div>
              <div class="tree-grid__btn tree-grid__btn--remove">
                <img src="/src/assets/icons/icon-plus.svg"/>
              </div>
            </div>
          </div>
        `
      },
      onCellClicked: (params: TAny) => {
        const { id } = params.data
        const target = params.event.target as HTMLElement

        if (target.classList.contains('tree-grid__btn--add')) {
          const newId = Date.now()
          treeStore.add({ id: newId, parent: id, label: 'Новый элемент' })
        }
        if (target.classList.contains('tree-grid__btn--remove')) {
          treeStore.remove(id)
        }
      }
    },
    {
      headerName: 'Наименование',
      field: 'label',
      flex: 1,
      cellRenderer: 'agGroupCellRenderer',
      editable: () => isEditMode.value,
      cellEditor: 'agTextCellEditor',
      cellEditorParams: {
        maxLength: 100
      },
      onCellValueChanged: (params: TAny) => {
        if (params.newValue !== params.oldValue) {
          treeStore.updateLabel(params.data.id, params.newValue)
        }
      }
    }
  ])

  const gridOptions = {
    treeData: true,
    animateRows: true,
    groupDefaultExpanded: -1,
    getDataPath: (data: TAny) => data.path,
    autoGroupColumnDef: {
      headerName: 'Label',
      cellRendererParams: { suppressCount: true }
    }
  }

  return {
    treeStore,
    rowData,
    columnDefs,
    gridOptions
  }
}
