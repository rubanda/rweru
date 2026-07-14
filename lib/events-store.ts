import { create } from "zustand";
import type { EventFormat, EventStatus, EventType } from "@/lib/events";

export type EventsView = "list" | "grid";
export type EventsSort = "date-desc" | "date-asc" | "title-asc" | "title-desc";

type EventsState = {
  query: string;
  view: EventsView;
  sort: EventsSort;
  openFilter: "format" | "status" | "type" | null;
  formats: EventFormat[];
  statuses: EventStatus[];
  types: EventType[];
  setQuery: (query: string) => void;
  setView: (view: EventsView) => void;
  setSort: (sort: EventsSort) => void;
  toggleFilterOpen: (key: "format" | "status" | "type") => void;
  toggleFormat: (value: EventFormat) => void;
  toggleStatus: (value: EventStatus) => void;
  toggleType: (value: EventType) => void;
  clearFilters: () => void;
};

function toggleValue<T>(list: T[], value: T) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export const useEventsStore = create<EventsState>((set, get) => ({
  query: "",
  view: "list",
  sort: "date-desc",
  openFilter: null,
  formats: [],
  statuses: ["Upcoming"],
  types: [],
  setQuery: (query) => set({ query }),
  setView: (view) => set({ view }),
  setSort: (sort) => set({ sort }),
  toggleFilterOpen: (key) =>
    set({ openFilter: get().openFilter === key ? null : key }),
  toggleFormat: (value) => set({ formats: toggleValue(get().formats, value) }),
  toggleStatus: (value) => set({ statuses: toggleValue(get().statuses, value) }),
  toggleType: (value) => set({ types: toggleValue(get().types, value) }),
  clearFilters: () =>
    set({
      query: "",
      formats: [],
      statuses: [],
      types: [],
    }),
}));
