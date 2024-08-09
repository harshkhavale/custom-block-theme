(()=>{"use strict";const e=window.wp.blocks,t=(window.wp.element,window.wp.blockEditor),i=window.wp.components,o=window.ReactJSXRuntime;(0,e.registerBlockType)("ourblocktheme/genericheader",{title:"Generic Heading",icon:"editor-textcolor",category:"common",attributes:{text:{type:"string",source:"html",selector:"h1",default:"Heading Text"},size:{type:"string",default:"large"}},edit:function(e){const{attributes:s,setAttributes:n}=e;function r(e){n({size:e})}const l=(0,t.useBlockProps)();return(0,o.jsxs)("div",{...l,children:[(0,o.jsx)(t.BlockControls,{children:(0,o.jsxs)(i.ToolbarGroup,{children:[(0,o.jsx)(i.ToolbarButton,{icon:"editor-textcolor",isPressed:"large"===s.size,label:"Large",onClick:()=>r("large")}),(0,o.jsx)(i.ToolbarButton,{icon:"editor-textcolor",isPressed:"medium"===s.size,label:"Medium",onClick:()=>r("medium")}),(0,o.jsx)(i.ToolbarButton,{icon:"editor-textcolor",isPressed:"small"===s.size,label:"Small",onClick:()=>r("small")})]})}),(0,o.jsx)(t.RichText,{tagName:"h1",className:`headline headline--${s.size}`,value:s.text,onChange:function(e){n({text:e})},placeholder:"Enter heading text..."})]})},save:function(e){const{attributes:i}=e,s=t.useBlockProps.save();return(0,o.jsx)("div",{...s,children:(0,o.jsx)(t.RichText.Content,{tagName:function(){switch(e.attributes.size){case"large":default:return"h1";case"medium":return"h2";case"small":return"h3"}}(),className:`headline headline--${i.size}`,value:e.attributes.text})})}})})();