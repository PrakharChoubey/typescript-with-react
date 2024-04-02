import { Project, ProjectStatus } from "../models/projects.js";

// type for listeners
type Listener = (items: Project[]) => void;

// Project State Management Class
export class ProjectState {
    private listeners: Listener[] = [];
    private projects: any[] = [];
    private static instance: ProjectState;

    constructor() { }

    // singleton
    static getInstance() {
        if (this.instance)
            return this.instance;
        return new ProjectState();
    }

    addListener(listenerFn: Listener) {
        this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, people: number) {
        const newProject = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);

        this.projects.push(newProject);
        this.updateListener();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
        const project = this.projects.find(prj => prj.id === projectId);
        if (project && project.status != newStatus) {
            project.status = newStatus;
            this.updateListener();
        }
    }

    private updateListener() {
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice())
        }
    }
}

// app's state
export const projectState = ProjectState.getInstance();
