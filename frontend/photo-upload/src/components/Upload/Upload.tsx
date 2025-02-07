import { ChangeEvent, useContext, useState } from "react";
import { UserNameContext } from "../../context/username-context";
import "./Upload.css";

function Upload() {
    const [picture, setPicture] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");
    const username = useContext(UserNameContext);

    const onPictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        setPicture(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const onPictureUpload = async () => {
        if (picture === null) return;
        const formData = new FormData();

        formData.append("picture", picture);
        formData.append("username", username);

        console.log(picture);

        try {
            const result = await fetch("https://httpbin.org/post", {
                method: "POST",
                body: formData,
            });

            const data = await result.json();

            console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    const showPreview = () => {
        if (picture) {
            return (
                <div>
                    <h4>File Name: {picture.name}</h4>
                    <img
                        className="preview"
                        src={previewURL}
                        alt={picture.name}
                    />
                </div>
            );
        } else {
            return (
                <div>
                    <br />
                    <h4>Choose before Pressing the Upload button</h4>
                </div>
            );
        }
    };
    return (
        <>
            <h2>Upload</h2>
            <input
                className="upload-input"
                type="file"
                name="pictures"
                id="pictures"
                onChange={onPictureChange}
            />
            {picture && showPreview()}
            {picture && (
                <button
                    type="submit"
                    className="upload-button"
                    onClick={onPictureUpload}
                >
                    Upload
                </button>
            )}
        </>
    );
}
export default Upload;
