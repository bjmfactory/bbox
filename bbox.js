Boxes = new Mongo.Collection("boxes");
Indexes = new Mongo.Collection("indexes");

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("boxes", function(){
    return Boxes.find();
  });

  Meteor.publish("indexes", function(){
    return Indexes.find();
  })

  // Accounts
  Accounts.onCreateUser(function(options, user) {
    Meteor.call("createBox", user.username, user._id);
    Meteor.call("createIndex", user.username, user._id);

    if (options.profile) {
      user.profile = options.profile;
    }

    return user;
  });
}

if (Meteor.isClient) {
  Meteor.subscribe("boxes");
  Meteor.subscribe("indexes");

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
    name: 'box',
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

  Router.route('/i/:human', function() {
    var human = this.params.human;
    var index = Indexes.findOne({ human: human });
    var humans = index.humans;

    this.render('index-head', {
      to: 'head',
      data: function(){
        return Indexes.findOne({ human: human })
      }
    })

    this.render('index', {
      data: function(){
        return Boxes.find({ human: {$in: humans } })
      }
    })
    // name: 'indexPage',
    // subscriptions: function(){
    //   var human = this.params.human;
    //   this.subscribe('indexes', { human: human });
    //   var index = Indexes.findOne({ human: human });
    //   var humans = index.humans;
    //   this.subscribe('boxes', {human: {$in: humans}})
    // },
    // action: function(){
    //   if (this.ready()){
    //     this.render();
    //   } else {
    //     this.render('loading')
    //   }
    // },
    // data: function(){
    //   var human = this.params.human;
    //   var index = Indexes.findOne({ human: human});
    //   console.log("index: ", index)
    //   var humans = index.humans;
    //   console.log("humans: ", humans)
    //   var data = Boxes.find({ human: {$in: humans} });
    //   console.log("data: ", data)
    //   return data;
    // }
  })

  Router.route('e/b', {
    name: 'boxEditPage',
    subscriptions: function(){
      var owner = Meteor.userId();
      this.subscribe('boxes', { owner: owner });
    },
    action: function(){
      if (this.ready()){
        this.render();
      } else {
        this.render('loading');
      }
    },
    data: function(){
      var owner = Meteor.userId();
      return Boxes.findOne({ owner: owner })
    }
  });

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

      Meteor.call("editBox", this._id, box, this.owner)
    }
  });

  // Accounts
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  })
}

Meteor.methods({
  // Box Methods
  createBox: function(human, owner) {

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
      human: human,
      owner: owner
    });
  },

  editBox: function(boxId, box, owner){
    if (owner !== Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

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
  },

  // Index Methods
  createIndex: function(human, owner) {
    var name   = "Jane Doe"
    var humans = [
      "bjmfactory",
      "andrew",
      "boheim",
      "ryanpainter",
      "dianakimball",
      "sivers",
      "julianna",
      "lemony",
      "snicket"
    ];

    Indexes.insert({
      name: name,
      humans: humans,
      createdAt: new Date(),
      updatedAt: new Date(),
      human: human,
      owner: owner
    });
  },

});

