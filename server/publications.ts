import { Meteor } from 'meteor/meteor'
import { check } from 'meteor/check'
import { ValuesCollection } from '../api/collections/values'
import { ResultsCollection } from '../api/collections/results'

Meteor.publish('allValues', () => {
  return ValuesCollection.find()
})

Meteor.publish('showResult', (resultId) => {
  check(resultId, String)

  const result: { userId?: string, isPublic: boolean } = ResultsCollection.findOne(resultId, { fields: { userId: 1, isPublic: 1 } })
  const userId = Meteor.userId()

  if (result.userId && userId && result.userId === userId && result.isPublic === false) return null

  return ResultsCollection.find(resultId, { limit: 1 })
})

Meteor.publish('listUsersResults', () => {
  const userId = Meteor.userId()
  if (!userId) return null

  return ResultsCollection.find({ userId }, { fields: { userId: 1, isPublic: 1, name: 1, createdAt: 1 } })
})
