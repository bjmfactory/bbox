if (Meteor.isClient) {
  Template.body.helpers({
    links: [
      { title: "hello", url: "http://google.com"},
      { title: "hello w", url: "http://google.com"},
      { title: "hello world", url: "http://google.com"}
    ]
  });
}


