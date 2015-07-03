Links = new Mongo.Collection("links");
Meteor.subscribe("links");


// Routing
Router.map(function(){
  this.route('home', {
    path: '/'
  });
})

Router.route('/b/:username', function(){
  this.render('box', {
    data: function(){
      return Links.find({username: this.params.username});
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


