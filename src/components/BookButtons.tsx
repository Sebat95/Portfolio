import { Dispatch, SetStateAction } from "react";
import { pages } from "../common/constants";

interface BookButtonsProps {
    page: number;
    setPage: Dispatch<SetStateAction<number>>;
}

const BookButtons = (props: BookButtonsProps) => {
  return (
    <>
        {
            pages.map((p,i) => (<button
                key={i}
                className={`border-transparent hover:border-white transition-all duration-300 px-4 py-3 rounded-full text-lg uppercase shrink-0 border ${
                  i === props.page
                    ? "bg-white/90 text-black"
                    : "bg-black/30 text-white"
                }`}
                onClick={() => props.setPage(i)}
              >
                {i < pages.length ? p.title : "Back"}
            </button>))
        }
    </>
  );
};

export default BookButtons;
