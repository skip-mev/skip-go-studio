import { SVGProps } from "react";

export const ChevronUpIcon = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect
        width="16"
        height="16"
        fill="white"
      />
      <path
        d="M13.3745 12L15 10.4924L9.94847 5.80819C9.94765 5.80743 9.94681 5.80666 9.94599 5.8059L7.99848 4L1.81269 9.73714C1.81118 9.73853 1.80966 9.73999 1.80815 9.74137L1 10.4909L2.62552 11.9986L6.04848 8.82295C6.05026 8.82129 6.05203 8.81969 6.05383 8.81802C7.12854 7.82626 8.86501 7.82536 9.9409 8.81546C9.94352 8.81789 9.94613 8.82025 9.94875 8.82267L13.3745 12Z"
        fill="black"
      />
    </svg>
  );
};
