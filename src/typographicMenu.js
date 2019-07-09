/** @jsx jsx */
import { jsx } from "@emotion/core";

import React from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import "./index.css";
import Select from "react-select";
import { components } from "react-select";
import { TreeSelect, Tooltip } from "antd";
import chroma from "chroma-js";
import { ColorSwatch } from "./helpers";
import { sampleTypographicTheme, TypographicOptions } from "./data";
import { ExpandableIndicator } from "./helpers";

const App = () => {
  return (
    <div>
      <h1>Fill Selector</h1>
    </div>
  );
};

let selectedItem = null;

export class TypographicMenu extends React.Component {
  state = {
    value: undefined
  };

  onChange = (value, key) => {
    this.setState({ value });
  };

  render() {
    const reactSelectCustomStyles = {
      control: provided => ({
        //  the outer control, i.e. the thing that looks like an input
        width: 250,
        height: "35px", // theme.layout.rowHeight.medium or similar
        border: "1px solid #888", // colortheme....
        borderRadius: "2px",
        display: "flex", // needed to align input and label centered
        alignItems: "center", // same
        fontSize: "11px", //
        fontWeight: 400
      }),
      option: (provided, isFocused, state) => ({
        // an individual list item
        ...provided,
        ":hover": {
          color: "white",
          pointer: "default !important"
        }
      }),
      singleValue: (provided, state) => ({ ...provided }),

      menu: provided => ({ ...provided, maxWidth: "250px" }),
      menuList: provided => ({
        ...provided,

        maxWidth: "260px",
        backgroundColor: "#fff"
      }),
      indicatorSeparator: (provided, state) => ({
        ...provided
      }),
      dropdownIndicator: (provided, state) => ({
        // the arrow on the dropdown
        // visibility: 'hidden',
        strokeWidth: "1px"
      })
    };

    const GenericReplacementOption = props => {
      const {
        children,
        className,
        cx,
        getStyles,
        isDisabled,
        isFocused,
        isSelected,
        innerRef,
        innerProps
      } = props;

      return (
        <div
          css={getStyles("option", props)}
          className={cx(
            {
              option: true,
              "option--is-disabled": isDisabled,
              "option--is-focused": isFocused,
              "option--is-selected": isSelected
            },
            className
          )}
          ref={innerRef}
          {...innerProps}
        >
          {children}
        </div>
      );
    };

    const ReplacementMenuForTypography = props => {
      // menu has two states: List, and Swatches

      const TypographicDetail =
        selectedItem != null ? (
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                display: "flex",
                flexDirection: "row"
              }}
            >
              <span style={{ fontWeight: 600 }}>{selectedItem.label}</span>
            </div>
            <div>
              <span style={{ color: "#aaa", fontWeight: 400 }}>
                {Object.keys(selectedItem.value).length}
                {Object.keys(selectedItem.value).length == 1
                  ? " Property"
                  : " Properties"}

                <br />
                {Object.keys(selectedItem.value).map(x => x + " ")}
              </span>
            </div>
          </div>
        ) : (
          <div>
            Nothing selected. Check the <a href="/">theme file</a>.
          </div>
        );

      return (
        <div
          css={props.getStyles("menu", props)}
          style={{ backgroundColor: "white" }}
        >
          <div
            style={{
              padding: "4px 8px",
              fontSize: "11px",
              display: "flex",
              verticalAlign: "center"
            }}
          >
            <span style={{ fontWeight: "bold", marginRight: "12px" }}>
              Fonts
            </span>{" "}
            Complex Styles
          </div>
          <div css={{ label: "wrapperForInnerMenu" }}>{props.children}</div>
          <div
            css={{
              label: "focusedElementMetadata",
              overflow: "hidden",
              backgroundColor: "#FCFCFC",
              boxShadow: "inset 0px 1px 0px 0px rgba(0,0,0,.1)",
              padding: "8px 8px",
              fontSize: "11px",
              pointerEvents: "none"
            }}
          >
            {TypographicDetail}
          </div>
        </div>
      );
    };

    /**
     * Specific Option control for color values.
     * Shows color swatch via ColorSwatch(color)
     */
    const TypographicReplacementOption = props => {
      if (props.isFocused) {
        selectedItem = props.data;
      }

      // get typographic metadata

      const fontSize =
        "fontSize" in props.data.value ? props.data.value.fontSize : "";
      const fontFamily =
        "fontFamily" in props.data.value ? props.data.value.fontFamily : "";
      const fontWeight =
        "fontWeight" in props.data.value ? props.data.value.fontWeight : "";
      const color = "color" in props.data.value ? props.data.value.color : "";

      // Color fallbacks and backdrop computation
      const appliedColor =
        "color" in props.data.value ? props.data.value.color : "#111";
      const backgroundColor =
        chroma.contrast(appliedColor, "#FFFFFF") < 4 ? "#333" : "white";

      return (
        <GenericReplacementOption {...props}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Inter",
              fontSize: "11px",
              color: "#111",
              backgroundColor: "transparent"
            }}
          >
            <div
              style={{
                fontSize: fontSize,
                fontFamily: fontFamily,
                fontWeight: fontWeight,
                color: color,
                backgroundColor: backgroundColor,
                padding: "4px 4px",
                borderRadius: "2px",
                overflow: "clip"
              }}
            >
              {props.data.label}
            </div>

            <div style={{ padding: "4px 4px", textTransform: "Capitalize" }}>
              {fontSize} {fontFamily} {fontWeight} {color}
            </div>
            <div style={{ padding: "4px 4px", color: "hsl(0,0%,50%)" }}>
              {props.data.label}
            </div>
            <div style={{ padding: "4px 4px" }}>
              {chroma.contrast(appliedColor, "#FFFFFF")}
            </div>
          </div>
        </GenericReplacementOption>
      );
    };

    const ReplacementDropdownIndicator = ({ children, ...props }) => (
      <ExpandableIndicator visible={true} />
    );

    const ReplacementClearIndicator = ({ children, ...props }) => (
      <div style={{ paddingRight: "4px", backgroundColor: "orange" }}>x</div>
    );

    const ReplacementDownChevron = ({ children, ...props }) => (
      <ExpandableIndicator visible />
    );

    const ReplacementColorSingleValue = ({ children, ...props }) => (
      <components.SingleValue {...props}>
        <div
          style={{ display: "flex", flexDirection: "row", fontSize: "11px" }}
        >
          <ColorSwatch
            color={chroma.valid(props.data.value) ? props.data.value : "white"}
            isValid={chroma.valid(props.data.value)}
            style={{ boxShadow: "inset 0px 0px 0px 1px rgba(0,0,0, .15)" }}
          />
          <span style={{ marginLeft: "8px", flexGrow: 1 }}>{children}</span>
        </div>
      </components.SingleValue>
    );

    return (
      <Select
        menuIsOpen={true}
        isMulti={false}
        closeMenuOnSelect={false}
        isClearable={true}
        components={{
          SingleValue: ReplacementColorSingleValue,
          ClearIndicator: ReplacementClearIndicator,
          DownChevron: ReplacementDownChevron,
          DropdownIndicator: ReplacementDropdownIndicator,
          Option: TypographicReplacementOption,
          Menu: ReplacementMenuForTypography
        }}
        styles={reactSelectCustomStyles}
        options={TypographicOptions}
      />
    );
  }
}
