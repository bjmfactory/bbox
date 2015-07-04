Meteor.subscribe("links");

Template.boxes.helpers({
  users: function() {
    // mock data. this will be replaced with an array of user IDs
    // when someone clicks "follow" on another persons profile page,
    // it will unshift that ID to the front and cut one off the end
    // if the array is longer than 9 (or should keep it and only display the first 9)?
    return [{ username: "bjmfactory"}, { username: "benjamin" }, { username: "robert"}];
  },
  links: function(username) {
    return Links.find({username: username}, {sort: {createdAt: -1}, limit: 3}).fetch();
  }
});
