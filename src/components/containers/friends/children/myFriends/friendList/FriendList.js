import React from "react";
import {useLDflexList} from "@solid/react";
import "./FriendList.css";

/** Displays a list of friends with a radio button */
export default function FriendList({
                               src, offset = 0, limit = Infinity, filter = () => true,
                               container = items => <ul className="ul-format">{items}</ul>,
                               children = (item, index) => <li name="listFriend" key={index}>{`${item}`}
                               <input className="radio" name="friend" type="radio"></input></li>,
                             }) {
  const items = useLDflexList(src)
    .filter(filter)
    .slice(offset, +offset + +limit)
    .map(children);
  return container ? container(items) : items;
}