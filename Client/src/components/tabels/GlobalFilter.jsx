import React, { useState } from "react";
import { useAsyncDebounce } from "react-table";
import "regenerator-runtime/runtime";

export const GlobalFilter = (props) => {
  const { filter, setFilter } = props;
  const [value, setValue] = useState(filter);

  const onChange = useAsyncDebounce((value) => {
    setFilter(value);
  }, 400);

  return (
    <span>
      Search :{" "}
      <input
        value={value || ""}
        onChange={(e) => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder="Type to filter..."
      />
    </span>
  );
};
