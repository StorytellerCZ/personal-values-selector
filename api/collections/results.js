import { Mongo } from 'meteor/mongo'
import SimpleSchema from 'simpl-schema'

export const ResultsCollection = new Mongo.Collection('results')

const resultsSchema = new SimpleSchema({
  userId: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Id,
    index: true
  },
  email: {
    type: String,
    optional: true,
    regEx: SimpleSchema.RegEx.Email,
    index: true
  },
  name: {
    type: String,
    optional: true
  },
  public: {
    type: Boolean,
    defaultValue: true
  },
  createdAt: {
    type: Date,
    autoValue () {
      if (this.isInsert || !this.isFromTrustedCode) return new Date()
    },
    denyUpdate: true
  },
  updatedAt: {
    type: Date,
    optional: true,
    autoValue () {
      if (this.isUpdate) return new Date()
    }
  },
  // Values categories
  primary: {
    type: Array,
    // max: 3
  },
  'primary.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  strive: {
    type: Array,
    // max: 6
  },
  'strive.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  vibe: {
    type: Array,
    // max: 6
  },
  'vibe.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  respectable: {
    type: Array,
    // max: 12
  },
  'respectable.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  neutral: {
    type: Array,
    // max: 18
  },
  'neutral.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  },
  overrated: {
    type: Array
  },
  'overrated.$': {
    type: String,
    regEx: SimpleSchema.RegEx.Id,
  }
})

ResultsCollection.allow({
  insert () {
    return true
  },
  update () {
    return false
  },
  remove () {
    return false
  }
})

ResultsCollection.attachSchema(resultsSchema)
