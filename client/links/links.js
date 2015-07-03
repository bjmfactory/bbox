Template.createLink.events({
  "submit .createLink": function(event){
    event.preventDefault();

    var title = event.target.title.value;
    var url   = event.target.url.value;
    Meteor.call("createLink", title, url);

    event.target.title.value = '';
    event.target.url.value   = '';

    return false;
  }
})
