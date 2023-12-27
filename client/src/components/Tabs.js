import React from "react";
import Tab from "./Tab";

export const allTabs = ["All Todos", "Active Todos", "Done Todos"];
const Tabs = () => {
  return (
    <div>
      {allTabs.map((tab) => (
        <Tab tab={tab} />
      ))}
    </div>
  );
};

export default Tabs;
