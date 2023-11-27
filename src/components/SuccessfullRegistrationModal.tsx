import { Result } from "antd"
const SuccessfullRegistrationModal = () => {
  return (
    <div>
      <Result
        status="success"
        title="Successfully Created Account!"
        subTitle="Thanks for creating your account. We will activate you account soon. An email will be send after the activation."
    />
    </div>
  )
}

export default SuccessfullRegistrationModal
