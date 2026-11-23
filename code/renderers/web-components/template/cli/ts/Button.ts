import { LitElement, html } from 'lit';
import { styleMap } from 'lit/directives/style-map.js';

import './button.css';

export interface ButtonProps {
  /** Is this the principal call to action on the page? */
  primary?: boolean;
  /** What background color to use */
  backgroundColor?: string;
  /** How large should the button be? */
  size?: 'small' | 'medium' | 'large';
  /** Button contents */
  label: string;
  /** Optional click handler */
  onClick?: () => void;
}

/** Primary UI component for user interaction */
export class StorybookButton extends LitElement {
  static properties = {
    primary: { type: Boolean },
    backgroundColor: { type: String, attribute: 'background-color' },
    size: { type: String },
    label: { type: String },
  };

  declare primary: boolean;
  declare backgroundColor?: string;
  declare size: 'small' | 'medium' | 'large';
  declare label: string;

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

declare global {
  interface HTMLElementTagNameMap {
    'storybook-button': StorybookButton;
  }
}
