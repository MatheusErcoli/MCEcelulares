type PaginationProps = {
    totalPages: number;
    currentPage: number;
    setCurrentPage: (page: number) => void;
}

export const Pagination = ({ totalPages, currentPage, setCurrentPage }: PaginationProps) => {
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    const handlePageClick = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-8 mb-8">
            {pages.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`px-4 py-2 border rounded-md transition-colors font-medium ${
                        page === currentPage
                            ? 'bg-purple-700 text-white border-purple-700 hover:bg-purple-500'
                            : 'bg-white text-black border-purple-700 border-2 hover:bg-gray-100'
                    }`}
                >
                    {page}
                </button>
            ))}
        </div>
    );
}