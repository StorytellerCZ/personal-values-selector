import { Meteor } from 'meteor/meteor'
import { DDPRateLimiter } from 'meteor/ddp-rate-limiter'

const allSubscriptions = Object.keys(Meteor.server.publish_handlers)
const allMethods = Object.keys(Meteor.server.method_handlers)

// subscriptions
const allSubsRule = {
  clientAddress () {
    return true
  },
  connectionId () {
    return true
  },
  type: 'subscription',
  name (name) {
    return allSubscriptions.includes(name)
  }
}

DDPRateLimiter.addRule(allSubsRule, 5, 1000)

// methods
const allMethodsRule = {
  clientAddress () {
    return true
  },
  connectionId () {
    return true
  },
  type: 'method',
  name (name) {
    return allMethods.includes(name)
  }
}

DDPRateLimiter.addRule(allMethodsRule, 5, 1000)
