Meteor.methods({
  createLink: function(title, url){
    if (!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Links.insert({
      title:     title,
      url:       url,
      createdAt: new Date(),
      updatedAt: new Date(),
      owner:     Meteor.userId(),
      username:  Meteor.user().username
    });
  },

  deleteLink: function(linkId){
    Links.remove(linkId);
  }
});


