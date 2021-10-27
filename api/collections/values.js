import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const ValuesCollection = new Mongo.Collection('values')

const valuesSchema = new SimpleSchema({
  intlId: {
    type: String
  },
  defaultName: {
    type: String
  },
  defaultDescription: {
    type: String,
    optional: true
  }
})

ValuesCollection.allow({
  insert () {
    return false
  },
  update () {
    return false
  },
  remove () {
    return false
  }
})

ValuesCollection.attachSchema(valuesSchema)
