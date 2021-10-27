import { Meteor } from "meteor/meteor"
import { Template } from 'meteor/templating'
import { Session } from 'meteor/session'

import './result.html'

// result items template
import './resultItems'
import './sharing'
import { ResultsCollection } from '../api/collections/results'

Template.result.helpers({
  result() {
    // We subscribe on the route level, but have to get the data here for reactivity
    return ResultsCollection.findOne(this.resultId)
  },
  intlValuesObject(num) {
    return { maxValues: num || 0 }
  },
  isOwner() {
    return Session.get('finishedSurvey') === this.result?._id || this.result?.userId === Meteor.userId()
  }
})

Template.result.events({
  'click button#claimResult'(e) {},
  'click button#sendResult'(e) {}
})
