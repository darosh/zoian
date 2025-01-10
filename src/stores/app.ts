import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

if (!localStorage.version) {
  localStorage.version = '1'
  localStorage.showParameters = 'true'
}

// You can name the return value of `defineStore()` anything you want,
// but it's best to use the name of the store and surround it with `use`
// and `Store` (e.g. `useUserStore`, `useCartStore`, `useProductStore`)
// the first argument is a unique id of the store across your application
export const useAppStore = defineStore('app', {
  state: () => ({
    dark: useLocalStorage('dark', false),
    columns: useLocalStorage('columns', 3),
    euro: useLocalStorage('euro', true),
    showConnections: useLocalStorage('showConnections', true),
    showTips: useLocalStorage('showTips', false),
    animations: useLocalStorage('animations', false),
    mouseMode: useLocalStorage('mouseMode', 2),
    showParameters: useLocalStorage('showParameters', <any>false, {
      serializer: {
        read: (v) => v === "true" ? true : v === "false" ? false : v,
        write: (v) => String(v)
      }
    }), // false, true, 'raw', 'one'
  }),
})
