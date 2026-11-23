import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import './button.css';

/** Primary UI component for user interaction */
export class StorybookButton extends LitElement {
  static properties = {
    primary: { type: Boolean },
    backgroundColor: { type: String, attribute: 'background-color' },
    size: { type: String },
    label: { type: String },
  };

  constructor() {
    super();
    this.primary = false;
    this.size = 'medium';
    this.label = '';
  }

  // Render into the light DOM so that the styles imported above apply to the button
  createRenderRoot() {
    return this;
  }

  render() {
    const mode = this.primary ? 'storybook-button--primary' : 'storybook-button--secondary';

    return html`
      <button
        type="button"
        class=${['storybook-button', `storybook-button--${this.size}`, mode].join(' ')}
        style=${styleMap({ backgroundColor: this.backgroundColor })}
      >
        ${this.label}
      </button>
    `;
  }
}

customElements.define('storybook-button', StorybookButton);
