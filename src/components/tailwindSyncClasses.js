export class TailwindComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    //default button classes
    getDefaultButtonClasses() {
        return [
            'px-4',
            'py-2',
            'rounded',
            'transition-all',
            'duration-300',
            'focus:outline-none',
            'focus:ring-2',
            'focus:ring-primary-500',
            'focus:ring-offset-2',
        ];
    }

    //method to sync classes between the regurlar Dom and the Shadow Dom
    syncClasses(targetElement, classPrefix = '') {
        console.log(targetElement);
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class'
                ) {
                    const hostClasses = targetElement.getAttribute('class')
                        ? targetElement.getAttribute('class').splite('')
                        : [];
                    const tailwindClasses = hostClasses.filter((cls) =>
                        //fileter for for tailwind utitlity classes based on common prefixes
                        cls.match(
                            /^(bg-|text-|p-|m-|mt-|flex|grid|border|rounded|shadow|hover:|focus:|w-h|h-)/
                        )
                    );
                    console.log('HostNames: ', hostClasses);
                    console.log('Tailwind Classes: ', tailwindClasses);
                    // remove existing tailwind classes from target
                    targetElement.classList.forEach((cls) => {
                        if (
                            cls.match(
                                /^(bg-|text-|p-|m-|mt-|flex|grid|border|rounded|shadow|hover:|focus:|w-h|h-)/
                            )
                        ) {
                            targetElement.classList.remove(cls);
                        }
                    });
                    // re-add button's original classes
                    targetElement.classList.add(
                        ...this.getDefaultButtonClasses()
                    );
                    // add filtered tailwind classes to target
                    tailwindClasses.forEach((cls) =>
                        targetElement.classList.add(classPrefix + cls)
                    );
                }
            });
        });
        //observe host element for changes
        observer.observe(this, {
            attributes: true,
            attributeFilter: ['class'],
        });
    }
}
