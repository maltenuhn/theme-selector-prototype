/** @jsx jsx */
import React from "react";
import ReactDOM from "react-dom";
import { jsx } from "@emotion/core";

// new
export const ColorSwatch = props => {
  return (
    <div
      css={{
        position: "relative",
        display: "flex",
        width: "18px",
        height: "18px",
        backgroundImage:
          props.color && props.isValid
            ? "linear-gradient(45deg, hsl(0,0%,80%) 25%, transparent 25%, transparent 75%, hsl(0,0%,80%) 75%, hsl(0,0%,70%)), linear-gradient(45deg, hsl(0,0%,80%) 25%, transparent 25%, transparent 75%, hsl(0,0%,80%) 75%, hsl(0,0%,80%))"
            : "white",
        backgroundSize: "9px 9px",
        backgroundPosition: "0 0, 4px 4px",
        borderRadius: "50%",
        overflow: "clip",
        "&:before": {
          ...props.style,
          backgroundColor:
            props.color && props.isValid ? props.color : "transparent",
          content: '" "',
          position: "absolute",
          left: "0px",
          top: "0px",
          bottom: "0px",
          right: "0px",
          borderRadius: "50%"
        }
      }}
    >
      <span style={{ margin: "auto", fontWeight: 600, color: "red" }}>
        {props.isValid ? null : "?"}
      </span>

      {props.children}
    </div>
  );
};

// should already exist
export const ExpandableIndicator = props => (
  <svg
    width="8px"
    height="5px"
    viewBox="0 0 8 5"
    style={{ ...props.style, marginRight: "4px" }}
    {...props}
  >
    <g transform="translate(0.000000, -3.000000)" stroke="#979797" fill="none">
      <polyline
        transform="translate(3.500000, 3.500000) rotate(-45.000000) translate(-3.500000, -3.500000) "
        points="1 1 1 5.83333333 6 6"
      />
    </g>
  </svg>
);
