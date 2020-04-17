import React from "react";
import { useWebId } from "@inrupt/solid-react-components";
import MyFriends from "./children/MyFriends";
import MyFriendGroups from "./children/MyFriendGroups";
import FriendsService from "../../../services/FriendsService";
import { Row, Col } from "react-bootstrap";

export const Friends = () => {
  const webId = useWebId();

  return (
    <section data-testid="friendsTest" style={
      {
        overflowX:"hidden" 
      }
      }>
      <Row>
        <Col>
          <MyFriends myWebId={webId} service={new FriendsService()}/>
        </Col>
        <Col>
          <MyFriendGroups myWebId={webId} service={new FriendsService()}/>
        </Col>
      </Row>
    </section>
  );
};

export default Friends;