import React, { useRef } from "react";

type newWorkProps = {
    onAddWork: (workTitle: string) => void;
};

const NewWork: React.FC<newWorkProps> = (props) => {
    const workItemRef = useRef<HTMLInputElement>(null);

    const workItemSubmitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        const enteredText = workItemRef.current!.value;
        props.onAddWork(enteredText);
        workItemRef.current!.value = '';
    };

    return (
        <div className="card">
            <form onSubmit={workItemSubmitHandler}>
                <div>
                    <label htmlFor="work-title">Work title</label>
                    <input type="text" id="work-title" ref={workItemRef} />
                </div>
                <button type="submit">Add Work Item</button>
            </form>
        </div>
    );
};

export default NewWork;

