
registerBlockType("ourblocktheme/programarchive", {
    title: "Program Archive",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Program placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  