import React from "react";
import { WorkItem } from "../model/workitem.model";

interface WorkListProps {
    items: WorkItem[];
    onDeleteWork: (id: string) => void;
}

const WorkList: React.FC<WorkListProps> = (props) => {
    return (
        <ul>
            {props.items.map((item) => (
                <li key={item.id}>
                    <span>{item.title}</span>
                    <button onClick={props.onDeleteWork.bind(null, item.id)}>
                        {" "}
                        [X]{" "}
                    </button>
                </li>
            ))}
        </ul>
    );
};

export default WorkList;
