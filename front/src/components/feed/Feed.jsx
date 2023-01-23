import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { getMyProfileDetailsAction } from "../../redux/actions";
import Center from "./Center";
import Leftside from "./Leftside";
import Rightside from "./Rightside";

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyProfileDetailsAction());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col xs={3} className={"pr-4 pl-0"}>
          <div>
            <Leftside />
          </div>
        </Col>
        <Col xs={6} className={"pr-4 pl-0"}>
          <div>
            <Center />
          </div>
        </Col>
        <Col xs={3} className={"px-0"}>
          <div>
            <Rightside />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Feed;
