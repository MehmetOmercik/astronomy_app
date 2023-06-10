import { FC } from "react";
import { Link } from "react-router-dom";

interface LinkSimpleObject {
  value: string;
  to: string;
  className?: string;
}

export const LinkSimple: FC<LinkSimpleObject> = ({ value, to, className }) => {
  return (
    <Link to={to} className={className}>
      {value}
    </Link>
  );
};
