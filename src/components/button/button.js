class LiteButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        //getting attributes
        const type = this.getAttribute('type') || '';
        const variant = this.getAttribute('variant') || '';
        const size = this.getAttribute('size') || 'md';
        const hostClasses = Array.from(this.classList);

        const onClickAction = this.getAttribute('onClick');
        if (onClickAction) {
            this.addEventListener('click', onClickAction);
        }

        //add styles to shadow DOM
        const style = document.createElement('style');

        //Import tailwind css with default host styles
        style.textContent = `
            @import url('../../dist/tailwind.css');
            :host {
                display: contents !important;,
            }
`;

        const button = document.createElement('button');
        const buttonContent = document.createElement('div');
        buttonContent.classList.add('flex', 'items-center', 'justify-center');
        buttonContent.innerHTML = `<slot></slot>`;
        button.appendChild(buttonContent);
        button.setAttribute('id', 'shadow-button');

        if (type) {
            button.setAttribute('type', type);
        }
        // Variant styles
        const variants = {
            default:
                'bg-blue-300 text-primary-foreground hover:bg-primary/90 shadow active:scale-95 rounded-md',
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
        if (variant !== '') {
            button.classList.add(...variants[variant].split(' '));
        }

        //applying sizes
        button.classList.add(...sizes[size].split(' '));

        //applying host classes
        button.classList.add(...hostClasses);

        //append button to shadow DOM
        this.shadowRoot.appendChild(style);
        this.shadowRoot.appendChild(button);
    }
}

customElements.define('lite-button', LiteButton);
