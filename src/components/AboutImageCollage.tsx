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
              src="/dog.webp"
              alt="Chris's dog companion"
              className="w-full h-full object-cover"
              fallbackSrc="/dog.jpg"
              loading="lazy"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-2xl bg-white">
            <img
              src="/chris-profile.jpeg"
              alt="Chris, Your Man with a Van"
              className="w-full h-full object-cover"
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
