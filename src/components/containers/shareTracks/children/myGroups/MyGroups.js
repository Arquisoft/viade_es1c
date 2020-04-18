import React from "react";
import "./MyGroups.css";

export const MyGroups = ({groups}) => {
    return(
        <ul className="ul-format">
            {groups.map((group, index) => {
                return(
                    <li name="groupList" key={index}>{`${group}`}
                    <input name="group" className="ck" type="checkbox"></input></li>
                )
            })}
        </ul>
    );
};