class MyDialog extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                :host { 
                    display: none; 
                }
                :host([opened]) { 
                    background-color: var(--colour-light-shade);
                    width: min(65em, 100%);
                    display: block; 
                    position: fixed; 
                    top: 50%; 
                    left: 50%; 
                    transform: translate(-50%, -50%); 
                    background: white; 
                    border: 0.1rem solid black; 
                    padding: 1.5rem; 
                    z-index: 1000;
                    margin: 0 auto;
                    text-align: center;
                    border-radius: 0.5rem;
                    box-shadow: 0 0 0.4rem #000;
                    max-width: 45rem;
                }
                .info { 
                    background-color: lightblue; 
                    color: black; 
                }
                .success { 
                    background-color: lightgreen; 
                    color: black; 
                }
                .error { 
                    background-color: lightcoral; 
                    color: white; 
                }
                .title {
                    margin: 0;
                    margin-bottom: 0.5rem;
                }
                .subtitle {
                    margin: 0;
                    margin-bottom: 1rem;
                }
                button { margin: 0.5rem; }
                .btn { display: inline-block;
                    padding: 0.55em 1.5em 0.5em;
                    background-color: var(--colour-dark-shade);
                    border: 0.125rem solid #000;
                    color: var(--colour-light-shade);
                    border-radius: 0.5em;
                    box-shadow: 0 0.25rem 0.75rem #0004;
                    text-align: center;
                    transition: all 0.2s;
                    text-decoration: none;
                    cursor: pointer;
                    font-family: inherit;
                    font-size: inherit;
                    transition: background-color 0.2s, border-color 0.2s, color 0.2s;
                    &:is(:hover, :focus) {
                      background-color: var(--colour-secondary);
                      border-color: var(--colour-dark-shade);
                      color: var(--colour-light-shade);
                    }
                }
            </style>
            <div class="dialog ${this.getAttribute('level')}">
                <h1 class="title"><slot name="title"></slot></h1>
                <p class="subtitle"><slot name="message"></slot></p>
                <button class="btn">${this.getAttribute('label')}</button>
            </div>
        `;

        const btn = this.shadowRoot.querySelector('button');
        btn.addEventListener('click', () => {
            const action = this.getAttribute('action');
            if(action && window[action]) {
                window[action]();
            }
            this.close();
        });

        this.addEventListener('click', () => this.close());
    }

    open() {
        this.setAttribute('opened', '');
    }

    close() {
        this.removeAttribute('opened');
    }

    static get observedAttributes() { return ['level']; }

    attributeChangedCallback(name, oldValue, newValue) {
        if(name === 'level') {
            this.shadowRoot.querySelector('.dialog').className = `dialog ${newValue}`;
        }
    }
}

customElements.define('jay-dialog', MyDialog);
