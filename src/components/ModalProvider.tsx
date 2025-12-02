const ModalProvider = ({ isOpen, title, isLoading, mainAction, mainActionLabel, children, onClose }: {
    isOpen: boolean;
    title: string;
    isLoading?: boolean;
    mainAction?(): void;
    mainActionLabel?: string;
    children?: React.ReactNode;
    onClose(): void;
}) => {

    if (!isOpen) return null;

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            onClick={handleBackdropClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <div className="w-full max-w-md rounded-xl bg-white dark:bg-neutral-900 shadow-xl border border-neutral-200 dark:border-neutral-700 p-5 md:p-6 animate-fadeIn">
                {(title) && (
                    <div className="mb-4">
                        {title && (
                            <h2 className="text-3xl text-center font-semibold text-neutral-900 dark:text-neutral-50">
                                {title}
                            </h2>
                        )}
                    </div>
                )}

                {children && <div className="mb-4">
                    <fieldset disabled={isLoading} className={isLoading ? "opacity-50 cursor-not-allowed" : ""}>
                        {children}
                    </fieldset>
                </div>}

                <div className="mt-2 flex justify-end gap-2">
                    {mainAction &&
                    <button
                        onClick={mainAction ?? onClose}
                        className="mx-3 py-2 px-4 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md bg-gradient-to-r from-blue-600 to-amber-400 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:from-pink-500 hover:to-blue-400 active:scale-95">
                        {mainActionLabel}
                    </button>}
                    
                    <button
                        onClick={onClose}
                        className="mx-3 py-2 px-4 text-sm sm:text-base font-semibold text-white rounded-lg shadow-md bg-gray-700 transition-all duration-300 hover:scale-[1.05] hover:shadow-lg hover:bg-gray-600 active:scale-95">
                        Đóng
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalProvider;