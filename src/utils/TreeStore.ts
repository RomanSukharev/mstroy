import type { IItemProps } from '@/types'

export class TreeStore {
  private readonly items: IItemProps[]

  constructor(items: IItemProps[]) {
    this.items = [...items]
  }

  getAll(): IItemProps[] {
    return [...this.items]
  }

  getItem(id: IItemProps['id']): IItemProps | undefined {
    return this.items.find(el => el.id === id)
  }

  getChildren(id: IItemProps['id']): IItemProps[] {
    return this.items.filter(el => el.parent === id)
  }

  getAllChildren(id: IItemProps['id']): IItemProps[] {
    const result: IItemProps[] = []
    const stack: IItemProps['id'][] = [id]

    while (stack.length) {
      const current = stack.pop()!
      for (const child of this.items) {
        if (child.parent === current) {
          result.push(child)
          stack.push(child.id)
        }
      }
    }
    return result
  }

  getAllParents(id: IItemProps['id']): IItemProps[] {
    const result: IItemProps[] = []
    let current = this.getItem(id)

    while (current) {
      result.push(current)
      current = current.parent != null ? this.getItem(current.parent) : undefined
    }
    return result
  }

  addItem(item: IItemProps): void {
    this.items.push(item)
  }

  updateItem(updated: IItemProps): void {
    const index = this.items.findIndex(el => el.id === updated.id)
    if (index !== -1) {
      this.items[index] = { ...this.items[index], ...updated }
    }
  }

  removeItem(id: IItemProps['id']): void {
    const toRemove = new Set<IItemProps['id']>([id])
    const stack = [id]

    while (stack.length) {
      const current = stack.pop()!
      for (const child of this.items) {
        if (child.parent === current) {
          toRemove.add(child.id)
          stack.push(child.id)
        }
      }
    }

    this._filter(it => !toRemove.has(it.id))
  }

  private _filter(predicate: (item: IItemProps) => boolean) {
    let i = 0, j = 0
    while (i < this.items.length) {
      const el = this.items[i]
      if (predicate(el)) {
        this.items[j++] = el
      }
      i++
    }
    this.items.length = j
  }
}
