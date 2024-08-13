import apiFetch from "@wordpress/api-fetch";
import { useState, useEffect } from 'react';
const { registerBlockType } = wp.blocks;
const { createElement } = wp.element;
import { InnerBlocks, useBlockProps, InspectorControls, MediaUploadCheck, MediaUpload } from "@wordpress/block-editor";
import { PanelBody, PanelRow, Button } from "@wordpress/components";

registerBlockType("ourblocktheme/banner", {
  title: "Banner",
  icon: "shield",
  supports: {
    align: ["full"],
  },
  attributes: {
    align: { type: "string", default: "full" },
    imgID: { type: "number" },
    imgURL: { type: "string", default: window.banner.fallbackimage },
  },
  edit: EditComponent,
  save: SaveComponent,
});

function EditComponent(props) {
  useEffect(() => {
    if (props.attributes.imgID) {
      async function fetchImage() {
        const response = await apiFetch({
          path: `/wp/v2/media/${props.attributes.imgID}`,
          method: "GET",
        });
        if (response && response.media_details.sizes.pageBanner) {
          props.setAttributes({ imgURL: response.media_details.sizes.pageBanner.source_url });
        }
      }
      fetchImage();
    }
  }, [props.attributes.imgID]);

  const blockProps = useBlockProps();
  
  function onFileSelect(x) {
    props.setAttributes({ imgID: x.id });
  }

  return (
    <div {...blockProps}>
      <InspectorControls>
        <PanelBody title={"Background"} initialOpen={true}>
          <PanelRow>
            <MediaUploadCheck>
              <MediaUpload
                onSelect={onFileSelect}
                value={props.attributes.imgID}
                render={({ open }) => {
                  return <Button onClick={open}>Choose Image</Button>;
                }}
              />
            </MediaUploadCheck>
          </PanelRow>
        </PanelBody>
      </InspectorControls>
      <div className="page-banner">
        <div
          className="page-banner__bg-image"
          style={{
            backgroundImage: `url('${props.attributes.imgURL}')`,
          }}
        ></div>
        <div className="page-banner__content container t-center c-white">
          <InnerBlocks
            allowedBlocks={[
              "ourblocktheme/genericheading",
              "ourblocktheme/genericbutton",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

function SaveComponent(props) {
  const blockProps = useBlockProps.save();
  return (
    <div {...blockProps}>
      <div
        className="page-banner__bg-image"
        style={{
          backgroundImage: `url('${props.attributes.imgURL}')`,
        }}
      ></div>
      <div className="page-banner__content container t-center c-white">
        <InnerBlocks.Content />
      </div>
    </div>
  );
}
