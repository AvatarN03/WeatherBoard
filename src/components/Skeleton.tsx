

export const Skeleton = () => {
    return (
        <div className="flex flex-col md:flex-row gap-4 items-start justify-start p-4">
            <div className="w-full md:w-1/4 space-y-4">
                {/* Card 1 */}
                <div className="w-full h-64 rounded-xl skeleton" />
                {/* Card 2 */}
                <div className="w-full h-68 rounded-xl skeleton" />
            </div>
            <div className="w-full md:w-3/4 space-y-4">
                {/* Card 1 */}
                <div className="w-full h-76 rounded-xl skeleton" />
                {/* Card 2 */}
                <div className="w-full h-72 rounded-xl skeleton" />
            </div>
        </div>
    )
}
