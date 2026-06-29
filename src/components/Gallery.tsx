import { useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import LazyImage from "@/components/LazyImage";

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const galleryImages = [
    {
      src: "/1.png",
      alt: "Before property clearance work",
      title: "Property Clearance - Before",
      location: "Ayrshire",
      description: "Initial property state"
    },
    {
      src: "/2.png",
      alt: "After property clearance and waste removal",
      title: "Property Clearance - After", 
      location: "Ayrshire",
      description: "Professional clean-up results"
    },
    {
      src: "",
      alt: "Professional small removal services in Cumnock",
      title: "Small Removals",
      location: "Cumnock"
    },
    {
      src: "", 
      alt: "Reliable courier and delivery services across Ayrshire",
      title: "Courier Services",
      location: "Ayrshire"
    },
    {
      src: "",
      alt: "SEPA registered waste removal and tip run services",
      title: "Waste Removal", 
      location: "Ayrshire"
    },
    {
      src: "",
      alt: "Professional flat-pack furniture assembly service",
      title: "Flat-Pack Assembly",
      location: "Cumnock"
    },
    {
      src: "",
      alt: "Collection from stores and delivery to your door",
      title: "In-Store Collection",
      location: "Ayrshire"
    },
    {
      src: "",
      alt: "Complete property clearance for tenants and landlords",
      title: "End-of-Tenancy Clearance",
      location: "Ayrshire"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % galleryImages.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? galleryImages.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section id="gallery" className="py-20 px-4 bg-background">
      <div className="container mx-auto max-w-7xl">
        <div className="text-left mb-16">
          <div className="flex items-center mb-6">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mr-6">
              OUR WORK GALLERY
            </h2>
            <div className="flex-1 h-px bg-white"></div>
          </div>
          <p className="text-xl text-white/90 max-w-3xl">
            Take a look at some of our recent van service projects across Cumnock and Ayrshire
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group cursor-pointer overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              onClick={() => openLightbox(index)}
            >
              <div className="relative">
                {image.src ? (
                  <LazyImage
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-64 object-cover"
                    fallbackSrc={image.src}
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-800 flex items-center justify-center">
                    <span className="text-gray-400 text-lg font-medium">No Image Available</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="font-semibold text-lg">{image.title}</h3>
                  <p className="text-sm text-white/80">{image.location}</p>
                  {image.description && (
                    <p className="text-xs text-white/70 mt-1">{image.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        {selectedImage !== null && (
          <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-primary transition-colors z-10"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:text-primary transition-colors z-10"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <div className="max-w-4xl max-h-full">
              {galleryImages[selectedImage].src ? (
                <LazyImage
                  src={galleryImages[selectedImage].src}
                  alt={galleryImages[selectedImage].alt}
                  className="max-w-full max-h-full object-contain rounded-lg"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-96 bg-gray-800 flex items-center justify-center rounded-lg">
                  <span className="text-gray-400 text-xl font-medium">No Image Available</span>
                </div>
              )}
              <div className="text-center mt-4 text-white">
                <h3 className="font-semibold text-xl">{galleryImages[selectedImage].title}</h3>
                <p className="text-white/80">{galleryImages[selectedImage].location}</p>
                {galleryImages[selectedImage].description && (
                  <p className="text-white/70 mt-2">{galleryImages[selectedImage].description}</p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Gallery;