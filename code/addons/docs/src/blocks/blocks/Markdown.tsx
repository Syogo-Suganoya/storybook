/* oxlint-disable react-classic/destructuring-assignment */
import type { ComponentProps } from 'react';
import React, { Children, createContext, useContext } from 'react';

import { Code } from 'storybook/internal/components';

import PureMarkdown from 'markdown-to-jsx';
import { dedent } from 'ts-dedent';

import { AnchorMdx, CodeOrSourceMdx, HeadersMdx } from './mdx';
import { withMdxComponentOverride } from './with-mdx-component-override';

// mirror props from markdown-to-jsx. From https://react-typescript-cheatsheet.netlify.app/docs/advanced/patterns_by_usecase#wrappingmirroring-a-component
type MarkdownProps = typeof PureMarkdown extends React.ComponentType<infer Props> ? Props : never;

// Code outside a `<pre>` is an inline code span, even when it spans lines: rendering it as a block
// would nest the block inside the surrounding `<p>`. As in CommonMark, its line endings are spaces.
const InsidePre = createContext(false);

const PreMdx = (props: ComponentProps<'pre'>) => (
  <InsidePre.Provider value={true}>
    <pre {...props} />
  </InsidePre.Provider>
);

const MarkdownCodeMdx = (props: ComponentProps<typeof CodeOrSourceMdx>) =>
  useContext(InsidePre) ? (
    <CodeOrSourceMdx {...props} />
  ) : (
    <Code>
      {Children.map(props.children, (child) =>
        typeof child === 'string' ? child.replace(/\r?\n/g, ' ') : child
      )}
    </Code>
  );

const MarkdownImpl = (props: MarkdownProps) => {
  if (!props.children) {
    return null;
  }
  if (typeof props.children !== 'string') {
    throw new Error(
      dedent`The Markdown block only accepts children as a single string, but children were of type: '${typeof props.children}'
        This is often caused by not wrapping the child in a template string.
        
        This is invalid:
        <Markdown>
          # Some heading
          A paragraph
        </Markdown>

        Instead do:
        <Markdown>
        {\`
          # Some heading
          A paragraph
        \`}
        </Markdown>
      `
    );
  }
  return (
    <PureMarkdown
      {...props}
      options={{
        forceBlock: true,
        overrides: {
          code: MarkdownCodeMdx,
          pre: PreMdx,
          a: AnchorMdx,
          ...HeadersMdx,
          ...props?.options?.overrides,
        },
        ...props?.options,
      }}
    />
  );
};

export const Markdown = withMdxComponentOverride('Markdown', MarkdownImpl);
