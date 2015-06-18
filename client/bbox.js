Links = new Mongo.Collection("links");

Template.body.helpers({
  links: function() {
    return Links.find({});
  }
});

Template.body.events({
  "submit .editLink": function(event){
    console.log("this: ", this)
    console.log("event.target", event.target)

    var title = event.target.title.value;
    var url   = event.target.url.value;

    Links.update(this._id, {
      $set: {
        title: title,
        url: url,
        updatedAt: new Date()
      }
    });

    return false;
  },

  "click .delete": function(){
    Links.remove(this._id);
  }
})



