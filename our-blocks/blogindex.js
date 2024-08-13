
registerBlockType("ourblocktheme/blogindex", {
    title: "Blog Index",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Blog Index Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  