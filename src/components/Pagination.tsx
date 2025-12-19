export const Pagination = ({ page, totalPages, onPageChange, limit, onLimitChange, totalItems }: {
    page: number; totalPages: number; onPageChange: (page: number) => void; limit: number; onLimitChange: (limit: number) => void;totalItems: number
}) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-between items-center mt-6">
            <p className="text-sm text-gray-600">
                Trang <span className="font-semibold">{page + 1}</span> / {totalPages} —
                Tổng <span className="font-semibold">{totalItems}</span> bản ghi
            </p>

            <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Hiển thị</span>
                <select
                    value={limit}
                    onChange={(e) => {
                        onPageChange(0);
                        onLimitChange(Number(e.target.value));
                    }}
                    className="border rounded-md px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                    {[5, 10, 20, 50].map(size => (
                        <option key={size} value={size}>
                            {size} / trang
                        </option>
                    ))}
                </select>
            </div>
            <div className="flex gap-2">
                <button
                    disabled={page === 0}
                    onClick={() => onPageChange(page - 1)}
                    className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    Trước
                </button>

                {[...Array(totalPages)].map((_, i) => (
                    <button
                        key={i}
                        onClick={() => onPageChange(i)}
                        className={`px-3 py-1.5 rounded-md text-sm ${i === page
                            ? "bg-blue-600 text-white"
                            : "bg-gray-100 hover:bg-gray-200"
                            }`}
                    >
                        {i + 1}
                    </button>
                ))}

                <button
                    disabled={page === totalPages - 1}
                    onClick={() => onPageChange(page + 1)}
                    className="px-3 py-1.5 rounded-md bg-gray-200 text-gray-700 disabled:opacity-50"
                >
                    Sau
                </button>
            </div>

            <div>
                <p className="text-sm text-gray-600">
                    Hiển thị <span className="font-semibold">{limit}</span> / {totalItems}
                </p>
            </div>
        </div>
    );
};
