import { FlowRouter } from 'meteor/ostrio:flow-router-extra'
import { FlowRouterMeta, FlowRouterTitle } from 'meteor/ostrio:flow-router-meta';
import '../api/methods/survey'
import './helpers'
import './layout'
import './loading.html'
import './404.html'
import './navigation'
import './footer.html'
import './home'
import './about.html'
import {ResultsCollection} from "../api/collections/results";

new FlowRouterMeta(FlowRouter);
new FlowRouterTitle(FlowRouter);

FlowRouter.route('/', {
  name: 'index',
  title: 'Home',
  action() {
    this.render('layout', 'home');
  }
})

FlowRouter.route('/about', {
  name: 'about',
  title: 'About this App',
  action() { this.render('layout', 'about') }
})

FlowRouter.route('/result/:id', {
  name: 'result',
  title: (params, query, data) => {
    if (!data) return 'Not found'
    return 'Your values selection'
  },
  waitOn(params) {
    return [
      import('./result'),
      Meteor.subscribe('showResult', params.id),
      Meteor.subscribe('allValues')
    ]
  },
  whileWaiting() {
    this.render('layout', 'loading')
  },
  action(params, query, result) {
    this.render('layout', 'result', { resultId: params.id })
  },
  data(params) {
    import { ResultsCollection } from '../api/collections/results'

    return ResultsCollection.findOne(params.id)
  },
  onNoData() { this.render('layout', 'notFound') }
})

FlowRouter.route('/survey', {
  name: 'Survey',
  title: 'Survey',
  waitOn() { return [import('./survey'), Meteor.subscribe('allValues')] },
  whileWaiting() { this.render('layout', 'loading') },
  data() {
    import { ValuesCollection } from '../api/collections/values'

    return ValuesCollection.find({}).fetch()
  },
  action(params, qs, values) {
    this.render('layout', 'survey', { values })
  }
})

// 404 page
FlowRouter.route('*', {
  action() { this.render('layout', 'notFound') }
})
