import { create } from "zustand";

export type UseCasesView = "grid" | "list";

type UseCasesState = {
  view: UseCasesView;
  query: string;
  openFilter: "category" | "features" | "product" | null;
  selectedCategories: string[];
  selectedFeatures: string[];
  selectedProducts: string[];
  setView: (view: UseCasesView) => void;
  setQuery: (query: string) => void;
  toggleFilterOpen: (key: "category" | "features" | "product") => void;
  toggleCategory: (value: string) => void;
  toggleFeature: (value: string) => void;
  toggleProduct: (value: string) => void;
  clearFilters: () => void;
};

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export const useUseCasesStore = create<UseCasesState>((set, get) => ({
  view: "list",
  query: "",
  openFilter: "category",
  selectedCategories: [],
  selectedFeatures: [],
  selectedProducts: [],
  setView: (view) => set({ view }),
  setQuery: (query) => set({ query }),
  toggleFilterOpen: (key) =>
    set({ openFilter: get().openFilter === key ? null : key }),
  toggleCategory: (value) =>
    set({ selectedCategories: toggleValue(get().selectedCategories, value) }),
  toggleFeature: (value) =>
    set({ selectedFeatures: toggleValue(get().selectedFeatures, value) }),
  toggleProduct: (value) =>
    set({ selectedProducts: toggleValue(get().selectedProducts, value) }),
  clearFilters: () =>
    set({
      query: "",
      selectedCategories: [],
      selectedFeatures: [],
      selectedProducts: [],
    }),
}));
