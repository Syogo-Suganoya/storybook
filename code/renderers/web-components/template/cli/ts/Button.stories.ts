import preview from '../../.storybook/preview';

import { html } from 'lit';
import { ifDefined } from 'lit/directives/if-defined.js';
import { fn } from 'storybook/test';

import type { ButtonProps } from './Button';
import './Button';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = preview.type<{ args: ButtonProps }>().meta({
  title: 'Example/Button',
  tags: ['autodocs'],
  render: ({ primary, backgroundColor, size, label, onClick }) => html`
    <storybook-button
      ?primary=${primary}
      background-color=${ifDefined(backgroundColor)}
      size=${ifDefined(size)}
      label=${label}
      @click=${onClick}
    ></storybook-button>
  `,
  argTypes: {
    backgroundColor: { control: 'color' },
    size: {
      control: { type: 'select' },
      options: ['small', 'medium', 'large'],
    },
  },
  args: { onClick: fn() },
});

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Primary = meta.story({
  args: {
    primary: true,
    label: 'Button',
  },
});

export const Secondary = meta.story({
  args: {
    label: 'Button',
  },
});

export const Large = meta.story({
  args: {
    size: 'large',
    label: 'Button',
  },
});

export const Small = meta.story({
  args: {
    size: 'small',
    label: 'Button',
  },
});
