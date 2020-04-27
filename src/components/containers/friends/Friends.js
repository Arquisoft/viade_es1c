import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./children/myFriends/MyFriends";
import MyFriendGroups from "./children/myFriendGroups/MyFriendGroups";
import FriendsService from "../../../services/FriendsService";
import { Row, Col } from "react-bootstrap";
import FriendGroupService from "../../../services/FriendGroupService";

export const Friends = () => {
  const webId = useWebId();

  return (
    <section data-testid="friendsTest" style={{ overflowX : "hidden" }}>
      <Row>
        <Col>
          <MyFriends myWebId={webId} service={new FriendsService()}/>
        </Col>
        <Col>
          <MyFriendGroups myWebId={webId} service={new FriendGroupService()}/>
        </Col>
      </Row>
    </section>
  );
};

export default Friends;