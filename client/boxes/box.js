Meteor.subscribe("links");

Template.boxes.helpers({
  links: function() {
    return Links.find({}, {sort: {createdAt: -1}, limit: 3}).fetch();
  }
});
