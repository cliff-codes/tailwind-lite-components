export class TailwindComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    //method to sync classes between the regurlar Dom and the Shadow Dom
    syncClasses(targetElement, classPrefix = '') {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (
                    mutation.type === 'attributes' &&
                    mutation.attributeName === 'class'
                ) {
                    const hostClasses = this.className.split(' ');
                    const tailwindClasses = hostClasses.filter((cls) =>
                        //fileter for for tailwind utitlity classes based on common prefixes
                        cls.match(
                            /^(bg-|text-|p-|m-|mt-|flex|grid|border|rounded|shadow|hover:|focus:|w-h|h-)/
                        )
                    );
                    //remove existing tailwind classes from target
                    targetElement.classList.forEach((cls) => {
                        if (
                            cls.match(
                                /^(bg-|text-|p-|m-|mt-|flex|grid|border|rounded|shadow|hover:|focus:|w-h|h-)/
                            )
                        ) {
                            targetElement.classList.remove(cls);
                        }
                    });

                    //add filtered tailwind classes to target
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
