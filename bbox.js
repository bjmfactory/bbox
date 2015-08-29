Boxes = new Mongo.Collection("boxes") ;

if (Meteor.isClient) {
  // Routes
  Router.configure({
    layoutTemplate: 'ApplicationLayout'
  });

  Router.route('/', function(){
    this.render('home');
  });

  Router.route('/b/:human', {
    name: 'boxPage',
    subscriptions: function(){
      var human = this.params.human;
      console.log('this is human:', human);
      this.subscribe('boxes', { human: human })
    },
    action: function(){
      this.render();
    },
    data: function(){
      var human = this.params.human;
      return Boxes.findOne({human: human});
    }
  });

  Router.route('edit/b', {
    name: 'boxEditPage',
    subscriptions: function(){
      var human = Meteor.user().username;
      this.subscribe('boxes', {human: human })
    },
    onBeforeAction: function(){
      var human = Meteor.user().username;
      var exists = Boxes.findOne({human: human});
      if (!exists) {
        console.log('box did not exist for:', human, 'about to make a new one')
        Meteor.call("createBox");
      }
      this.next();
    },
    action: function(){
      this.render();
    },
    data: function(){
      var human = Meteor.user().username;
      return Boxes.findOne({human: human});
    }
  })


  Template.body.helpers({
    boxes: function(){
      return Boxes.find({});
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

      Meteor.call("editBox", this._id, box)
    }
  });

  // Accounts
  Accounts.ui.config({
    passwordSignupFields: "USERNAME_AND_EMAIL"
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });

  Meteor.publish("boxes", function(){
    return Boxes.find();
  });

  // Methods
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
      Boxes.update( this._id, { $set:
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
  })

}
