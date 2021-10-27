import { Template } from 'meteor/templating';

import './home.html';

Template.home.onRendered(() => {
  console.log('home rendered')
})
