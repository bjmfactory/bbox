Links = new Mongo.Collection("links");
Meteor.subscribe("links");

Template.body.helpers({
  links: function() {
    return Links.find({});
  }
});

Template.createLink.events({
  "submit .createLink": function(event){
    console.log("createLink called")
    event.preventDefault();
    var title = event.target.title.value;
    var url   = event.target.url.value;
    Meteor.call("createLink", title, url);
    return false;
  }
})

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



