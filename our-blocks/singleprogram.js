
registerBlockType("ourblocktheme/singleprogram", {
    title: "Single Program",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Single Program Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  