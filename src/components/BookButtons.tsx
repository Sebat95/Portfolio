import { Dispatch, SetStateAction } from 'react';
import { pages } from '../common/constants';

interface BookButtonsProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
}

const BookButtons = (props: BookButtonsProps) => {
  const titles = pages.map((p) => p.title);
  titles.push('Back');
  return (
    <>
      {titles.map((title, i) => (
        <button
          key={i}
          className={`shrink-0 rounded-full border border-transparent px-4 py-3 text-lg uppercase transition-all duration-300 hover:border-white ${
            i === props.page
              ? 'bg-white/90 text-black'
              : 'bg-black/30 text-white'
          }`}
          onClick={() => props.setPage(i)}
        >
          {title}
        </button>
      ))}
    </>
  );
};

export default BookButtons;
