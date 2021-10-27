import { Template } from 'meteor/templating'
import { ReactiveVar } from 'meteor/reactive-var';
import { initializeIntl } from '../api/intl.js'
import { IntlFormatters } from '@formatjs/intl'

export const INTL = new ReactiveVar(initializeIntl('en'))

type Unit =  | 'second'  | 'minute'  | 'hour'  | 'day'  | 'week'  | 'month'  | 'quarter'  | 'year'

Template.registerHelper('formatDate', (value: number | Date, options?: IntlFormatters['formatDate']) => INTL.get().formatDate(value, options))
Template.registerHelper('formatTime', (value: number | Date, options?: IntlFormatters['formatTime']) => INTL.get().formatTime(value, options))
Template.registerHelper('formatNumber', (value: number, options?: IntlFormatters['formatNumber']) => INTL.get().formatNumber(value, options))
Template.registerHelper('formatPlural', (value: number, options?: IntlFormatters['formatPlural']) => INTL.get().formatPlural(value, options))
Template.registerHelper('formatRelativeTime', (value: number | Date, unit: Unit, options?: IntlFormatters['formatRelativeTime']) => INTL.get().formatRelativeTime(value, unit, options))
Template.registerHelper('formatList', (elements: (string)[], options?: IntlFormatters['formatList']) => INTL.get().formatList(elements, options))
Template.registerHelper('formatDisplayName', (value: string | number | Record<string, unknown>, options?: IntlFormatters['formatDisplayName']) => INTL.get().formatDisplayName(value, options))
Template.registerHelper('formatMessage', (id: string, defaultMessage?: string, values?: Record<string, unknown>) => INTL.get().formatMessage({ id, defaultMessage }, values))

export const formatMessage = (id: string, defaultMessage?: string, values?: Record<string, unknown>) => INTL.get().formatMessage({ id, defaultMessage }, values))
