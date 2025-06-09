import ImgView from "./LargeView";
import { Photo } from "../../App";
import "./Photoview.css";
type PhotoViewProps = {
    photos: Photo[];
};
function PhotoView(props: PhotoViewProps) {
    return (
        <div className="photoview">
            {props.photos.map((element) => (
                <ImgView
                    key={element.photoName}
                    src={element.photoUri}
                ></ImgView>
            ))}
        </div>
    );
}
export default PhotoView;
