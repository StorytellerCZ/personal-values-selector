import { Template } from 'meteor/templating'
import { Log } from 'meteor/logging'
import './layout.html'
import { LOCALE } from './const'
import { initializeIntl } from '../api/intl.js'
import { INTL } from './helpers'

// TODO: This is not being called for some reason FIX IT
Template.layout.onCreated(() => {
  // Set the intl context if not set already
  let locale = 'en'
  if (LOCALE.get() !== locale) locale = LOCALE.get()

  const intlObject = INTL.get()
  if (intlObject !== null || intlObject.locale !== locale) {
    INTL.set(initializeIntl(locale))
  }
  Log.debug('INTL set to locale:', locale)
})
