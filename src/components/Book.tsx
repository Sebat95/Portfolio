import { useEffect, useState } from "react";
import Page from "./Page";
import { pages } from "../constants/general";
import { GroupProps } from "@react-three/fiber";


const Book = (props: GroupProps) => {
    const [page, setPage] = useState(0)
    const [delayedPage, setDelayedPage] = useState(page);
    // slow the turning down if we turn more pages at once
    useEffect(() => {
        let timeout = -1;
        const turnPage = () => setDelayedPage((prev: number) => {
            if(page === prev) return prev;
            timeout = setTimeout(() => turnPage(), Math.abs(page - prev) > 2 ? 50 : 150);
            if (page > prev) return prev + 1;
            return prev - 1;
        });
        turnPage();
        return () => {
            if(timeout != -1) {
                clearTimeout(timeout);
            }
        }
    }, [page]);


    return (
        <group {...props} rotation-y={- Math.PI / 2}>
            {
                [...pages].map((pageData, ind) => (
                    <Page key={ind} pageNum={ind}
                        page={delayedPage}
                        opened={delayedPage > ind}
                        bookClosed={delayedPage === 0 || delayedPage === pages.length - 1}
                        changePage={setPage}
                        {...pageData}/>
                ))
            }
        </group>
    )
}


export default Book;



