Links = new Mongo.Collection("links");

Template.body.helpers({
  links: function() {
    return Links.find({});
  }
});



