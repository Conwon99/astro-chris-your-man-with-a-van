import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import { useFadeIn, useStaggeredFadeIn } from "@/hooks/use-fade-in";

const FAQ = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const faqs = [
    {
      question: "How much does a small removal cost?",
      answer: "Small removal costs vary depending on the amount of items, distance, and complexity. Basic small removals typically start from £50-100, while larger house moves can range from £150-400. We provide free, no-obligation quotes for all removal work. Contact us via WhatsApp for a quick quote."
    },
    {
      question: "Do you provide same-day courier services?",
      answer: "Yes, we offer same-day courier and delivery services across Ayrshire and beyond. Courier services are available across the UK. Whether it's urgent package delivery, furniture collection, or document transport, we can respond quickly to meet your needs. Message us on WhatsApp for immediate assistance."
    },
    {
      question: "What areas do you cover?",
      answer: "We cover all of Ayrshire and beyond. Courier services are available across the UK. Contact us to confirm coverage for your specific location."
    },
    {
      question: "Are you SEPA registered for waste removal?",
      answer: "Yes, we are SEPA registered for waste removal and tip runs, ensuring all waste is disposed of legally and responsibly. We carry full public liability insurance and are fully insured for all van services work. No fly tipping - all waste goes to proper disposal facilities."
    },
    {
      question: "What types of waste do you collect?",
      answer: "We collect various types of waste including bin bags, garage clearances, shed clearances, end-of-tenancy clearances, old fence removal, and general waste. We're SEPA registered so all waste is disposed of legally. Contact us to discuss your specific waste removal needs."
    },
    {
      question: "Do you provide in-store collection and delivery?",
      answer: "Yes, we offer in-store collection and delivery services from furniture stores, online purchases, and other retailers. We can collect items from stores and deliver them safely to your door, handling everything with care. Same-day service available when possible."
    },
    {
      question: "Do you offer free quotes?",
      answer: "Yes, we provide completely free, no-obligation quotes for all our services. You can request a quote by calling 07735 852822, messaging us on WhatsApp, or using our contact form. We'll assess your needs and provide a detailed, transparent quote."
    }
  ];

  // Fade-in animations
  const { elementRef: headerRef, isVisible: headerVisible } = useFadeIn({ delay: 200 });
  const { containerRef, visibleItems } = useStaggeredFadeIn(faqs.length, 100);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  return (
    <>
      <section id="faq" className="relative py-20 px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <LazyImage
            src="/chrisback.png"
            alt="Chris, Your Man with a Van background"
            className="w-full h-full object-cover object-center"
            fallbackSrc="/chrisback.png"
            loading="eager"
          />
        </div>
        
        <div className="container mx-auto max-w-4xl relative z-10">
          <div 
            ref={headerRef}
            className={`text-center mb-16 transition-all duration-1000 ${
              headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-6">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Common questions about our van services, removals, courier services, and waste removal across Ayrshire & beyond
            </p>
          </div>

          <div 
            ref={containerRef}
            className="space-y-4"
          >
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden transition-all duration-1000 ${
                  visibleItems[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                >
                  <h3 className="font-semibold text-lg text-[hsl(var(--asphalt-grey))] pr-4">
                    {faq.question}
                  </h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-[hsl(var(--primary-blue))] flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-[hsl(var(--primary-blue))] flex-shrink-0" />
                  )}
                </button>
                
                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <p className="text-[hsl(var(--asphalt-grey))] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
};

export default FAQ;
