Links = new Mongo.Collection("links");

Meteor.startup(function () {
  // code to run on server at startup
});

Meteor.publish("links", function(){
  return Links.find();
});

