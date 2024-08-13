import { registerBlockType } from "@wordpress/blocks";
import { createElement } from "@wordpress/element";
import {
  useBlockProps,
  RichText,
  BlockControls,
} from "@wordpress/block-editor";
import { ToolbarGroup, ToolbarButton } from "@wordpress/components";

registerBlockType("ourblocktheme/genericheading", {
  title: "Generic Heading",
  icon: "editor-textcolor",
  category: "common",

  attributes: {
    text: {
      type: "string",
      source: "html",
      selector: "h1,h2,h3",
      default: "Heading Text",
    },
    size: {
      type: "string",
      default: "large",
    },
  },

  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  const { attributes, setAttributes } = props;

  function handleTextChange(newText) {
    setAttributes({ text: newText });
  }

  function handleSizeChange(newSize) {
    setAttributes({ size: newSize });
  }

  const blockProps = useBlockProps();

  return (
    <div {...blockProps}>
      <BlockControls>
        <ToolbarGroup>
          <ToolbarButton
            icon="editor-textcolor"
            isPressed={attributes.size === "large"}
            label="Large"
            onClick={() => handleSizeChange("large")}
          />
          <ToolbarButton
            icon="editor-textcolor"
            isPressed={attributes.size === "medium"}
            label="Medium"
            onClick={() => handleSizeChange("medium")}
          />
          <ToolbarButton
            icon="editor-textcolor"
            isPressed={attributes.size === "small"}
            label="Small"
            onClick={() => handleSizeChange("small")}
          />
        </ToolbarGroup>
      </BlockControls>
      <RichText
        tagName="h1"
        className={`headline headline--${attributes.size}`}
        value={attributes.text}
        onChange={handleTextChange}
        placeholder="Enter heading text..."
      />
    </div>
  );
}

function SaveComponent(props) {
  const { attributes } = props;

  function createTagName() {
    switch (attributes.size) {
      case "large":
        return "h1";
      case "medium":
        return "h2";
      case "small":
        return "h3";
      default:
        return "h1";
    }
  }

  return (
    <RichText.Content
      tagName={createTagName()}
      className={`headline headline--${attributes.size}`}
      value={attributes.text}
    />
  );
}
