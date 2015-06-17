Links = new Mongo.Collection("links");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
