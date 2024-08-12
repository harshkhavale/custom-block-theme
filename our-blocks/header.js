
registerBlockType("ourblocktheme/header", {
  title: "Our Fictional Header",

  edit: function (props) {
    return createElement("div", { className: "our-placeholder-block" }, "Header placeholder");
  },

  save: function (props) {
    return null;
  },
});
