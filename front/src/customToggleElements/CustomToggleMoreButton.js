import React from "react";

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href="a"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
    drop={"down"}
    id={`dropdown-button-drop-down`}
    key={"down"}
  >
    {children}
  </a>
));

export default CustomToggle;
