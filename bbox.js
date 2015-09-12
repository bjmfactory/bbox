Boxes = new Mongo.Collection("boxes");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("boxes", function(){
    return Boxes.find();
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("boxes");

  // Routes
  Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });

  Router.route('/', function(){
    this.render('home');
  });

  Router.route('/text', function(){
    this.render('text');
  })

  Router.route('/b/:human', {
    name: 'boxPage',
    subscriptions: function(){
      var human = this.params.human;
      this.subscribe('boxes', { human: human });
    },
    action: function(){
      this.render();
    },
    data: function(){
      var human = this.params.human;
      return Boxes.findOne({ human: human });
    }
  });

  Router.route('e/b/:human', {
    name: 'boxEditPage',
    subscriptions: function(){
      var human = this.params.human;
      this.subscribe('boxes', { human: human });
    },
    action: function(){
      this.render();
    },
    data: function(){
      var human = this.params.human;
      return Boxes.findOne({ human: human })
    }
  })


  Template.body.helpers({
    boxes: function(){
      return Boxes.find({});
    }
  });

  Template.boxPage.events({
    "click .create-box": function(event){
      Meteor.call("createBox")
    }
  })

  Template.boxEditPage.events({
    "submit .box-edit": function(event){
      event.preventDefault();

      var box = {};

      box.name = event.target.name.value;
      box.t1 = event.target.t1.value;
      box.u1 = event.target.u1.value;
      box.t2 = event.target.t2.value;
      box.u2 = event.target.u2.value;
      box.t3 = event.target.t3.value;
      box.u3 = event.target.u3.value;

      console.log("boxEditPage- this:", this)
      console.log("boxEditPage- box:", box)
      Meteor.call("editBox", this._id, box)
    }
  });

  // Accounts
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  })
}

Meteor.methods({
  createBox: function() {
    if (!Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    var name = "Jane Doe";
    var t1 = "search";
    var u1 = "http://google.com";
    var t2 = "search the";
    var u2 = "http://google.com";
    var t3 = "search the world";
    var u3 = "http://google.com";

    Boxes.insert({
      name: name,
      t1: t1,
      u1: u1,
      t2: t2,
      u2: u2,
      t3: t3,
      u3: u3,
      createdAt: new Date(),
      updatedAt: new Date(),
      human: Meteor.user().username,
      owner: Meteor.userId()
    });
  },
  editBox: function(boxId, box){
    Boxes.update( boxId, { $set:
      {
        name: box.name,
        t1: box.t1,
        u1: box.u1,
        t2: box.t2,
        u2: box.u2,
        t3: box.t3,
        u3: box.u3,
        updatedAt: new Date()
      }
    })
  }
});

