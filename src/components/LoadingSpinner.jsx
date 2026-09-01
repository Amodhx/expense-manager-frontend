export default function LoadingSpinner() {
    return (
        <div role="status" aria-live="polite" className="flex justify-center py-8">
            <span className="animate-spin h-8 w-8 border-4 border-blue-500 border-t-transparent rounded-full" />
            <span className="sr-only">Loading…</span>
        </div>
    );
}
