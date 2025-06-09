import { useState } from "react";
import "./LargeView.css";

type ImgViewProps = {
    src: string;
};
function ImgView(props: ImgViewProps) {
    const [showLarge, setShowLarge] = useState<boolean>(false);
    const handleOnClick = () => {
        setShowLarge(!showLarge);
    };
    return (
        <>
            {showLarge && (
                <div className="overlay" onClick={handleOnClick}>
                    <img
                        className="largepic"
                        onClick={handleOnClick}
                        src={props.src}
                    ></img>
                </div>
            )}
            <img onClick={handleOnClick} src={props.src} width={100} />
        </>
    );
}

export default ImgView;
