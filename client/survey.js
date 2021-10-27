import { Template } from 'meteor/templating'
import { ReactiveDict } from 'meteor/reactive-dict'
import { ReactiveVar } from 'meteor/reactive-var'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { Session } from 'meteor/session'
import './survey.html'
import './valuesRanker.html'

const surveyData = new ReactiveDict()
const currentStep = new ReactiveVar(0)

Template.survey.onCreated(() => {
  surveyData.set({})
  currentStep.set(0)
})

Template.survey.events({
  'click button.next'(e) {
    const current = currentStep.get()
    currentStep.set(current + 1)
  },
  'click button.previous'(e) {
    const current = currentStep.get()
    currentStep.set(current - 1)
  },
  'click button.finish'(e) {
    const data = surveyData.all()
    // Create a result and save it
    const resultId = Meteor.call('survey.result.create', data)
    Session.set('finishedSurvey', resultId)
    FlowRouter.go('result', { id: resultId })
  },
  'click button.reset'() {
    surveyData.clear()
    currentStep.set(0)
  }
})

Template.survey.helpers({
  currentStep() {
    return currentStep.get()
  },
  showingValueNum() {
    return currentStep.get() + 1
  },
  totalValues() {
    return this.values.length
  },
  isLastPage() {
    return currentStep.get() === this.values.length
  },
  isStart() {
    return currentStep.get() === 0
  },
  isEnd() {
    return currentStep.get() === this.values.length
  }
})

Template.valuesRanker.helpers({
  intlName() {
    return `value.name.${this.value.intlId}`
  },
  intlDesc() {
    return `value.description.${this.value.intlId}`
  },
  isRankSelected(value) {
    return value === surveyData.get(this.value._id)
  },
  isShown() {
    return this.values.findIndex(({ _id }) => this.value._id === _id) === currentStep.get() ? 'show' : ''
  }
})

Template.valuesRanker.events({
  'click button.valueRankerBtn'(e) {
    const rank = Number(e.target.value)
    surveyData.set(this.value._id, rank)
    const current = currentStep.get()
    currentStep.set(current + 1)
  }
})
