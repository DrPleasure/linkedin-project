import { ArrowRight, Dot, InfoSquareFill, Plus } from "react-bootstrap-icons";

const FeedAddTo = () => {
  return (
    <div
      className="bg-white"
      style={{
        borderRadius: "10px",
        overflow: "hidden",
        border: "1px solid lightgrey",
      }}
    >
      <div className="d-flex justify-content-between align-items-center p-feed-x">
        <div style={{ fontWeight: "500" }}>Add to your feed</div>
        <div className="d-flex justify-content-center align-items-center editButtonIconDiv ">
          <InfoSquareFill
            style={{ fontSize: "12px" }}
            className="chevronHover"
          />
        </div>
      </div>
      <div className="d-flex align-items-start p-feed-x mt-2">
        <div
          style={{
            width: "48px",
            aspectRatio: "1/1",
            overflow: "hidden",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        >
          <img
            src="https://cdn.pixabay.com/photo/2021/05/24/17/06/instagram-6279866_960_720.png"
            alt="feed logo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="p-feed-left ">
          <div style={{ fontSize: "12px", fontWeight: "500" }}>Instagram</div>
          <div className="pb-1" style={{ fontSize: "12px" }}>
            Company <Dot /> Social network
          </div>

          <div
            className="rounded-pill text-dark d-flex align-items-center mb-2 connect-button"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              border: "1px solid",
              width: "97px",
            }}
          >
            <div
              className="px-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              <Plus />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Follow
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-start p-feed-x">
        <div
          style={{
            width: "48px",
            aspectRatio: "1/1",
            overflow: "hidden",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        >
          <img
            src="https://placekitten.com/300/300"
            alt="feed logo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="p-feed-left">
          <div style={{ fontSize: "12px", fontWeight: "500" }}>
            Akbar Rahimov
          </div>
          <div className="pb-1" style={{ fontSize: "12px" }}>
            Need help with your Web-Apps?
          </div>

          <div
            className="rounded-pill text-dark d-flex align-items-center mb-2 connect-button"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              border: "1px solid",
              width: "97px",
            }}
          >
            <div
              className="px-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              <Plus />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Follow
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex align-items-start p-feed-x">
        <div
          style={{
            width: "48px",
            aspectRatio: "1/1",
            overflow: "hidden",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        >
          <img
            src="https://picsum.photos/300/300"
            alt="feed logo"
            style={{ width: "100%" }}
          />
        </div>
        <div className="p-feed-left">
          <div style={{ fontSize: "12px", fontWeight: "500" }}>Harry Lumb</div>
          <div className="pb-1" style={{ fontSize: "12px" }}>
            Looking for a job? I got you!
          </div>

          <div
            className="rounded-pill text-dark d-flex align-items-center mb-2 connect-button"
            style={{
              fontSize: "16px",
              fontWeight: "500",
              border: "1px solid",
              width: "97px",
            }}
          >
            <div
              className="px-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "22px",
                fontWeight: "500",
              }}
            >
              <Plus />
            </div>
            <div
              className="pr-1 d-flex justify-content-center align-items-center"
              style={{
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Follow
            </div>
          </div>
        </div>
      </div>
      <div className="d-flex p-feed-left py-2 align-items-center">
        <div
          className="hoverGreyBg text-secondary"
          style={{
            fontSize: "12px",
            fontWeight: "500",
          }}
        >
          View all recommentations <ArrowRight />
        </div>
      </div>
    </div>
  );
};

export default FeedAddTo;
