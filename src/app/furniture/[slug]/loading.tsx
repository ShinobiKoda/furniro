export default function Loading() {
    return (
        <div className="min-h-screen">
            <div className="bg-[#F9F1E7] py-6">
                <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-12">
                    <div className="h-4 bg-gray-300 rounded w-48 animate-pulse"></div>
                </div>
            </div>

            <div className="max-w-[1440px] mx-auto px-4 lg:px-12 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
                    <div className="bg-gray-300 rounded-lg h-[500px] animate-pulse"></div>

                    <div className="space-y-6">
                        <div className="h-10 bg-gray-300 rounded w-3/4 animate-pulse"></div>

                        <div className="space-y-2">
                            <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                            <div className="h-4 bg-gray-300 rounded w-2/3 animate-pulse"></div>
                        </div>

                        <div className="h-8 bg-gray-300 rounded w-32 animate-pulse"></div>

                        <div className="space-y-4">
                            <div className="h-10 bg-gray-300 rounded w-32 animate-pulse"></div>
                            <div className="h-12 bg-gray-300 rounded w-full animate-pulse"></div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-12 space-y-6">
                    <div className="flex gap-8">
                        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                        <div className="h-6 bg-gray-300 rounded w-24 animate-pulse"></div>
                    </div>
                    <div className="space-y-3">
                        <div className="h-6 bg-gray-300 rounded w-48 animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-full animate-pulse"></div>
                        <div className="h-4 bg-gray-300 rounded w-3/4 animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}