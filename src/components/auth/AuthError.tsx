export const AuthError = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Authentication Error</h2>
        <p className="text-gray-600 mb-4">There was a problem initializing the authentication system.</p>
        <button
          onClick={() => window.location.reload()}
          className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
};