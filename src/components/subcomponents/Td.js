import React from 'react';
import { Link } from 'react-router-dom';

export default function Td({ children, to, cn }) {
  // Conditionally wrapping content into a link
  const ContentTag = to ? Link : 'div';

  return (
    <td className={cn}>
      <ContentTag to={to}>{children}</ContentTag>
    </td>
  );
}
