import { create } from "zustand"

interface TableSelectionState {
  selectedIds: Set<string>
  setSelectedIds: (ids: Set<string>) => void
  clear: () => void
}

export const useTableSelectionStore = create<TableSelectionState>((set) => ({
  selectedIds: new Set(),

  setSelectedIds: (ids) =>
    set({selectedIds: ids}),

  clear: () => set({ selectedIds: new Set() }),
}))