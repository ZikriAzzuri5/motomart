import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";

const ProfileComponent = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    <Table bordered>
      <thead>
        <tr>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{userInfo.user.username}</td>
          <td>{userInfo.user.email}</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default ProfileComponent;
