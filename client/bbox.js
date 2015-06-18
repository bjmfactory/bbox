Links = new Mongo.Collection("links");

Template.body.helpers({
  links: function() {
    return Links.find({});
  }
});

Template.body.events({
  "submit .new-link": function(event) {
    var title = event.target.title.value;
    var url   = event.target.url.value;
    console.log("title: ", title)
    console.log("url: ", url)

    Links.insert({
      title: title,
      url: url,
      createdAt: new Date()
    });

    return false;
  }
})



