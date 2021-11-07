import React from "react";

const AppLayout = ({ children }) => {
  return (
    <div>
      <span>Header</span>
      {children}
    </div>
  );
};

export default AppLayout;
