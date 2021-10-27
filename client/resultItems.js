import { Template } from 'meteor/templating'
import './resultItems.html'
import { ValuesCollection } from '../api/collections/values'

const moveToDeterminator = (currentCategory, step) => {
  const categories = ['primary', 'strive', 'vibe', 'respectable', 'neutral', 'overrated']
  const currentIndex = categories.indexOf(currentCategory)
  if (step === 'up') return categories[currentIndex - 1]
  return categories[currentIndex + 1]
}

Template.resultItems.helpers({
  intlValueName() {
    const id = this.toString()
    const value = ValuesCollection.findOne(id)
    return `value.name.${value.intlId}`
  },
  intlDesc() {
    const id = this.toString()
    const value = ValuesCollection.findOne(id)
    return `value.description.${value.intlId}`
  },
  isTopCategory() {
    return this.category === 'primary'
  },
  isLastCategory() {
    return this.category === 'overrated'
  }
})

Template.resultItems.events({
  'click button.up'(e) {
    if (!this.isOwner && this.category !== 'primary') return null
    const newCategory = moveToDeterminator(this.category, 'up')
    Meteor.call('survey.value.update', this.resultId, e.target.dataset.id, this.category, newCategory)
  },
  'click button.down'(e) {
    if (!this.isOwner && this.category !== 'overrated') return null
    const newCategory = moveToDeterminator(this.category, 'down')
    Meteor.call('survey.value.update', this.resultId, e.target.dataset.id, this.category, newCategory)
  }
})
