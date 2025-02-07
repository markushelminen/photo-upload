import { ChangeEvent, useState } from "react";
type UsernameProps = {
    newUsername: (_: string) => void;
};

function Username({ newUsername }: UsernameProps) {
    const [name, setName] = useState("");
    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setName(e.target.value);
    };

    const handleSubmit = () => {
        newUsername(name);
    };
    return (
        <section id="usernameinput">
            <input
                name="username"
                id="username"
                type="text"
                value={name}
                className="username"
                placeholder="Write your username here"
                onChange={handleOnChange}
            ></input>
            <button onClick={handleSubmit} type="submit">
                Choose
            </button>
        </section>
    );
}

export default Username;
