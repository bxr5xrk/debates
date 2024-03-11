import Image from "next/image";

export interface PaginationProps {
    pagesCount: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export function Pagination({ pagesCount, currentPage, setCurrentPage }: PaginationProps): JSX.Element {
    return (
        <div className="w-full flex items-center justify-center gap-3">
            <button className="w-5 h-5 border-none" onClick={() => currentPage - 1 >= 1 && setCurrentPage(currentPage - 1)}>
                <Image className="rotate-180" src="/icons/painted-arrow.svg" width={50} height={50} alt="Previous Page" />
            </button>
            <p className="text-3xl">{currentPage}</p>
            <button className="w-5 h-5 border-none" onClick={() => currentPage + 1 <= pagesCount && setCurrentPage(currentPage + 1)}>
                <Image src="/icons/painted-arrow.svg" width={50} height={50} alt="Previous Page" />
            </button>
        </div>
    );
}
