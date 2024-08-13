
registerBlockType("ourblocktheme/mynotes", {
    title: "My Notes",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "My Notes Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  