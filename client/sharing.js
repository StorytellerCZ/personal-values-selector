import './sharing.html'
import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { formatMessage } from './helpers'

Template.sharing.helpers({
  isDesktop() {
    const android = navigator.userAgent.match(/Android/i)
    const ios = navigator.userAgent.match(/iPhone|iPad|iPod/i)
    // const mac = navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/i) // Test if mac to use ios/mac share icon on title, used to invoke the familiarity concept.

    return !(ios || android)
  },
  url() {
    return Meteor.absoluteUrl(`result/${this.resultId}`)
  },
  title() {
    return encodeURIComponent(formatMessage('sharing.shareTitle'))
  },
  text() {
    return encodeURIComponent(formatMessage('sharing.textIntro'))
  },
  encodedUrl() {
    return encodeURIComponent(Meteor.absoluteUrl(`result/${this.resultId}`))
  }
})
