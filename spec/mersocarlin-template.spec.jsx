var React = require('react');
var TestUtils = React.addons.TestUtils;
var MersocarlinTemplate = require('../lib/mersocarlin-template.jsx');


describe("MersocarlinTemplate", function() {
  var component;

  beforeEach(function() {
    component = TestUtils.renderIntoDocument(
      <MersocarlinTemplate name="Jonh"/>
    );
  });

  it("should render", function() {
    expect(component.getDOMNode().className).toEqual('mersocarlin-template');
  });
});
