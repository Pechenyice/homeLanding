import { H1, Rating, Tag } from 'components/kit';
import { IAPIRating, IAPIFileInfo } from 'types/entities';
import { Gallery } from '../Gallery/Gallery';
import styles from './CommonEntityPreview.module.scss';

type Props = {
  name: string;
  image?: IAPIFileInfo['file'] | null;
  gallery?: IAPIFileInfo['file'][] | null;
  rating: IAPIRating;
  period: string;
};

export const CommonEntityPreview = ({
  name,
  rating,
  period,
  image,
  gallery,
}: Props) => {
  const images = [
    ...(image ? [{ original: image.path, thumbnail: image.path }] : []),
    ...(gallery?.map((photo) => ({
      original: photo.path,
      thumbnail: photo.path,
    })) ?? []),
  ];

  const isGalleryActive = !!images.length;

  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>
        <H1>{name}</H1>
        <div className={styles.meta__tags}>
          <Tag tag="Рейтинг">
            <Rating stars={rating} />
          </Tag>
          <Tag tag="Срок реализации" className={styles.nextTag}>
            {period}
          </Tag>
        </div>
      </div>
      {isGalleryActive && (
        <div className={styles.gallery}>
          <Gallery items={images as any} />
        </div>
      )}
    </div>
  );
};
