Meteor.methods({
  // creates the 3 default links
  // should be called when a new user is created
  createLinks: function(){
    if (!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    // the data for the default links
    // could make this bigger and choose them randomly for variety
    var defaultLinks = [
      {title: "search", url: "http://google.com"},
      {title: "talk",   url: "http://facebook.com"},
      {title: "buy",    url: "http://amazon.com"}
    ]

    for(var i=0; i<defaultLinks.length; i++){
      Links.insert({
        title:     defaultLinks[i][title],
        url:       defaultLinks[i][url],
        createdAt: new Date(),
        updatedAt: new Date(),
        owner:     Meteor.userId(),
        username:  Meteor.user().username
      });
    }
  },

  editLink: function(userId, linkId, title, url){
    if(!Meteor.userId !== userId){
      throw new Meteor.Error("not-authorized");
    }

    Links.update(linkId, {
      $set: {
        title: title,
        url: url,
        updatedAt: new Date()
      }
    })
  },

  deleteLink: function(linkId){
    Links.remove(linkId);
  },

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
  }
});


