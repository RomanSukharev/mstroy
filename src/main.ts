import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'

import { AllCommunityModule } from 'ag-grid-community'
import { ModuleRegistry } from 'ag-grid-community'
import { RowGroupingModule } from 'ag-grid-enterprise'
import { PivotModule } from 'ag-grid-enterprise'
import { TreeDataModule } from 'ag-grid-enterprise'
import { MasterDetailModule } from 'ag-grid-enterprise'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

ModuleRegistry.registerModules([
  AllCommunityModule,
  RowGroupingModule,
  PivotModule,
  TreeDataModule,
  MasterDetailModule
])

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)
app.use(pinia)

app.mount('#app')
