
registerBlockType("ourblocktheme/footer", {
  title: "Our Fictional Footer",

  edit: function (props) {
    return createElement("div", { className: "our-placeholder-block" }, "Footer placeholder");
  },

  save: function (props) {
    return null;
  },
});
