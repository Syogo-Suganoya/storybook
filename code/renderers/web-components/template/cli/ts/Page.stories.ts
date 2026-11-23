import preview from '../../.storybook/preview';

import { html } from 'lit';

import * as HeaderStories from './Header.stories';
import type { PageProps } from './Page';
import './Page';

const meta = preview.type<{ args: PageProps }>().meta({
  title: 'Example/Page',
  render: ({ user, onLogin, onLogout, onCreateAccount }: PageProps) => html`
    <storybook-page
      .user=${user}
      @login=${onLogin}
      @logout=${onLogout}
      @create-account=${onCreateAccount}
    ></storybook-page>
  `,
});

export const LoggedIn = meta.story({
  args: {
    // More on composing args: https://storybook.js.org/docs/writing-stories/args#args-composition
    ...HeaderStories.LoggedIn.input.args,
  },
});

export const LoggedOut = meta.story({
  args: {
    ...HeaderStories.LoggedOut.input.args,
  },
});
