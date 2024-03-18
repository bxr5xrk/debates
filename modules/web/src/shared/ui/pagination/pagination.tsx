import Image from "next/image";

export interface PaginationProps {
    pagesCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export function PageNumberButton(page: number, onClick: () => void): JSX.Element {
    return <button onClick={onClick}>{page}</button>;
}

const previousPages = (currentPage: number, setCurrentPage: (page: number) => void): JSX.Element[] => {
    const prevPages: JSX.Element[] = [];
    for (let i = currentPage - 1; i >= 1; --i) {
        prevPages.unshift(
            PageNumberButton(i, () => {
                setCurrentPage(i);
            })
        );

        if (prevPages.length >= 3) {
            return prevPages;
        }
    }
    return prevPages;
};

const nextPages = (currentPage: number, pagesCount: number, setCurrentPage: (page: number) => void): JSX.Element[] => {
    const nextPages: JSX.Element[] = [];
    for (let i = currentPage + 1; i <= pagesCount; ++i) {
        nextPages.push(
            PageNumberButton(i, () => {
                setCurrentPage(i);
            })
        );

        if (nextPages.length >= 3) {
            return nextPages;
        }
    }
    return nextPages;
};

export function Pagination({ pagesCount, currentPage, setCurrentPage }: PaginationProps): JSX.Element {
    return (
        <div className="w-full flex items-center justify-center gap-3 mt-6">
            <button className="w-5 h-5 border-none" onClick={() => currentPage - 1 >= 1 && setCurrentPage(currentPage - 1)}>
                <Image className="rotate-180" src="/icons/painted-arrow.svg" width={50} height={50} alt="Previous Page" />
            </button>
            {previousPages(currentPage, setCurrentPage)}
            <p className="text-3xl">{currentPage}</p>
            {nextPages(currentPage, pagesCount, setCurrentPage)}
            <button className="w-5 h-5 border-none" onClick={() => currentPage + 1 <= pagesCount && setCurrentPage(currentPage + 1)}>
                <Image src="/icons/painted-arrow.svg" width={50} height={50} alt="Previous Page" />
            </button>
        </div>
    );
}
