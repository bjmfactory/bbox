Meteor.methods({
  createLink: function(title, url){
    if (!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    var owner    = Meteor.userId();
    var username = Meteor.user().username;

    Links.insert({
      title:     title,
      url:       url,
      owner:     owner,
      username:  username,
      createdAt: new Date()
    });
  },

  deleteLink: function(linkId){
    Links.remove(linkId);
  }
});


