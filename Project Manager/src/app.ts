// Drag and Drop Interfaces
interface Draggable {
    dragStartHandler(event: DragEvent): void;
    dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
    dragOverHandler(event: DragEvent): void;
    dropHandler(event: DragEvent): void;
    dragLeaveHandler(event: DragEvent): void;
}

// enum for status type
enum ProjectStatus { Active, Finished }
// Project Type
class Project {
    constructor(public id: string, public title: string, public description: string, public people: number, public status: ProjectStatus) { }
}

// type for listeners
type Listener = (items: Project[]) => void;

// Project Management Class
class ProjectState {
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
const projectState = ProjectState.getInstance();

// Validation Interface
interface Validatable {
    value: string | number,
    required?: boolean,
    minLength?: number,
    maxLength?: number,
    min?: number,
    max?: number
}

function validate(validObj: Validatable): boolean {
    let isValid = true
    if (validObj.required)
        isValid = isValid && validObj.value.toString().trim().length !== 0;
    if (typeof validObj.value == 'string') {
        if (validObj.minLength != null)
            isValid = isValid && validObj.value.trim().length >= validObj.minLength;
        if (validObj.maxLength != null)
            isValid = isValid && validObj.value.trim().length <= validObj.maxLength;
    } else if (typeof validObj.value == 'number') {
        if (validObj.min != null)
            isValid = isValid && (+validObj.value) >= validObj.min;
        if (validObj.max != null)
            isValid = isValid && (+validObj.value) <= validObj.max;
    }
    return isValid;
}

// AutoBind Decorator
function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
    const ogMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            return ogMethod.bind(this);
        }
    }
    return adjDescriptor;
}

// Component Base Abstract Class
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
    // the template constant
    templateElement: HTMLTemplateElement;
    // the ref where the template need to be put
    hostElement: T;
    // element content
    element: U;

    constructor(templateId: string, hostElementId: string, insertAtStart: boolean, newElementId?: string) {
        this.templateElement = <HTMLTemplateElement>document.getElementById(templateId)!;
        this.hostElement = document.getElementById(hostElementId)! as T;

        // content that needs to be added - here 'firstElementChild' returns '<form>' inside 'project-input'
        this.element = document.importNode(this.templateElement.content, true).firstElementChild as U;
        if (newElementId)
            this.element.id = newElementId;

        // attach the '<form>'/hostElement content inside hostElement
        this.attach(insertAtStart);
    }

    attach(insertAtStart: boolean) {
        this.hostElement.insertAdjacentElement(insertAtStart ? 'afterbegin' : 'beforeend', this.element);
    }

    abstract configure(): void;
    abstract renderContent(): void;
}

class ProjectList extends Component<HTMLDivElement, HTMLElement> implements DragTarget {
    assignedProjects: Project[] = [];

    constructor(private type: 'active' | 'finished') {
        super('project-list', 'app', false, `${type}-projects`);
        this.assignedProjects = [];

        this.configure();
        this.renderContent();
    }

    @AutoBind
    dragOverHandler(event: DragEvent) {
        if (event.dataTransfer && event.dataTransfer.types[0] === 'text/plain') {
            event.preventDefault();

            const listEl = this.element.querySelector('ul')!;
            // adds a background color of list section, when dragging
            listEl.classList.add('droppable');
        }

    };

    @AutoBind
    dropHandler(event: DragEvent) {
        const projectId = event.dataTransfer!.getData('text/plain');
        projectState.moveProject(projectId, this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished);
    };

    @AutoBind
    dragLeaveHandler(event: DragEvent) {
        const listEl = this.element.querySelector('ul')!;
        listEl.classList.remove('droppable');
    };

    configure(): void {
        this.element.addEventListener('dragover', this.dragOverHandler);
        this.element.addEventListener('drop', this.dropHandler);
        this.element.addEventListener('dragleave', this.dragLeaveHandler);

        projectState.addListener((projects: Project[]) => {
            const relevantProjects = projects.filter((projItem: Project) => {
                if (this.type == 'active')
                    return projItem.status === ProjectStatus.Active;
                if (this.type == 'finished')
                    return projItem.status === ProjectStatus.Finished;
            });
            this.assignedProjects = relevantProjects;
            this.renderProjects();
        })
    }

    renderContent() {
        this.element.querySelector('ul')!.id = `${this.type}-project-list`;
        this.element.querySelector('h2')!.textContent = `${this.type.toUpperCase()} PROJECTS`
    }

    private renderProjects() {
        const listEl = document.getElementById(`${this.type}-project-list`)! as HTMLUListElement;
        listEl.innerHTML = '';
        for (const projItem of this.assignedProjects) {
            // old - without creating 'ProjectItem' Class
            // const listItem = document.createElement('li');
            // listItem.textContent = projItem.title;
            // listEl.appendChild(listItem);

            // with 'ProjectItem' Class
            new ProjectItem(`${this.type}-project-list`, projItem);
        }
    }

}

class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    // inputs in the form
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        super('project-input', 'app', true, 'user-input');

        //populating input values
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        // add 'addEventListener' for submit
        this.configure();

    }

    configure() {
        // without using @AutoBind
        // this.element.addEventListener('submit', this.submitHandler.bind(this));

        // with @AutoBind
        this.element.addEventListener('submit', this.submitHandler);
    }

    renderContent() { }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const inputData = this.gatherUserInput();
        if (Array.isArray(inputData)) {
            const [title, desc, people] = inputData;
            projectState.addProject(title, desc, people);
            // clearing the input fields
            this.clearInputs();
        }
    }

    private gatherUserInput(): [string, string, number] | void {
        const titleValidatable: Validatable = {
            value: this.titleInputElement.value,
            required: true,
            minLength: 3,
            maxLength: 10
        }
        const descValidatable: Validatable = {
            value: this.descInputElement.value,
            required: true,
            minLength: 4,
            maxLength: 15
        }
        const peopleValidatable: Validatable = {
            value: +this.peopleInputElement.value,
            required: true,
            min: 1,
            max: 10
        }

        // validating values
        if (validate(titleValidatable) && validate(descValidatable) && validate(peopleValidatable))
            return [this.titleInputElement.value, this.descInputElement.value, +this.peopleInputElement.value]
        else {
            alert("Invalid Input, please try again!!")
            return;
        }
    }

    private clearInputs() {
        this.titleInputElement.value = '';
        this.descInputElement.value = '';
        this.peopleInputElement.value = '';
    }

}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> implements Draggable {
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
const pObj = new ProjectInput();
const activePlObj = new ProjectList('active');
const finishedPlObj = new ProjectList('finished');