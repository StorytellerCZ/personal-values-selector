import { Meteor } from 'meteor/meteor'
import { check, Match } from 'meteor/check'
import { ResultsCollection } from '../collections/results'

Meteor.methods({
  'survey.result.create'(data) {
    check(data, Object)

    const userId = Meteor.userId()
    // Sort values by score
    const results = Object.keys(data).sort((a, b) => {
      if (data[a] > data[b]) return -1
      if (data[a] < data[b]) return 1
      return 0
    })
    // Now divide into categories
    const primary = results.slice(0, 3)
    const strive = results.slice(3, 9)
    const vibe = results.slice(9, 15)
    const respectable = results.slice(15, 27)
    const neutral = results.slice(27, 35)
    const overrated = results.slice(35)
    // Separate into respective categories

    return ResultsCollection.insert({ userId, primary, strive, vibe, respectable, neutral, overrated })
  },
  'survey.value.update'(resultId: string, valueId: string, moveFrom: string, moveTo: string) {
    check(resultId, String)
    check(valueId, String)
    check(moveFrom, Match.OneOf('primary', 'strive', 'vibe', 'respectable', 'neutral', 'overrated'))
    check(moveTo, Match.OneOf('primary', 'strive', 'vibe', 'respectable', 'neutral', 'overrated'))

    if(Meteor.isServer) {
      return ResultsCollection.update(resultId, { $pull: { [moveFrom]: valueId }, $push: { [moveTo]: valueId }  })
    } else {
      // client
      const result = ResultsCollection.findOne(resultId)

    }
  },
})
