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

  Router.route('/', {
    subscriptions: function(){
      this.subscribe('boxes', { human: "bbox" });
    },
    action: function(){
      this.render('box');
    },
    data: function(){
      return Boxes.findOne({ human: "bbox"});
    }
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
    var humans = [];
    humans[0] = index.h1
    humans[1] = index.h2
    humans[2] = index.h3
    humans[3] = index.h4
    humans[4] = index.h5
    humans[5] = index.h6
    humans[6] = index.h7
    humans[7] = index.h8
    humans[8] = index.h9

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
  }, {
    name: 'index'
  });

  Router.route('e/box', {
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

  Router.route('e/index', {
    name: 'indexEditPage',
    subscriptions: function(){
      var owner = Meteor.userId();
      this.subscribe('indexes', { owner: owner })
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
      return Indexes.findOne({ owner: owner })
    }
  });

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

  Template.indexEditPage.events({
    "submit .index-edit": function(event){
      event.preventDefault();

      var index = {};

      index.name = event.target.name.value;
      index.h1 = event.target.h1.value;
      index.h2 = event.target.h2.value;
      index.h3 = event.target.h3.value;
      index.h4 = event.target.h4.value;
      index.h5 = event.target.h5.value;
      index.h6 = event.target.h6.value;
      index.h7 = event.target.h7.value;
      index.h8 = event.target.h8.value;
      index.h9 = event.target.h9.value;

      Meteor.call("editIndex", this._id, index, this.owner)
    }
  })

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
    var name = "Jane Doe"
    var h1 = "bjmfactory"
    var h2 = "andrew"
    var h3 = "ryanpainter"
    var h4 = "dianakimball"
    var h5 = "sivers"
    var h6 = "julianna"
    var h7 = "lemony"
    var h8 = "bdylan"
    var h9 = "nyoung"

    Indexes.insert({
      h1: h1,
      h2: h2,
      h3: h3,
      h4: h4,
      h5: h5,
      h6: h6,
      h7: h7,
      h8: h8,
      h9: h9,
      name: name,
      createdAt: new Date(),
      updatedAt: new Date(),
      human: human,
      owner: owner
    });
  },

  editIndex: function(indexId, index, owner){
    if (owner !== Meteor.userId()){
      throw new Meteor.Error("not-authorized");
    }

    Indexes.update(indexId, {$set:
      {
        name: index.name,
        h1: index.h1,
        h2: index.h2,
        h3: index.h3,
        h4: index.h4,
        h5: index.h5,
        h6: index.h6,
        h7: index.h7,
        h8: index.h8,
        h9: index.h9,
        updatedAt: new Date()
      }
    })
  },

});

