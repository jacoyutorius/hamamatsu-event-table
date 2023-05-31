import { withAuthenticator } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import { Link } from "react-router-dom";

const Register = ({ signOut, user }: any) => {
  console.log({user})

  const userEmail = user.attributes.email

  return (
    <>
      <h1>新規登録ページ</h1>
      <div>
        { userEmail }
      </div>
      <div>
        <Link to={`/`}>ホームに戻る</Link>
      </div>
    </>
  );
};

export default withAuthenticator(Register);