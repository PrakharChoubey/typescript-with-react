import { AutoBind } from "../decorators/autobind";
import { Draggable, DragTarget } from "../models/drag-drop";
import { Project } from "../models/projects";
import { Component } from "./base-component";


export class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
    private project: Project;

    get personMsg() {
        if (this.project.people === 1)
            return '1 Person'
        else
            return `${this.project.people} Persons`
    }

    constructor(private hostId: string, project: Project) {
        super('single-project', hostId, false, project.id);
        this.project = project;

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragStartHandler(event: DragEvent) {
        event.dataTransfer!.setData('text/plain', this.project.id);
        event.dataTransfer!.effectAllowed = 'move';
    };

    @AutoBind
    dragEndHandler(event: DragEvent) {
    };

    configure() {
        this.element.addEventListener('dragstart', this.dragStartHandler);
        this.element.addEventListener('dragend', this.dragEndHandler);
    }

    renderContent() {
        this.element.querySelector('h2')!.textContent = this.project.title;
        this.element.querySelector('h3')!.textContent = this.personMsg + ' assigned';
        this.element.querySelector('p')!.textContent = this.project.description;
    }
}