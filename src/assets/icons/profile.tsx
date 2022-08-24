import { FC, SVGProps } from 'react';

export const ProfileIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="20"
      height="21"
      viewBox="0 0 20 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M17.7444 17.5765C17.3171 16.407 16.3755 15.3736 15.0657 14.6366C13.7559 13.8995 12.151 13.5 10.5 13.5C8.849 13.5 7.24412 13.8995 5.93429 14.6366C4.62446 15.3736 3.68287 16.407 3.25556 17.5765"
        stroke="#414FEB"
        stroke-width="1.5"
        stroke-linecap="square"
      />
      <circle
        cx="10.5"
        cy="7"
        r="3.5"
        stroke="#414FEB"
        stroke-width="1.5"
        stroke-linecap="round"
      />
    </svg>
  );
};
