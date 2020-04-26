import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// simple recursive remove keys with empty value
function removeEmpty(obj) {
  return Object.keys(obj)
    .filter(k => obj[k] !== null && obj[k] !== undefined && obj[k] !== '') // Remove undef. and null and empty.string.
    .reduce(
      (newObj, k) =>
        typeof obj[k] === 'object'
          ? Object.assign(newObj, { [k]: removeEmpty(obj[k]) }) // Recurse.
          : Object.assign(newObj, { [k]: obj[k] }), // Copy value.
      {}
    )
}

function loadLocaleMessages() {
  const locales = require.context(
    '@/locales',
    true,
    /[A-Za-z0-9-_,\s]+\.json$/i
  )
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return removeEmpty(messages)
}

export default new VueI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || 'en',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'en',
  messages: loadLocaleMessages()
})
