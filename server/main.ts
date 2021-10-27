import { Meteor } from 'meteor/meteor'
import { ValuesCollection } from '../api/collections/values'
import { DDPGracefulShutdown } from '@meteorjs/ddp-graceful-shutdown'
import { Log } from 'meteor/logging'
import './publications'
import './rate-limiting'
import '../api/methods/survey'
import { Accounts } from 'meteor/accounts-base'

if (Meteor.isProduction) {
  new DDPGracefulShutdown({
    gracePeriodMillis: 1000 * process.env.METEOR_SIGTERM_GRACE_PERIOD_SECONDS,
    server: Meteor.server
  }).installSIGTERMHandler()
}

Accounts.emailTemplates.siteName = 'Personal Values selector'
Accounts.emailTemplates.from = 'no-reply@personal-values.meteorapp.com'

Meteor.startup(() => {
  // code to run on server at startup

  // Check that we have values in the DB, if not insert them
  if (ValuesCollection.find({}, { fields: { _id: 1 }}).count() === 0) {
    Log.info('Did not detect any values in the DB, adding default values')
    import { defaultValues } from './defaultValues'

    defaultValues.forEach(value => ValuesCollection.insert(value))
  }
})
