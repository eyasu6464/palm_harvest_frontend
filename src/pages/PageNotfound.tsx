import { Result } from 'antd';

const PageNotfound = () => {
  return (
    <div>
       <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
    />
    </div>
  )
}

export default PageNotfound
