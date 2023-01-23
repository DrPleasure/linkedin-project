import { BiChevronDown } from "react-icons/bi";

const FeedFooter = () => {
  return (
    <div className="footer mt-3">
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
        }}
      >
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            About
          </a>
        </span>
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Accessibility
          </a>
        </span>
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Help Center
          </a>
        </span>
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
        }}
      >
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary ml-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Privacy & Terms
          </a>
          <BiChevronDown />
        </span>
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Ad Choices
          </a>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
        }}
      >
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Advertising
          </a>
        </span>
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Business Services <BiChevronDown />
          </a>
        </span>
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "12px",
        }}
      >
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            Get the Linkedin app
          </a>
        </span>
        <span className="my-1">
          <a
            href="https://google.com"
            className="text-secondary mx-2"
            style={{ fontWeight: "400", fontSize: "11px" }}
          >
            More
          </a>
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-2">
        <img
          src="https://logos-world.net/wp-content/uploads/2020/05/Linkedin-Logo-700x394.png"
          alt="linkedin logo"
          style={{
            width: "50px",
            display: "flex",
            gap: "4px",
            alignItems: "center",
            fontSize: "12px",
          }}
        />
        <div style={{ fontSize: "10px", paddingLeft: "5px" }}>
          Linkedin Corporation ©{new Date().getFullYear()}
        </div>
      </div>
    </div>
  );
};

export default FeedFooter;
