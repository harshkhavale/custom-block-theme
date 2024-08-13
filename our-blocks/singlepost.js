
registerBlockType("ourblocktheme/singlepost", {
    title: "Single Post",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Single Post Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  