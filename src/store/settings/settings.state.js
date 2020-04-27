import { getLocaleFromBrowser } from '@/plugins/i18n'

export default {
  locale: getLocaleFromBrowser(),
  appMode: 'patient',
  availableAppModes: ['patient']
}
