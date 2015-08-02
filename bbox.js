Boxes = new Mongo.Collection("boxes") ;

if (Meteor.isClient) {
  Template.body.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });

  Template.body.events({
    "click .box-create": function(event){
      event.preventDefault();

      var name = "Ben Johnson";
      var human = "bjmfactory";
      var t1 = "search";
      var u1 = "http://google.com";
      var t2 = "search the";
      var u2 = "http://google.com";
      var t3 = "search the world";
      var u3 = "http://google.com";

      Boxes.insert({
        name: name,
        human: human,
        t1: t1,
        u1: u1,
        t2: t2,
        u2: u2,
        t3: t3,
        u3: u3,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    },

    "submit .box-edit": function(event){
      event.preventDefault();

      var name = event.target.name.value;
      var t1 = event.target.t1.value;
      var u1 = event.target.u1.value;
      var t2 = event.target.t2.value;
      var u2 = event.target.u2.value;
      var t3 = event.target.t3.value;
      var u3 = event.target.u3.value;

      Boxes.update( this._id, { $set:
        {
          name: name,
          t1: t1,
          u1: u1,
          t2: t2,
          u2: u2,
          t3: t3,
          u3: u3,
          updatedAt: new Date()
        }
      })
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
