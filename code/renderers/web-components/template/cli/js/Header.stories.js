import preview from '../../.storybook/preview';
import { html } from 'lit';
import { fn } from 'storybook/test';

import './Header';

const meta = preview.meta({
  title: 'Example/Header',
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/web-components/vue/writing-docs/autodocs
  tags: ['autodocs'],
  render: ({ user, onLogin, onLogout, onCreateAccount }) => html`
    <storybook-header
      .user=${user}
      @login=${onLogin}
      @logout=${onLogout}
      @create-account=${onCreateAccount}
    ></storybook-header>
  `,
  args: {
    onLogin: fn(),
    onLogout: fn(),
    onCreateAccount: fn(),
  },
});
export const LoggedIn = meta.story({
  args: {
    user: {
      name: 'Jane Doe',
    },
  },
});

export const LoggedOut = meta.story({
  args: {},
});
