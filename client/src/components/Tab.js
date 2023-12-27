import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { manageSelectedTab } from "../features/slices/todoSlice";

const Tab = ({ tab }) => {
  const dispatch = useDispatch();
  const { selectedTab } = useSelector((state) => state.todo);
  return (
    <span>
      <button
        className={selectedTab === tab ? "button selected" : "button"}
        onClick={() => dispatch(manageSelectedTab(tab))}
      >
        {tab}
      </button>
    </span>
  );
};

export default Tab;
