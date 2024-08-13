
registerBlockType("ourblocktheme/page", {
    title: "Single Page",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Single Page Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  