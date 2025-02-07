import { useState } from "react";
import "./App.css";
import { UserNameContext } from "./context/username-context";
import Upload from "./components/Upload/Upload";
import PhotoView from "./components/PhotoView/PhotoView";
import Username from "./components/Username/Username";

function App() {
    const [username, setUsername] = useState("");

    const newUsername = (name: string) => {
        setUsername(name);
    };

    return (
        <>
            <h1>Photo upload</h1>
            <p>Upload your best photographs to the internet</p>

            <Username newUsername={newUsername}></Username>
            <UserNameContext.Provider value={username}>
                <section id="main-content">
                    <Upload></Upload>
                    <PhotoView></PhotoView>
                </section>
            </UserNameContext.Provider>
        </>
    );
}

export default App;
