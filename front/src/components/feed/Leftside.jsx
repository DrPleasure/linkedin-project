import FeedCompanyDetails from "./FeedCompanyDetails";
import FeedLeftAccordeon from "./FeedLeftAccordeon";
import FeedUserDetails from "./FeedUserDetails";

const LeftSide = () => {
  return (
    <div>
      <FeedUserDetails />
      <FeedCompanyDetails />
      <FeedLeftAccordeon />
    </div>
  );
};

export default LeftSide;
