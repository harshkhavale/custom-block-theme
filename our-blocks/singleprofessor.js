
registerBlockType("ourblocktheme/singleprofessor", {
    title: "Single Professor",
  
    edit: function (props) {
      return createElement("div", { className: "our-placeholder-block" }, "Single Professor Placeholder");
    },
  
    save: function (props) {
      return null;
    },
  });
  