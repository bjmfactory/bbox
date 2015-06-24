Links = new Mongo.Collection("links");
Meteor.subscribe("links");


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

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});



