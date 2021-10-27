import { createIntl, createIntlCache } from '@formatjs/intl'
import IntlMessageFormat from 'intl-messageformat'
import translations from './intl/index'

export const initializeIntl = (locale) => {
  const resolvedLocale = new IntlMessageFormat(locale).resolvedOptions().locale
  const cache = createIntlCache()

  // TODO check if the locale is available

  const messages = translations[resolvedLocale]

  return createIntl({
    locale: resolvedLocale,
    defaultLocale: 'en',
    messages
  }, cache)
}
