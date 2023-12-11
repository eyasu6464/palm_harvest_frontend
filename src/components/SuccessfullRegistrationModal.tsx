import { Result, Button } from "antd";
import { Link } from "react-router-dom";

const SuccessfullRegistrationModal = () => {
  return (
    <div>
      <Result
        status="success"
        title="Successfully Created Account!"
        subTitle="Thanks for creating your account. We will activate your account soon. An email will be sent after the activation."
        extra={[
          <Button
            type="primary"
            key="ok"
            style={{ background: "#ff6929", borderColor: "#ff6929" }}
          >
            <Link to="/">OK</Link>
          </Button>,
        ]}
      />
    </div>
  );
};

export default SuccessfullRegistrationModal;
