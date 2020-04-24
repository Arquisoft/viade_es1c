import React from "react";

/**
 * Select component used in different areas of the interface
 * (VisualizeTrack, ShareTrack)
 */
export const Select = (props) => {
  const { id, options, defaultValue, onChange, ...rest } = props;
  return (
    <div className="">
      <select id={id} value={defaultValue} onChange={onChange} {...rest}>
        {options &&
          options.map((option) => (
            <option value={option} key={option}>
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};
