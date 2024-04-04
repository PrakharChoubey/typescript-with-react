import React, { useState } from "react";
import WorkList from "./components/WorkList";
import NewWork from "./components/NewWork";
import { WorkItem } from "./model/workitem.model";

const App: React.FC = () => {
  // const workItems = [{ id: "t1", title: "Finish the course" }];
  const [workItems, setWorkItem] = useState<WorkItem[]>([]);

  const workItemAddHandler = (text: string) => {
    setWorkItem((prevWorkItems) => [
      ...prevWorkItems,
      {
        id: Math.random().toString(),
        title: text,
      },
    ]);
    console.log("===", workItems);
  };

  const deleteWorkItemHandler = (workId: string) => {
    setWorkItem((previtems) =>
      previtems.filter((workItem) => workItem.id !== workId)
    );
  };

  return (
    <div className="App">
      <NewWork onAddWork={workItemAddHandler} ></NewWork>
      <WorkList items={workItems} onDeleteWork={deleteWorkItemHandler}></WorkList>
    </div>
  );
};

export default App;