import { Dispatch, SetStateAction, useEffect, useState } from "react";
import Page from "./Page";
import { pages } from "../constants/general";
import { GroupProps } from "@react-three/fiber";

interface BookProps extends GroupProps {
    page: number;
    changePage: Dispatch<SetStateAction<number>>;
}

const Book = (props: BookProps) => {
    const [delayedPage, setDelayedPage] = useState(props.page);
    // slow the turning down if we turn more pages at once
    useEffect(() => {
        let timeout = -1;
        const turnPage = () => setDelayedPage((prev: number) => {
            if(props.page === prev) return prev;
            timeout = setTimeout(() => turnPage(), Math.abs(props.page - prev) > 2 ? 50 : 150);
            if (props.page > prev) return prev + 1;
            return prev - 1;
        });
        turnPage();
        return () => {
            if(timeout != -1) {
                clearTimeout(timeout);
            }
        }
    }, [props.page]);


    return (
        <group {...props} rotation-y={- Math.PI / 2}>
            {
                pages.map((pageData, ind) => (
                    <Page key={ind} pageNum={ind}
                        page={delayedPage}
                        opened={delayedPage > ind}
                        bookClosed={delayedPage === 0 || delayedPage === pages.length}
                        changePage={props.changePage}
                        {...pageData}/>
                ))
            }
        </group>
    )
};

export default Book;



