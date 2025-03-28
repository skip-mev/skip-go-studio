import { SVGProps } from "react";

export const ChevronDownIcon = (props: SVGProps<SVGSVGElement>) => {
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
        d="M2.62552 4L1 5.50762L6.05153 10.1918C6.05235 10.1926 6.05319 10.1933 6.05402 10.1941L8.00152 12L14.1873 6.26286C14.1888 6.26147 14.1903 6.26001 14.1919 6.25863L15 5.50908L13.3745 4.00139L9.95152 7.17705C9.94974 7.17871 9.94797 7.18031 9.94617 7.18197C8.87146 8.17374 7.13499 8.17464 6.0591 7.18454C6.05648 7.18211 6.05387 7.17975 6.05125 7.17733L2.62552 4Z"
        fill="black"
      />
    </svg>
  );
};
