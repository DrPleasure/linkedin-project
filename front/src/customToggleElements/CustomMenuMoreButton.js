import React, { useState } from "react";

const CustomMenu = React.forwardRef(
  ({ children, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          margin: "0px",
          top: "auto",
          right: "auto",
          bottom: "0px",
          transform: "translate3d(0px, 143px, 0px)",
          zIndex: "1",
          borderRadius: "0 10px 10px 10px",
          boxShadow: "0px 2px 5px 2px rgba(172,172,172,0.66)",
          height: "135px",
        }}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled dropdown-menu-down">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

export default CustomMenu;
