import { useState } from "react";
import { Phone, MessageSquare, X } from "lucide-react";
import {
  trackPhoneCall,
  trackWhatsAppClick,
  trackFacebookMessengerClick,
  trackWhatsAppMessage,
  trackFacebookMessage,
} from "@/utils/analytics";

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img src="/whatsapp-svgrepo-com.svg" alt="" className={className} aria-hidden="true" />
);

const StickyContact = () => {
  const [open, setOpen] = useState(false);

  const handleWhatsApp = () => {
    trackWhatsAppClick("sticky_contact");
    trackWhatsAppMessage("sticky_contact");
    const message = "Hi Chris! I'd like to request a quote for your van services.";
    window.open(`https://wa.me/447735852822?text=${encodeURIComponent(message)}`, "_blank");
    setOpen(false);
  };

  const handleMessenger = () => {
    trackFacebookMessengerClick("sticky_contact");
    trackFacebookMessage("sticky_contact");
    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
    setOpen(false);
  };

  const handlePhone = () => {
    trackPhoneCall("sticky_contact");
    window.location.href = "tel:+447735852822";
    setOpen(false);
  };

  return (
    <div className="fixed bottom-5 right-5 z-[60] flex flex-col items-end gap-3 pointer-events-none">
      {open && (
        <div className="flex flex-col items-end gap-2 pointer-events-auto">
          <button
            type="button"
            onClick={handleWhatsApp}
            className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg transition-colors"
            aria-label="Contact Chris on WhatsApp"
          >
            <WhatsAppIcon className="w-5 h-5" />
            <span className="text-sm">WhatsApp</span>
          </button>
          <button
            type="button"
            onClick={handleMessenger}
            className="flex items-center gap-3 bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg transition-colors"
            aria-label="Contact Chris on Messenger"
          >
            <img src="/Facebook_Messenger_logo_2020.svg" alt="" className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">Messenger</span>
          </button>
          <button
            type="button"
            onClick={handlePhone}
            className="flex items-center gap-3 bg-white hover:bg-gray-100 text-[hsl(var(--asphalt-grey))] font-semibold pl-4 pr-5 py-3 rounded-full shadow-lg transition-colors"
            aria-label="Call Chris"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm">Call</span>
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="pointer-events-auto w-14 h-14 rounded-full bg-[hsl(var(--primary-orange))] hover:bg-[hsl(var(--dark-orange))] text-white shadow-xl flex items-center justify-center transition-colors"
        aria-label={open ? "Close contact options" : "Open contact options"}
        aria-expanded={open}
      >
        {open ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default StickyContact;
