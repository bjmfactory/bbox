if (Meteor.isClient) {
  Template.body.helpers({
    boxes: [
      {
        human: "bjmfactory",
        t1:    "search",
        u1:    "http://google.com",
        t2:    "search the",
        u2:    "http://google.com",
        t3:    "search the world",
        u3:    "http://google.com"
      },
      {
        human: "wisegarb",
        t1:    "shop",
        u1:    "http://amazon.com",
        t2:    "search the",
        u2:    "http://google.com",
        t3:    "search the world",
        u3:    "http://google.com"
      },
      {
        human: "boheim",
        t1:    "socialize",
        u1:    "http://facebook.com",
        t2:    "search the",
        u2:    "http://google.com",
        t3:    "search the world",
        u3:    "http://google.com"
      }
    ]
  })
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
