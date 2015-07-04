Links = new Mongo.Collection("links");
Meteor.subscribe("links");


// Routing
Router.map(function(){
  this.route('home', {
    path: '/'
  });
})

Router.route('/u/:username', function(){
  this.render('user', {
    data: function(){
      return Links.find({username: this.params.username}, {sort: {createdAt: -1}, limit: 3}).fetch();
    }
  });
});


// Accounts
Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});


// Helpers
Template.home.helpers({
  links: function() {
    return Links.find({}, {sort: {createdAt: -1}, limit: 3}).fetch();
  }
});


