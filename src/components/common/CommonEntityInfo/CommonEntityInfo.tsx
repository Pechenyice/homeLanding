import { ReactElement } from 'react';
import { LibraryLoadingIndicator, LibraryWordEntry } from 'components';
import { ELoaderPalette, H2, H3, Link, Loader, Tag } from 'components/kit';
import { useLibraryWords } from 'hooks/queries/library/useLibraryWords';
import { useAttractingVolunteer } from 'hooks/queries/useAttractingVolunteer';
import { useCircumstancesRecognitionNeed } from 'hooks/queries/useCircumstancesRecognitionNeed';
import { useRealisationForCitizen } from 'hooks/queries/useRealisationForCitizen';
import { useSocialHelpForm } from 'hooks/queries/useSocialHelpForm';
import { ReactNode, useMemo } from 'react';
import { IAPICommonPrimaryPart } from 'types/entities';
import { getSelectedVocabularyLabels } from 'utils/common';
import styles from './CommonEntityInfo.module.scss';

type Props = {
  entity: IAPICommonPrimaryPart;
};

export const CommonEntityInfo = ({ entity }: Props) => {
  const {
    apiData: libraryWords,
    isLoading: libraryWordsLoading,
  } = useLibraryWords();

  const {
    apiData: socialHelpForm,
    isLoading: socialHelpFormLoading,
  } = useSocialHelpForm();

  const {
    apiData: realisationForCitizen,
    isLoading: realisationForCitizenLoading,
  } = useRealisationForCitizen();

  const {
    apiData: attractingVolunteer,
    isLoading: attractingVolunteerLoading,
  } = useAttractingVolunteer();

  const {
    apiData: circumstancesRecognitionNeed,
    isLoading: circumstancesRecognitionNeedLoading,
  } = useCircumstancesRecognitionNeed();

  const libraryContent = useMemo(() => {
    let content: string[] | ReactNode[] = [entity.annotation];

    libraryWords?.forEach((libraryWord) => {
      const newContent = content.map((entry) => {
        const regexp = new RegExp('(\\b' + libraryWord.word + '\\b)');

        const newEntry =
          typeof entry !== 'string' ? entry : (entry as string).split(regexp);

        return newEntry;
      });

      content = newContent.flat().map((entry) => {
        if (entry === libraryWord.word)
          return (
            <LibraryWordEntry
              word={libraryWord.word}
              meaning={libraryWord.meaning}
            />
          );

        return entry;
      });
    });

    return content;
  }, [entity.annotation, libraryWords]);

  return (
    <div className={styles.wrapper}>
      <H2 className={styles.heading}>Сведения о практике</H2>

      <div className={styles.inner}>
        <Tag tag="Аннотация">
          <div>
            {libraryWordsLoading && <LibraryLoadingIndicator />}
            <H3 className={styles.headingWithLoader}>
              <LibraryWordEntry
                word={'asd'}
                meaning={
                  'testlibraryWord.meaning testlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaning testlibraryWord.meaningv testlibraryWord.meaning testlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaningvvtestlibraryWord.meaning vtestlibraryWord.meaning  testlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaningtestlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning v testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning v testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning testlibraryWord.meaning v testlibraryWord.meaning testlibraryWord.meaning'
                }
              />
              {libraryContent || entity.annotation}{' '}
            </H3>
          </div>
        </Tag>
        <Tag tag="Формы социального обслуживания" className={styles.nextTag}>
          {socialHelpFormLoading ? (
            <Loader palette={ELoaderPalette.DARK} />
          ) : (
            <H3>
              {getSelectedVocabularyLabels(
                socialHelpForm,
                entity.social_service_ids
              ).join(';\n') || '-'}
            </H3>
          )}
        </Tag>
        <Tag tag="Видеоролик" className={styles.nextTag}>
          <H3>
            {entity.video ? (
              <Link
                href={entity.video}
                target="_blank"
                className={styles.container}
              >
                <H3 className={styles.antiCapitalize}>{entity.video}</H3>
              </Link>
            ) : (
              'Нет'
            )}
          </H3>
        </Tag>
      </div>
    </div>
  );
};
