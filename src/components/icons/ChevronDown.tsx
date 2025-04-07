import { SVGProps } from "react";

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="15"
      height="10"
      viewBox="0 0 15 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M4.99991 4.99991L4.99991 1.49427e-06L4.76831e-07 9.32687e-07L2.58278e-07 4.99991L4.99991 4.99991Z"
        fill="white"
      />
      <path
        d="M9.99995 9.99995L9.99995 5.00005L4.99991 4.99991L5.00005 9.99995L9.99995 9.99995Z"
        fill="white"
      />
      <path
        d="M15 4.99991L15 1.05715e-06L10.0001 4.95569e-07L9.99995 5.00005L15 4.99991Z"
        fill="white"
      />
    </svg>
  );
};
