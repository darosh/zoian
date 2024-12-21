import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore("app", {
  state: () => ({
    dark: useLocalStorage("dark", false),
    columns: useLocalStorage("columns", 3),
    zebu: useLocalStorage("zebu", true),
    showConnections: useLocalStorage("showConnections", true),
    animations: useLocalStorage("animations", false),
  }),
});
