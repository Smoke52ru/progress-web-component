class ProgressCircle extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});

        this.value = this.getAttribute('value') || 0;
        this.animated = this.hasAttribute('animated');
        this.hide = this.hasAttribute('hide');

        this.render()
    }

    static get observedAttributes() {
        return ['value', 'animated', 'hide']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'value') {
            this.setValue(newValue)
        } else if (name === 'animated') {
            this.setAnimated(newValue !== null)
        } else if (name === 'hide') {
            this.setHide(newValue !== null)
        }

        this.render()
    }

    setValue(value) {
        this.value = Math.max(0, Math.min(100, +value))
    }

    setAnimated(flag) {
        this.animated = !!flag
    }

    setHide(flag) {
        this.hide = !!flag
    }

    render() {
        let progressClassList = 'progress-circle'
        this.animated && (progressClassList += ' animated')
        this.hide && (progressClassList += ' hide')

        this.shadowRoot.innerHTML = `
            <style>
                @keyframes spinner {
                  to { transform: rotate(360deg); }
                }
            
                .progress-circle {
                    min-width: 1rem;
                    min-height: 1rem;
                    height: 100%;
                    width: 100%;
                    border-radius: 50%;
                    background: conic-gradient(var(--blue) ${this.value}%, var(--lightblue) 0);
                    position: relative;
                    
                    &::before {
                        content: "";
                        width: 80%;
                        height: 80%;
                        background: white;
                        border-radius: 50%;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                    }
                    
                    &.animated {
                        animation: spinner 1.5s linear infinite;
                    }
                    
                    &.hide {
                        display: none;
                    }
                }
            </style>
            <div class='${progressClassList}'>
            </div>
        `;

    }
}

customElements.define('progress-circle', ProgressCircle)