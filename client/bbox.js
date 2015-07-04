Links = new Mongo.Collection("links");
Users = Meteor.users;
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
      return Users.findOne({username: this.params.username}).fetch();
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


