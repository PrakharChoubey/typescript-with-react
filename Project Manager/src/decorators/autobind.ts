
// AutoBind Decorator
export function AutoBind(_: any, __: string, descriptor: PropertyDescriptor) {
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
