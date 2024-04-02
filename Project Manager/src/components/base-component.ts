
// Component Base Abstract Class
export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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