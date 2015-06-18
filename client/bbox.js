Links = new Mongo.Collection("links");
Meteor.subcribe("links");

Template.body.helpers({
  links: function() {
    return Links.find({});
  }
});

Template.body.events({
  "submit .editLink": function(event){
    var title = event.target.title.value;
    var url   = event.target.url.value;
    Meteor.call("editLink", this.owner, this._id, title, url)
    return false;
  },

  "click .delete": function(){
    Meteor.call("deleteLink", this._id)
  }
})

Router.route('/', function(){
  this.render('home');
})

Accounts.ui.config({
  passwordSignupFields: "USERNAME_ONLY"
});



