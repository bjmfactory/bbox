Meteor.subscribe("links");

Template.boxes.helpers({
  links: function() {
    return Links.find().fetch();
  }
});
