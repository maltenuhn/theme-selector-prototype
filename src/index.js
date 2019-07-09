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
import { sampleTheme } from "./data";
import { ExpandableIndicator } from "./helpers";
import { TypographicMenu } from "./typographicMenu";

const App = () => {
  return (
    <div>
      <h1>Fill Selector</h1>
      <div style={{ display: "flex" }}>
        <TreeDemo />
        <div style={{ marginLeft: "20px" }}>
          <TypographicMenu />
        </div>
      </div>
    </div>
  );
};

const colortheme = sampleTheme;

const generateListFromTheme = theme => {
  const walk = (obj, parentPath) => {
    let listArray = [];
    Object.keys(obj).forEach(key => {
      if (typeof obj[key] === "object") {
        listArray.push(
          walk(obj[key], (parentPath === "" ? "" : parentPath + ".") + key)
        );
      } else {
        listArray.push({
          value: obj[key],
          label: parentPath + "." + key,
          customStyle: { backgroundColor: obj[key] }
        });
      }
    });
    return listArray;
  };

  const listData = walk(theme, "");
  return listData.flat();
};

// this is the list Data
const listData = generateListFromTheme(colortheme);

let selectedItem = null;

class TreeDemo extends React.Component {
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
        width: 200,
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
        width: "29px",
        height: "29px",
        display: "inline-block",
        ":hover": {
          color: "white",
          pointer: "default !important"
        }
      }),
      singleValue: (provided, state) => ({ ...provided }),

      menu: provided => ({ ...provided, maxWidth: "240px" }),
      menuList: provided => ({
        ...provided,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
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

    const ReplacementMenuForColors = props => {
      // menu has two states: List, and Swatches

      const ColorDetail =
        selectedItem != null && chroma.valid(selectedItem.value) ? (
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
                {selectedItem.value}
              </span>
            </div>

            <div>
              Contrast:&nbsp;
              {
                +chroma.contrast(chroma(selectedItem.value), "#FFF").toFixed(1)
              }{" "}
              vs white,
              {
                +chroma.contrast(chroma(selectedItem.value), "#000").toFixed(1)
              }{" "}
              vs black
            </div>
          </div>
        ) : (
          <div>
            Not a valid color. Check the <a href="/">theme file</a>.
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
              Solids
            </span>{" "}
            Gradients
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
            {ColorDetail}
          </div>
        </div>
      );
    };

    /**
     * Specific Option control for color values.
     * Shows color swatch via ColorSwatch(color)
     */
    const ColorReplacementOption = props => {
      let targetColor = chroma(
        chroma.valid(props.data.value) ? props.data.value : "rgb(225,225,225)"
      ).hex();

      const contrastThrehold = "4.12";
      const calculatedContrast = chroma.contrast("white", targetColor);
      const outlineIfRequired = "inset 0px 0px 0px 1px rgba(0,0,0, .15)";

      if (props.isFocused) {
        selectedItem = props.data;
      }

      return (
        <GenericReplacementOption {...props}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "Inter",
              fontSize: "11px",
              color: "#111",
              height: "21px",
              backgroundColor: "transparent"
            }}
          >
            <ColorSwatch
              isValid={chroma.valid(props.data.value)}
              color={targetColor}
              style={{
                boxShadow: props.isSelected
                  ? "0px 0px 0px 1px white, 0px 0px 0px 1.9px #007AFF "
                  : props.isFocused
                  ? "0px 0px 0px 1px #FFFFFF, 0px 0px 0px 0px hsl(0,0%,15%) "
                  : outlineIfRequired
              }}
            />
          </div>
        </GenericReplacementOption>
      );
    };

    const ReplacementDropdownIndicator = ({ children, ...props }) => (
      <ExpandableIndicator visible={true} style={{ marginLeft: "8px" }} />
    );

    const ReplacementClearIndicator = ({ children, ...props }) => (
      <div style={{ paddingRight: "8px", backgroundColor: "transparent" }}>
        <svg
          width="9px"
          height="9px"
          viewBox="0 0 9 9"
          version="1.1"
          {...props}
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Approach-1---Selecting-an-Element-Copy"
              transform="translate(-240.000000, -70.000000)"
              fill="#848484"
              fill-rule="nonzero"
            >
              <polygon
                id="+-copy-2"
                transform="translate(244.500000, 74.500000) rotate(45.000000) translate(-244.500000, -74.500000) "
                points="249 73.8701135 249 75.1185372 245.129887 75.1185372 245.129887 79 243.881463 79 243.881463 75.1185372 240 75.1185372 240 73.8701135 243.881463 73.8701135 243.881463 70 245.129887 70 245.129887 73.8701135"
              />
            </g>
          </g>
        </svg>
      </div>
    );

    const ReplacementDownChevron = ({ children, ...props }) => (
      <ExpandableIndicator visible {...props} />
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
          Option: ColorReplacementOption,
          Menu: ReplacementMenuForColors
        }}
        styles={reactSelectCustomStyles}
        options={listData}
      />
    );
  }
}

ReactDOM.render(<App />, document.getElementById("container"));
