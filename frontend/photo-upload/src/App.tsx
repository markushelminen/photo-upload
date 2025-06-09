import { useEffect, useState } from "react";
import "./App.css";
import Upload from "./components/Upload/Upload";
import PhotoView from "./components/PhotoView/PhotoView";
export type Photo = {
    photoName: string;
    photoUri: string;
};
export const backendPort = import.meta.env.VITE_BACKEND_PORT;
function App() {
    const [photos, setPhotos] = useState<Photo[]>([]);
    useEffect(() => {
        fetch(`http://localhost:${backendPort}/photos`)
            .then((result) => {
                return result.json();
            })
            .then((data) => {
                setPhotos([...data]);
            });
    }, []);
    return (
        <>
            <h1>Photo upload</h1>
            <p>Upload your best photographs to the internet</p>

            <section id="main-content">
                <Upload setPhotos={setPhotos} photos={photos}></Upload>
                <PhotoView photos={photos}></PhotoView>
            </section>
        </>
    );
}

export default App;
