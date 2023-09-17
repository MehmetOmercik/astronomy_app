import React, { FC } from "react";
import { Link } from "react-router-dom";

interface LinkSimpleObject {
  value: string;
  to: string;
  onClick?: (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  className?: string;
}

export const LinkSimple: FC<LinkSimpleObject> = ({ value, to, ...props }) => {
  return (
    <Link to={to} {...props}>
      {value}
    </Link>
  );
};
