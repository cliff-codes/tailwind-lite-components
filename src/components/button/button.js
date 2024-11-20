// import { TailwindComponent } from './tailwindSyncClasses';

import { TailwindComponent } from '../tailwindSyncClasses.js';

class LiteButton extends TailwindComponent {
    constructor() {
        super();
    }

    connectedCallback() {
        //getting attributes
        const type = this.getAttribute('type') || '';
        const variant = this.getAttribute('variant') || 'default';
        const size = this.getAttribute('size') || 'md';
        const customClases = this.getAttribute('class') || '';

        const onClickAction = this.getAttribute('onClick');
        if (onClickAction) {
            this.addEventListener('click', onClickAction);
        }

        //add styles to shadow DOM
        const style = document.createElement('style');
        //Import tailwind css
        style.textContent = `
            @import url('../../dist/tailwind.css');
`;

        const button = document.createElement('button');
        button.innerHTML = `<slot></slot>`;

        if (type) {
            button.setAttribute('type', type);
        }
        // Variant styles
        const variants = {
            default:
                'bg-primary text-primary-foreground hover:bg-primary/90 shadow active:scale-95 rounded-md',
            destructive:
                'bg-destructive text-destructive-foreground hover:bg-destructive/90 shadow-sm rounded-md active:scale-95',
            outline:
                'border border-input bg-background hover:bg-accent hover:text-accent-foreground shadow-sm rounded-md active:scale-95',
            secondary:
                'bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-sm rounded-md active:scale-95',
            ghost: 'hover:bg-accent hover:text-accent-foreground rounded-md active:scale-95',
            link: 'text-primary underline-offset-4 hover:underline rounded-md active:scale-95',
        };

        const sizes = {
            sm: 'px-2 py-1 text-sm',
            md: 'px-4 py-2 text-base',
            lg: 'px-6 py-3 text-lg',
            xl: 'px-8 py-4 text-xl',
        };

        //applying variants
        button.classList.add(...variants[variant].split(' '));
        console.log(button.classList);

        //applying sizes
        button.classList.add(...sizes[size].split(' '));

        //applying custom classes for styles
        if (customClases.length > 0) {
            console.log('Custom Styles', customClases);
            const allCustomClases = customClases.split(' ');
            allCustomClases.forEach((cls) => {
                button.classList.add(cls);
            });
        }

        console.log('logging classList', button.classList);
        //observe and sync classes from the host to the button
        // this.syncClasses(this.shadowRoot.querySelector('button'));

        console.log(button.classList);
        console.log(button);

        //append button to shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(button);
    }
}

customElements.define('lite-button', LiteButton);
