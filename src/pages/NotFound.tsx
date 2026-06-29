import { useEffect } from "react";

const NotFound = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
    console.error(
      "404 Error: User attempted to access non-existent route:",
        window.location.pathname
    );
    }
  }, []);

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center max-w-md mx-auto px-4">
          <h1 className="text-6xl font-bold text-[hsl(var(--primary-orange))] mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-[hsl(var(--asphalt-grey))] mb-4">Page Not Found</h2>
          <p className="text-lg text-[hsl(var(--asphalt-grey))] mb-8 leading-relaxed">
            Sorry, the page you're looking for doesn't exist. It might have been moved, deleted, or you entered the wrong URL.
          </p>
          
          <div className="space-y-4">
            <a 
              href="/" 
              className="inline-block bg-[hsl(var(--primary-orange))] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
            >
              Return to Homepage
            </a>
            
            <div className="text-sm text-[hsl(var(--asphalt-grey))]">
              <p className="mb-2">Or try these popular sections:</p>
              <div className="flex flex-wrap justify-center gap-4">
                <a href="/#services" className="text-[hsl(var(--primary-orange))] hover:underline">Our Services</a>
                <a href="/#about" className="text-[hsl(var(--primary-orange))] hover:underline">About Chris</a>
                <a href="/#contact-form" className="text-[hsl(var(--primary-orange))] hover:underline">Get Quote</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
