export const ColorIcon = ({
  color,
  className,
}: {
  color: string;
  className?: string;
}) => {
  return (
    <svg
      width="15"
      height="16"
      viewBox="0 0 15 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect
        width="4.99991"
        height="4.99991"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 5 5.5)"
        fill={color}
      />
      <rect
        width="4.99991"
        height="4.99991"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 0 10.5)"
        fill={color}
      />
      <rect
        width="4.99991"
        height="4.99991"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 10 10.5)"
        fill={color}
      />
      <rect
        width="4.99991"
        height="4.99991"
        transform="matrix(1 8.74228e-08 8.74228e-08 -1 5 15.5)"
        fill={color}
      />
    </svg>
  );
};
