import { useContext } from "react";
import { UserNameContext } from "../../context/username-context";

function PhotoView() {
    const username = useContext(UserNameContext);
    return <div>{username} PhotoView</div>;
}
export default PhotoView;
