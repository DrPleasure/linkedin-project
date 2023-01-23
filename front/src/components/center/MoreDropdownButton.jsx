import Dropdown from "react-bootstrap/Dropdown";
import CustomToggleMoreButton from "../../customToggleElements/CustomToggleMoreButton";
import CustomMenuMoreButton from "../../customToggleElements/CustomMenuMoreButton";
import {
  Arrow90degRight,
  Download,
  FileEarmark,
  InfoSquareFill,
} from "react-bootstrap-icons";

export default function MoreDropDownButton() {
  return (
    <div className="d-flex ml-0">
      <Dropdown>
        <Dropdown.Toggle as={CustomToggleMoreButton}>
          <div className="moreDiv bg-white rounded-pill border py-1 px-3">
            <div> More</div>
          </div>
        </Dropdown.Toggle>

        <Dropdown.Menu as={CustomMenuMoreButton}>
          <Dropdown.Item eventKey="1" className="dropdown">
            <div className="d-flex align-items-center">
              <Arrow90degRight height={"20px"} />
              <p className="m-0 ml-2" style={{ color: "grey" }}>
                Send profile in a message
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item eventKey="2">
            <div className="d-flex align-items-center">
              <Download height={"20px"} />
              <p className="m-0 ml-2" style={{ color: "grey" }}>
                Save to PDF
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item eventKey="3">
            <div className="d-flex align-items-center">
              <FileEarmark height={"20px"} />
              <p className="m-0 ml-2" style={{ color: "grey" }}>
                Build a resume
              </p>
            </div>
          </Dropdown.Item>
          <Dropdown.Item eventKey="1">
            <div className="d-flex align-items-center">
              <InfoSquareFill height={"20px"} />
              <p className="m-0 ml-2" style={{ color: "grey" }}>
                About this profile
              </p>
            </div>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
