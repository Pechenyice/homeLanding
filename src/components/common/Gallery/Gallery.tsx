import { ChevronLeftIcon, ChevronRightIcon } from 'assets/icons';
import { memo } from 'react';
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';

import './Gallery.css';

type Props = {
  items: ReactImageGalleryItem[];
};

export const Gallery = ({ items }: Props) => {
  return (
    <div>
      <ImageGallery
        showPlayButton={false}
        items={items}
        renderLeftNav={(onClick, disabled) => (
          <LeftNav onClick={onClick} disabled={disabled} />
        )}
        renderRightNav={(onClick, disabled) => (
          <RightNav onClick={onClick} disabled={disabled} />
        )}
      />
    </div>
  );
};

const LeftNav = memo(({ disabled, onClick }: any) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-left-nav"
      disabled={disabled}
      onClick={onClick}
    >
      <ChevronLeftIcon width={6} height={12} fill="#414FEB" />
    </button>
  );
});

const RightNav = memo(({ disabled, onClick }: any) => {
  return (
    <button
      type="button"
      className="image-gallery-icon image-gallery-right-nav"
      disabled={disabled}
      onClick={onClick}
    >
      <ChevronRightIcon width={6} height={12} fill="#414FEB" />
    </button>
  );
});
