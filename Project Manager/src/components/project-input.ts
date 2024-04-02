import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/project-state.js";
import { Validatable, validate } from "../util/validation.js";
import { Component } from "./base-component.js";

export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
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