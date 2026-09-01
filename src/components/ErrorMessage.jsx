export default function ErrorMessage({ message }) {
    if (!message) return null;
    return (
        <div role="alert" className="bg-red-100 text-red-800 border border-red-300 rounded p-3 my-3">
            {message}
        </div>
    );
}
