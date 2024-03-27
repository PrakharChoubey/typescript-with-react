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

class ProjectInput {
    // the template constant
    templateElement: HTMLTemplateElement;
    // the ref where the template need to be put
    hostElement: HTMLDivElement;
    // element content
    element: HTMLFormElement;
    // inputs in the form
    titleInputElement: HTMLInputElement;
    descInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
        this.templateElement = <HTMLTemplateElement>document.getElementById('project-input')!;
        this.hostElement = document.getElementById('app')! as HTMLDivElement;
        // content that needs to be added - here 'firstElementChild' returns '<form>' inside 'project-input'
        this.element = document.importNode(this.templateElement.content, true).firstElementChild as HTMLFormElement;
        this.element.id = 'user-input';

        //populating input values
        this.titleInputElement = this.element.querySelector('#title') as HTMLInputElement;
        this.descInputElement = this.element.querySelector('#description') as HTMLInputElement;
        this.peopleInputElement = this.element.querySelector('#people') as HTMLInputElement;

        this.configure();
        // attach the '<form>' content inside hostElement
        this.attach();
    }

    @AutoBind
    private submitHandler(event: Event) {
        event.preventDefault();
        const inputData = this.gatherUserInput();

        console.log(inputData);
    }

    private gatherUserInput(): [string, string, number] {
        return [this.titleInputElement.value, this.descInputElement.value, +this.peopleInputElement.value]
    }

    private configure() {
        // without using @AutoBind
        // this.element.addEventListener('submit', this.submitHandler.bind(this));

        // with @AutoBind
        this.element.addEventListener('submit', this.submitHandler);
    }

    private attach() {
        this.hostElement.insertAdjacentElement('afterbegin', this.element);
    }
}

const pObj = new ProjectInput();