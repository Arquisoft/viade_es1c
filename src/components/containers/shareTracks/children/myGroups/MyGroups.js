import React from "react";
import "./MyGroups.css";

export const MyGroups = ({groups}) => {
    return(
        <ul data-testid="groupList" className="ul-format">
            {groups.map((group, index) => {
                return(
                    <li name="groupList" key={index}>{`${group}`}
                    <input data-testid={"_".concat(String(index))} name="group" className="ck" type="checkbox"></input></li>
                )
            })}
        </ul>
    );
};