import Link, { LinkProps } from 'next/link';
import { ReactNode } from 'react';

import { StyledAnchor } from './styles';

type AnchorProps = LinkProps & {
  children: ReactNode;
};

export function Anchor({ children, ...rest }: AnchorProps): JSX.Element {
  return (
    <StyledAnchor>
      <Link {...rest}>
        <a target={rest.passHref ? '_blank' : '_self'}>{children}</a>
      </Link>
    </StyledAnchor>
  );
}
