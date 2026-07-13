import LazyImage from "@/components/LazyImage";

interface AboutImageCollageProps {
  className?: string;
}

const AboutImageCollage = ({ className = "" }: AboutImageCollageProps) => {
  return (
    <div className={`flex justify-center lg:justify-end ${className}`}>
      <div className="text-center">
        <div className="relative mb-6">
          <div className="w-64 h-64 sm:w-80 sm:h-80 mx-auto rounded-lg overflow-hidden shadow-2xl">
            <LazyImage
              src="/about-chris-2.webp"
              alt="Chris and his dog in branded gear"
              className="w-full h-full object-cover"
              fallbackSrc="/about-chris-2.jpg"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-2xl bg-white">
            <LazyImage
              src="/chris-profile.webp"
              alt="Chris's dog in branded cap"
              className="w-full h-full object-cover"
              fallbackSrc="/chris-profile.jpeg"
              loading="lazy"
            />
          </div>
        </div>

        <h3 className="font-display font-bold text-2xl sm:text-3xl text-white mb-2">CHRIS</h3>
        <p className="text-white/80 text-base sm:text-lg">Your Man with a Van</p>
      </div>
    </div>
  );
};

export default AboutImageCollage;
