import { createApp } from "vue"
import App from "./App.vue"
import { createI18n } from "vue-i18n/index"
import en from "./locales/en.json"
import ja from "./locales/ja.json"

export const i18n = createI18n({
  locale: "en", // set locale
  fallbackLocale: "ja", // set fallback locale
  messages: { en, ja }
})

createApp(App).use(i18n).mount("#app")
