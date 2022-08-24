import { FC, SVGProps } from 'react';

export const SocialVkIcon: FC<SVGProps<SVGSVGElement>> = (props) => {
  const { ...rest } = props;

  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M12.612 18C6.17691 18 2.50645 13.5884 2.35352 6.24744H5.57693C5.68281 11.6355 8.05915 13.9178 9.94145 14.3884V6.24744H12.9768V10.8944C14.8355 10.6944 16.7882 8.57678 17.447 6.24744H20.4822C19.9764 9.11794 17.8588 11.2355 16.353 12.1061C17.8588 12.8119 20.2706 14.6589 21.1882 18H17.8471C17.1295 15.7648 15.3414 14.0354 12.9768 13.8001V18H12.612Z"
        fill="#414FEB"
      />
    </svg>
  );
};
