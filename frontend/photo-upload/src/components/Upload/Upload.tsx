import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import "./Upload.css";
import { backendPort, Photo } from "../../App";

type UploadProps = {
    photos: Photo[];
    setPhotos: Dispatch<SetStateAction<Photo[]>>;
};

function Upload(props: UploadProps) {
    const [picture, setPicture] = useState<File | null>(null);
    const [previewURL, setPreviewURL] = useState<string>("");

    const onPictureChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files === null) return;
        setPicture(event.target.files[0]);
        setPreviewURL(URL.createObjectURL(event.target.files[0]));
    };

    const onPictureUpload = async () => {
        if (picture === null) return;
        const formData = new FormData();

        formData.append("Picture", picture);
        try {
            const result = await fetch(
                `http://localhost:${backendPort}/photo`,
                {
                    method: "POST",
                    body: formData,
                }
            );

            const data = await result.json();
            console.log(data);
            updatePhotos(data);
        } catch (error) {
            console.error(error);
        }
    };

    const updatePhotos = (data: Photo) => {
        if (typeof data !== "string") {
            props.setPhotos([...props.photos, data]);
        }
        setPicture(null);
    };

    const showPreview = () => {
        if (picture) {
            return (
                <div>
                    <p>File Name: {picture.name}</p>
                    <img
                        className="preview"
                        src={previewURL}
                        alt={picture.name}
                    />
                </div>
            );
        }
    };
    return (
        <div className="upload">
            <input
                className="upload-input"
                type="file"
                name="pictures"
                id="pictures"
                accept=".png,.jpg,.jpeg"
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
        </div>
    );
}
export default Upload;
