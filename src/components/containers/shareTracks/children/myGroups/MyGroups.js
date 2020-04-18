import React from "react";

export const MyGroups = ({groups}) => {
    return(
        <ul>
            {groups.map((group, index) => {
                return(
                    <li name="groupList" key={index}>{`${group}`}
                    <input name="group" className="ck" type="checkbox"></input></li>
                )
            })}
        </ul>
    );
};