const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;

registerBlockType("ourblocktheme/eventsandblogs", {
  title: "Events and Blogs",


  edit: function (props) {
    return wp.element.createElement("div", {className:"our-placeholder-block"}, "This is a placeholder");
  },
  
  save: function (props) {
    return null;
  },
});
