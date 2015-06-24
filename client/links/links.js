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
