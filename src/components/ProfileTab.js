import { useSelector, useDispatch } from "react-redux";
import { Card} from "react-bootstrap";


export const ProfileTab = () => {
    let user = useSelector((state) => state.user);

    return (
      <Card>
        <div className="row">
          <div className="item"> UserID:</div>
          <div className="item2">{user.data.id}</div>
        </div>
        <div className="row">
          <div className="item">Name: </div>
          <div className="item2">{user.data.name}</div>
        </div>
        <div className="row">
          <div className="item">Email: </div>
          <div className="item2">{user.data.email}</div>
        </div>
        <div className="row">
          <div className="item">created_at: </div>
          <div className="item2">{user.data.created_at}</div>
        </div>
        {/* <div className="row">
          <div className="item">Email: </div>
          <div className="item2">{user.data.email}</div>
        </div> */}
      </Card>
    );
  };
