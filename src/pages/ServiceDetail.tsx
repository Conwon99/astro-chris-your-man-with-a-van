import { useEffect } from "react";
import { ArrowRight, MessageSquare, Check, Clock, MapPin, Phone, ShieldCheck, Truck, Package, Trash2, ShoppingCart, Home, Wrench } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { trackWhatsAppClick, trackFacebookMessengerClick, trackNavigation, trackWhatsAppMessage, trackFacebookMessage } from "@/utils/analytics";
import { LOW_RANKING_LOCATIONS } from "@/data/locationServices";

// WhatsApp Logo Component
const WhatsAppIcon = ({ className }: { className?: string }) => (
  <img 
    src="/whatsapp-svgrepo-com.svg" 
    alt="WhatsApp" 
    className={className}
  />
);

interface ServiceDetailProps {
  slug?: string;
}
  
const ServiceDetail = ({ slug }: ServiceDetailProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Service data with extended content
  const serviceData: Record<string, {
    title: string;
    keywords: string[];
    description: string;
    metaDescription: string;
    features: string[];
    details: string;
    processSteps: { number: string; title: string; description: string }[];
    commonSituations: { title: string; description: string }[];
    servicePromise: { title: string; description: string }[];
    faqs: { question: string; answer: string }[];
  }> = {
    "small-removals": {
      title: "Small Removals & House Moves",
      keywords: ["small removals ayrshire", "house removals ayrshire", "furniture removals ayrshire", "house moves ayrshire", "office relocation ayrshire", "student moves ayrshire"],
      description: "Professional small removal and house move services across Ayrshire. Whether you're moving house, relocating your office, or transporting furniture, I provide a friendly, reliable service with care and attention to detail.",
      metaDescription: "Professional small removals and house moves in Ayrshire. House removals, furniture removals, office relocations, student moves. SEPA registered, free quotes via WhatsApp.",
      features: [
        "House moves across Ayrshire",
        "Office relocations",
        "Furniture transport",
        "Student moves",
        "Single room moves",
        "Personal service with care",
        "Competitive pricing",
        "Free quotes via WhatsApp"
      ],
      details: "Moving house or office doesn't have to be stressful. I handle small to medium removals with care and attention to detail. All items are wrapped and protected during transport. Whether it's a single room or a full property, I'll work with you to make the move as smooth as possible.",
      processSteps: [
        {
          number: "1",
          title: "Initial Contact",
          description: "Reach out via WhatsApp, Facebook Messenger, or phone. I'll ask about your move: location, dates, property size, and any special items that need careful handling."
        },
        {
          number: "2",
          title: "Honest Quote & Planning",
          description: "I'll provide a transparent quote with no hidden fees. We'll discuss timing, access requirements, and I'll give you an accurate timeframe based on my schedule."
        },
        {
          number: "3",
          title: "Pre-Move Confirmation",
          description: "I'll confirm the day before your move and arrive on time as promised. I bring all necessary equipment including blankets, straps, and protective materials."
        },
        {
          number: "4",
          title: "Careful Moving Service",
          description: "Items are carefully wrapped, loaded, and secured. I'll handle everything with care, working efficiently to minimize your stress. On arrival, I'll help place items in their new locations."
        }
      ],
      commonSituations: [
        {
          title: "First-Time Home Buyers",
          description: "Moving into your first property? I understand the importance of this milestone. I'll help you move everything safely, from bedroom furniture to kitchen items, ensuring nothing gets damaged on this special day."
        },
        {
          title: "Downsizing Moves",
          description: "Moving to a smaller property? I can help you decide what to take and arrange disposal of items that won't fit. I'll ensure fragile items are well-protected during the move."
        },
        {
          title: "Student Moves",
          description: "Moving in or out of student accommodation? I provide affordable, reliable service perfect for students. I understand timing is often tight around term dates and can work around your schedule."
        },
        {
          title: "Office Relocations",
          description: "Moving your business? I'll work around your operating hours to minimize disruption. Equipment, furniture, and files are handled professionally and moved efficiently to get you back to business quickly."
        },
        {
          title: "Single Room Moves",
          description: "Just moving one room's worth of furniture? No job is too small. I'll collect your items, transport them safely, and help you set up in your new space."
        },
        {
          title: "Fragile Item Transport",
          description: "Got antiques, artwork, or delicate furniture? I take extra care with valuable and fragile items. Everything is properly wrapped and secured to prevent any damage during transport."
        }
      ],
      servicePromise: [
        {
          title: "Transparency First",
          description: "No surprises, no hidden fees. I provide upfront pricing and honest timeframes. If there are any access issues or additional requirements, I'll discuss them with you before starting."
        },
        {
          title: "Your Schedule Matters",
          description: "I know moving disrupts your life. That's why I provide accurate arrival times and work efficiently to minimize disruption. If circumstances change, I'll keep you informed."
        },
        {
          title: "Protection & Care",
          description: "All items are wrapped and protected. I use professional moving blankets, straps, and padding. I treat your belongings as if they were my own, ensuring everything arrives safely."
        },
        {
          title: "Flexible Service",
          description: "Moving plans can change. I'll work with you on timing and can accommodate last-minute adjustments when possible. I'll explain what's included and what options are available."
        }
      ],
      faqs: [
        {
          question: "How far in advance should I book?",
          answer: "I recommend booking at least a week in advance, especially during busy periods like summer moves or end of tenancy dates. However, I can often accommodate shorter notice requests - just contact me to check availability."
        },
        {
          question: "Do you provide packing materials?",
          answer: "I bring protective blankets, straps, and padding for furniture. For boxes and packing materials, you may need to provide these yourself, though I can advise on what you'll need based on your move."
        },
        {
          question: "Will you help move items into the new property?",
          answer: "Yes! I don't just drop items at the door - I'll help you place furniture and boxes in the rooms where you want them. Just let me know your preferences and I'll accommodate."
        },
        {
          question: "What happens if something gets damaged?",
          answer: "I take great care with all items, but accidents can happen. I'm fully insured and will discuss any concerns immediately. I've successfully moved hundreds of items without issues."
        }
      ]
    },
    "courier": {
      title: "Courier Services & Delivery",
      keywords: ["courier services ayrshire", "same day courier ayrshire", "local courier ayrshire", "delivery service ayrshire", "single item delivery ayrshire", "van hire with driver ayrshire"],
      description: "Fast, reliable courier and delivery services across Ayrshire and throughout the UK. Same-day service available for urgent deliveries. Professional, secure transport for packages, documents, and larger items.",
      metaDescription: "Professional courier services in Ayrshire. Same-day courier, local delivery, single item delivery, van hire with driver. UK-wide courier services. Free quotes via WhatsApp.",
      features: [
        "Same-day delivery available",
        "Package collection and delivery",
        "Secure transport",
        "UK-wide courier services",
        "Document delivery",
        "Urgent delivery service",
        "Friendly, professional service",
        "Free quotes"
      ],
      details: "Need something delivered quickly? I offer fast, reliable courier services across Ayrshire and throughout the UK. Whether it's documents, parcels, or larger items, your package is handled with care and delivered on time. Same-day service is available for urgent deliveries.",
      processSteps: [
        {
          number: "1",
          title: "Quick Contact",
          description: "Send me a WhatsApp or call with your pickup and delivery details. I'll ask about the item size, addresses, and how urgently you need it delivered."
        },
        {
          number: "2",
          title: "Instant Quote & ETA",
          description: "I'll provide an upfront price and realistic delivery timeframe. For same-day service, I'll check my current location and give you an accurate arrival window."
        },
        {
          number: "3",
          title: "Collection Confirmation",
          description: "I'll confirm when I'm heading to collect and update you once I have the item. For valuable items, I'll confirm secure packaging requirements."
        },
        {
          number: "4",
          title: "Safe Delivery",
          description: "Items are transported securely and I'll contact you when I'm close to delivery. I'll ensure the item reaches the right person or location safely."
        }
      ],
      commonSituations: [
        {
          title: "Urgent Document Delivery",
          description: "Need important documents delivered today? I provide same-day courier service across Ayrshire. Whether it's contracts, applications, or personal documents, I'll get them where they need to be quickly and securely."
        },
        {
          title: "Online Purchase Collection",
          description: "Bought something online but can't collect from the depot? I'll collect your parcel and deliver it to your door, saving you the trip and hassle."
        },
        {
          title: "Business-to-Business Deliveries",
          description: "Need to get supplies, equipment, or products between businesses? I provide reliable courier service for businesses across Ayrshire, helping you maintain efficient operations."
        },
        {
          title: "Large Item Delivery",
          description: "Furniture, appliances, or equipment too big for standard delivery? I can collect and deliver larger items that won't fit in a car, handling them with care."
        },
        {
          title: "UK-Wide Courier Services",
          description: "Need something delivered beyond Ayrshire? I offer courier services across the UK. Contact me with your destination and I'll provide a quote and timeframe."
        },
        {
          title: "Gift Delivery",
          description: "Sending a gift but can't deliver it yourself? I'll collect your gift and deliver it personally, ensuring it arrives safely and on time."
        }
      ],
      servicePromise: [
        {
          title: "Fast Response Times",
          description: "I know urgent deliveries mean timely service. I'll give you realistic ETAs and keep you updated if anything changes. Same-day service available when you need it most."
        },
        {
          title: "Secure Handling",
          description: "All items are handled with care and secured during transport. For valuable or fragile items, I'll take extra precautions to ensure safe delivery."
        },
        {
          title: "Transparent Pricing",
          description: "No hidden fees or surprise charges. You'll know the cost upfront before I collect your item. Pricing is based on distance and item size, always fair and transparent."
        },
        {
          title: "Flexible Service",
          description: "Need delivery at a specific time? I'll work with you on timing. I can also arrange for delivery confirmation and proof of delivery when needed."
        }
      ],
      faqs: [
        {
          question: "How quickly can you deliver?",
          answer: "For same-day service, I can often collect and deliver within hours, depending on my current location and your pickup/delivery addresses. Contact me for an immediate availability check and accurate ETA."
        },
        {
          question: "Do you deliver outside Ayrshire?",
          answer: "Yes! While I'm based in Ayrshire, I provide courier services throughout the UK. Contact me with your destination for a quote and delivery timeframe."
        },
        {
          question: "What size items can you deliver?",
          answer: "I can deliver everything from documents to large furniture. My van can handle most items. If you're unsure, just ask - I'll let you know if it's something I can transport."
        },
        {
          question: "Do you provide proof of delivery?",
          answer: "Yes, I can provide delivery confirmation. Just let me know if you need proof of delivery and I'll arrange this for you."
        }
      ]
    },
    "waste-removal": {
      title: "Tip Runs & Waste Removal",
      keywords: ["waste removal ayrshire", "tip runs ayrshire", "rubbish removal ayrshire", "sepa registered waste removal ayrshire", "garage clearance ayrshire", "shed clearance ayrshire", "garden waste removal ayrshire"],
      description: "SEPA registered waste removal and tip run services across Ayrshire. Professional disposal of household waste, garden waste, garage and shed clearances. All waste disposed of legally and responsibly.",
      metaDescription: "SEPA registered waste removal and tip runs in Ayrshire. Garage clearance, shed clearance, garden waste removal, rubbish removal. Legal, responsible disposal. Free quotes via WhatsApp.",
      features: [
        "SEPA registered",
        "Bin bag collection",
        "Garage clearances",
        "Shed clearances",
        "Garden waste removal",
        "End-of-tenancy clearance",
        "Old furniture removal",
        "Eco-friendly disposal"
      ],
      details: "As a SEPA registered waste carrier, I provide professional waste removal services across Ayrshire. From regular bin bag collections to full garage or shed clearances, I'll dispose of your unwanted items responsibly. All waste is taken to licensed disposal facilities, ensuring eco-friendly and legal disposal.",
      processSteps: [
        {
          number: "1",
          title: "Contact & Assessment",
          description: "Get in touch via WhatsApp or phone with details of what you need removed. I'll ask about the type and volume of waste, and any access considerations."
        },
        {
          number: "2",
          title: "Quote & Scheduling",
          description: "I'll provide a clear quote based on the waste type and volume. As a SEPA registered carrier, I can legally dispose of most waste types. We'll arrange a convenient collection time."
        },
        {
          number: "3",
          "title": "Collection",
          description: "I'll arrive at the scheduled time and load all waste items. I bring everything needed and work efficiently to minimize disruption. All waste is properly secured for transport."
        },
        {
          number: "4",
          title: "Legal Disposal",
          description: "Waste is taken to licensed disposal facilities. I'm SEPA registered, so you can be confident everything is disposed of legally and responsibly. No illegal fly-tipping - just professional, legal disposal."
        }
      ],
      commonSituations: [
        {
          title: "Garage Clearance",
          description: "Finally clearing out that garage? I'll remove old tools, boxes, furniture, and any items you no longer need. I can handle most items and dispose of them properly at licensed facilities."
        },
        {
          title: "Shed Clearance",
          description: "Overgrown shed full of old equipment? I'll clear it all out, removing garden tools, furniture, and accumulated items. Everything will be disposed of legally and responsibly."
        },
        {
          title: "Garden Waste Removal",
          description: "Large garden clearances or seasonal waste? I'll remove branches, cuttings, old plants, and garden debris. All garden waste is taken to appropriate recycling facilities."
        },
        {
          title: "Old Furniture Disposal",
          description: "Replacing furniture and need the old items removed? I'll collect and dispose of old sofas, beds, wardrobes, and other furniture. As SEPA registered, I can legally dispose of these items."
        },
        {
          title: "Renovation Waste",
          description: "Removing old fixtures, flooring, or building materials? I can help with renovation waste removal. I'll advise what can be recycled and ensure everything goes to the right disposal facility."
        },
        {
          title: "Regular Bin Bag Collections",
          description: "Need help with regular waste collection? I can arrange ongoing service for excess household waste that won't fit in your regular bins. Legal, convenient, and reliable."
        }
      ],
      servicePromise: [
        {
          title: "Legal Compliance",
          description: "As a SEPA registered waste carrier, I ensure all waste is disposed of legally. No fly-tipping, no shortcuts - just professional, legal waste disposal you can trust."
        },
        {
          title: "Environmentally Responsible",
          description: "I take waste to licensed facilities that handle recycling and disposal properly. Where possible, items are recycled rather than sent to landfill. Eco-friendly disposal is a priority."
        },
        {
          title: "Transparent Pricing",
          description: "You'll know the cost upfront, based on waste type and volume. No hidden fees. I'll explain what goes where and why, so you understand the process."
        },
        {
          title: "Efficient Service",
          description: "I work quickly and efficiently to remove waste with minimal disruption. I'll arrive on time and get everything loaded and disposed of professionally."
        }
      ],
      faqs: [
        {
          question: "What waste can you legally remove?",
          answer: "As a SEPA registered waste carrier, I can handle most household waste, garden waste, furniture, and general rubbish. For hazardous waste or specific items, I'll advise on the best approach. Contact me with details of what you need removed."
        },
        {
          question: "Do you recycle items?",
          answer: "Yes, where possible I ensure items go to appropriate recycling facilities. I separate waste types and dispose of them at the correct licensed facilities for recycling or responsible disposal."
        },
        {
          question: "How much does waste removal cost?",
          answer: "Pricing depends on the type and volume of waste. I provide upfront quotes before starting any work. Contact me with details of what you need removed for an accurate quote."
        },
        {
          question: "Do you provide proof of disposal?",
          answer: "As a SEPA registered carrier, all waste disposal is properly documented. I can provide disposal receipts when needed, particularly useful for landlords or businesses requiring proof."
        }
      ]
    },
    "end-of-tenancy": {
      title: "End of Tenancy Clearance",
      keywords: ["end of tenancy clearance ayrshire", "rubbish collection ayrshire", "property clearance ayrshire"],
      description: "Complete property clearance services for tenants and landlords across Ayrshire. Fast, thorough service to get properties ready for inspection and handover. SEPA registered waste disposal included.",
      metaDescription: "End of tenancy clearance services in Ayrshire. Property clearance, rubbish collection for tenants and landlords. Fast turnaround, SEPA registered. Free quotes via WhatsApp.",
      features: [
        "Full property clearance",
        "Furniture removal",
        "Deep clean preparation",
        "Fast turnaround",
        "Tenant and landlord friendly",
        "Property ready for handover",
        "SEPA registered disposal",
        "Competitive pricing"
      ],
      details: "Moving out and need to clear the property? I provide comprehensive end-of-tenancy clearance services across Ayrshire. From removing old furniture to clearing out all belongings, I'll ensure the property is ready for inspection. Fast, reliable service that helps tenants and landlords alike.",
      processSteps: [
        {
          number: "1",
          title: "Property Assessment",
          description: "Contact me with details of the property and what needs clearing. I'll ask about furniture, remaining items, and any specific requirements from your landlord or letting agent."
        },
        {
          number: "2",
          title: "Quote & Timing",
          description: "I'll provide a clear quote for the clearance work. I understand timing is often tight around move-out dates and can often provide same-day or next-day service."
        },
        {
          number: "3",
          title: "Efficient Clearance",
          description: "I'll arrive and efficiently remove all items, furniture, and rubbish. Everything is loaded and disposed of legally. I work quickly to minimize disruption while being thorough."
        },
        {
          number: "4",
          title: "Property Ready",
          description: "Once cleared, the property is ready for cleaning and inspection. I can also advise on any disposal receipts you might need for your landlord or deposit return."
        }
      ],
      commonSituations: [
        {
          title: "Tenant Move-Out",
          description: "Moving out and need everything cleared? I'll remove all furniture, belongings, and rubbish, ensuring the property is empty and ready for your final inspection. Fast service to help secure your deposit return."
        },
        {
          title: "Landlord Preparation",
          description: "Preparing a property for new tenants? I'll clear any remaining items and rubbish left by previous tenants, ensuring the property is ready for cleaning and new occupancy."
        },
        {
          title: "Holiday Let Clearance",
          description: "Clearing a holiday let property? I understand the need for quick turnaround between guests. I'll efficiently remove all items and ensure the property is ready for the next booking."
        },
        {
          title: "Furnished Property Clearance",
          description: "Removing furniture from a furnished rental? I'll safely remove and dispose of all furniture and items, handling large items like beds and wardrobes with care."
        },
        {
          title: "Urgent Same-Day Clearance",
          description: "Need the property cleared today? I can often provide same-day or next-day service, especially important when move-out dates are tight or inspections are scheduled."
        },
        {
          title: "Partial Clearance",
          description: "Only need some items removed? I can handle partial clearances too, removing specific furniture or items while leaving others. I'll work around your requirements."
        }
      ],
      servicePromise: [
        {
          title: "Fast Turnaround",
          description: "I understand move-out dates are often inflexible. I'll work quickly and efficiently to get properties cleared on time, helping ensure smooth handovers and deposit returns."
        },
        {
          title: "Legal Disposal",
          description: "As a SEPA registered carrier, all waste is disposed of legally. I can provide disposal receipts if needed for your landlord or letting agent. No illegal dumping - just professional service."
        },
        {
          title: "Tenant & Landlord Friendly",
          description: "I serve both tenants needing to clear properties and landlords preparing for new occupancy. I understand the requirements on both sides and work to meet everyone's needs."
        },
        {
          title: "Thorough Service",
          description: "I ensure properties are completely cleared - no items left behind. From large furniture to small belongings, everything is removed so the property is ready for inspection or new tenants."
        }
      ],
      faqs: [
        {
          question: "How quickly can you clear a property?",
          answer: "I can often provide same-day or next-day service, depending on property size and my current schedule. Contact me with your move-out date and I'll work to accommodate your timeline."
        },
        {
          question: "Do you provide disposal receipts?",
          answer: "Yes, as a SEPA registered carrier, I can provide disposal receipts. These can be useful for landlords, letting agents, or deposit return purposes. Just let me know if you need documentation."
        },
        {
          question: "What if items are left behind by tenants?",
          answer: "I can clear properties of items left behind by previous tenants. I'll remove furniture, belongings, and rubbish, ensuring the property is ready for new occupancy."
        },
        {
          question: "Can you work around inspection dates?",
          answer: "Yes, I understand timing is important around property inspections. I'll work with your schedule and can often provide service on specific dates to ensure properties are cleared in time."
        }
      ]
    },
    "flat-pack-assembly": {
      title: "Flat Pack Assembly",
      keywords: ["flat pack assembly ayrshire", "ikea assembly ayrshire", "furniture assembly ayrshire"],
      description: "Professional flat pack furniture assembly service across Ayrshire. IKEA and all major brands. Save time and frustration - I'll assemble your furniture correctly the first time with all necessary tools provided.",
      metaDescription: "Professional flat pack assembly in Ayrshire. IKEA assembly, furniture assembly for all major brands. Tools provided, expert service. Free quotes via WhatsApp.",
      features: [
        "IKEA furniture assembly",
        "All major brands",
        "Tools provided",
        "Expert assembly",
        "Same-day service available",
        "Quality guarantee",
        "Fast, reliable service",
        "Competitive pricing"
      ],
      details: "Struggling with flat pack furniture instructions? I've assembled hundreds of items from IKEA and other major brands across Ayrshire. I bring all necessary tools and have the experience to assemble your furniture quickly and correctly. Same-day service available, so you can enjoy your new furniture without the frustration.",
      processSteps: [
        {
          number: "1",
          title: "Contact & Details",
          description: "Let me know what furniture needs assembling - brand, item type, and quantity. I'll ask about access to your property and any specific requirements or preferences."
        },
        {
          number: "2",
          title: "Quote & Scheduling",
          description: "I'll provide a clear quote based on the assembly complexity and time required. I can often provide same-day service, depending on my schedule and your location."
        },
        {
          number: "3",
          title: "Arrival & Setup",
          description: "I'll arrive with all necessary tools and set up in the space where you want the furniture. I'll protect floors and surfaces while working, ensuring no damage during assembly."
        },
        {
          number: "4",
          title: "Quality Assembly",
          description: "I'll assemble your furniture correctly the first time, following instructions precisely. Once complete, I'll check everything is secure and level before finishing. You'll have furniture ready to use immediately."
        }
      ],
      commonSituations: [
        {
          title: "IKEA Furniture Assembly",
          description: "Bought IKEA furniture but dreading the assembly? I've assembled hundreds of IKEA items and know the common pitfalls. I'll have your furniture built correctly and securely, saving you hours of frustration."
        },
        {
          title: "Wardrobe & Storage Assembly",
          description: "Large wardrobes or storage units can be tricky. I'll assemble them properly, ensuring doors align, drawers work smoothly, and everything is level. I'll position them where you want them too."
        },
        {
          title: "Bed Frame Assembly",
          description: "Bed frames need to be assembled securely for safety. I'll ensure all joints are tight, legs are level, and the frame is stable. Your bed will be ready to sleep on the same day."
        },
        {
          title: "Desk & Office Furniture",
          description: "Office furniture needs to be sturdy and level. I'll assemble desks, shelving, and office storage correctly, ensuring everything is secure and functional for work use."
        },
        {
          title: "Multiple Items",
          description: "Bought several items that need assembling? I can assemble multiple pieces in one visit, saving you time and effort. I'll work efficiently through each item, ensuring quality throughout."
        },
        {
          title: "Same-Day Assembly",
          description: "Want your furniture assembled today? I can often provide same-day service. Contact me in the morning and I can often have your furniture assembled by the end of the day."
        }
      ],
      servicePromise: [
        {
          title: "Quality Assembly",
          description: "I don't rush assembly - I take the time to do it correctly the first time. All joints are tight, everything is level, and I check each step to ensure quality assembly you can rely on."
        },
        {
          title: "Tools Provided",
          description: "I bring all necessary tools, including screwdrivers, Allen keys, and any specialized tools needed. You don't need to provide anything - just have the furniture and space ready."
        },
        {
          title: "Clean & Tidy",
          description: "I'll clean up all packaging and waste after assembly. Your furniture will be assembled and ready to use, with no mess left behind. I'll dispose of packaging responsibly."
        },
        {
          title: "Positioning Help",
          description: "Once assembled, I can help position furniture where you want it. I understand furniture placement can be tricky, especially with larger items, and I'm happy to help get it in the right spot."
        }
      ],
      faqs: [
        {
          question: "How long does assembly take?",
          answer: "Assembly time varies by item - a simple table might take 30 minutes, while a large wardrobe could take a few hours. I'll give you an estimate when you provide details of what needs assembling."
        },
        {
          question: "Do I need to be present during assembly?",
          answer: "I prefer you to be present to confirm positioning and preferences, but I can work independently if needed. For larger items, your input on placement is helpful."
        },
        {
          question: "What if something is missing or damaged?",
          answer: "I'll check all parts before starting. If anything is missing or damaged, I'll let you know immediately so you can contact the retailer. I won't start assembly without all necessary parts."
        },
        {
          question: "Can you assemble furniture on any day?",
          answer: "I can often provide same-day or next-day service, depending on my schedule. Contact me with your preferred date and I'll check availability and schedule accordingly."
        }
      ]
    },
    "collection-and-delivery": {
      title: "In-Store Collection & Delivery",
      keywords: ["in store collection and delivery ayrshire", "store collection ayrshire", "furniture delivery ayrshire", "sofa delivery ayrshire", "appliance delivery ayrshire", "collection and delivery service ayrshire", "light haulage ayrshire"],
      description: "Collection from furniture stores, online purchases, and delivery straight to your door across Ayrshire. White glove service available with placement assistance. No need to worry about transport - I'll handle it for you.",
      metaDescription: "In-store collection and delivery in Ayrshire. Furniture delivery, sofa delivery, appliance delivery, store collection. White glove service available. Free quotes via WhatsApp.",
      features: [
        "Collection from furniture stores",
        "Online purchase delivery",
        "Same-day service available",
        "Careful handling guaranteed",
        "White glove service",
        "Delivery and placement",
        "All items covered",
        "Professional service"
      ],
      details: "Bought furniture but can't collect it? I'll collect from stores or warehouses across Ayrshire and deliver to your home. All items are handled with care, and I can even help with placement in your home. Save time and avoid the hassle - let me collect and deliver your purchases safely.",
      processSteps: [
        {
          number: "1",
          title: "Collection Details",
          description: "Contact me with the collection address, delivery address, and item details. I'll ask about item size and weight, access requirements, and any special handling needs."
        },
        {
          number: "2",
          title: "Quote & Scheduling",
          description: "I'll provide a clear quote for collection and delivery. I can often arrange same-day service depending on locations and my schedule. We'll arrange a convenient delivery time."
        },
        {
          number: "3",
          title: "Safe Collection",
          description: "I'll collect the item from the store or warehouse, checking it's the correct item and properly packaged. I'll handle loading carefully to prevent any damage during transport."
        },
        {
          number: "4",
          title: "Careful Delivery",
          description: "Items are transported securely and I'll deliver to your door. I can help move items into your home and position them where you want. White glove service means careful handling throughout."
        }
      ],
      commonSituations: [
        {
          title: "Furniture Store Collection",
          description: "Bought furniture from a store but can't collect? I'll collect from the furniture store and deliver to your home. Whether it's a sofa, dining set, or bedroom furniture, I'll handle it with care."
        },
        {
          title: "Online Purchase Delivery",
          description: "Ordered furniture online and it's being delivered to a depot? I'll collect from the delivery point and bring it to your home. Save yourself the trip and let me handle the delivery."
        },
        {
          title: "Large Appliance Delivery",
          description: "Bought a washing machine, fridge, or other large appliance? I can collect and deliver these safely, ensuring they arrive at your home without damage. I'll handle them carefully during transport."
        },
        {
          title: "Same-Day Collection & Delivery",
          description: "Need something collected and delivered today? I can often provide same-day service. Contact me in the morning and I can collect and deliver within the day, getting your items to you quickly."
        },
        {
          title: "White Glove Service",
          description: "Want furniture positioned in specific rooms? I provide white glove service, delivering items into your home and placing them exactly where you want. No need to move heavy furniture yourself."
        },
        {
          title: "Multiple Items",
          description: "Bought several items from different stores? I can collect from multiple locations and deliver everything in one trip, saving you time and multiple delivery fees."
        }
      ],
      servicePromise: [
        {
          title: "Careful Handling",
          description: "All items are handled with care from collection to delivery. I use proper techniques and equipment to prevent damage. Your purchases will arrive safely at your door."
        },
        {
          title: "Timely Service",
          description: "I understand you want your items delivered promptly. I'll provide accurate delivery times and keep you updated. Same-day service available when you need items quickly."
        },
        {
          title: "White Glove Option",
          description: "Beyond delivery, I can help position items in your home. Whether it's placing a sofa in the living room or moving a wardrobe upstairs, I can assist with placement."
        },
        {
          title: "Transparent Pricing",
          description: "You'll know the cost upfront, based on collection and delivery locations and item size. No hidden fees. I'll explain the service and pricing clearly before starting."
        }
      ],
      faqs: [
        {
          question: "Can you collect from any store?",
          answer: "Yes, I can collect from most stores and warehouses in Ayrshire. I'll need the collection address and any collection reference numbers. Contact me with details and I'll confirm if I can collect."
        },
        {
          question: "Do you deliver upstairs?",
          answer: "Yes, I can help move items upstairs if needed. I'll assess access and let you know if there are any limitations. White glove service includes helping position items where you want them."
        },
        {
          question: "What if the item doesn't fit?",
          answer: "Before collecting, I'll ask about item dimensions and access requirements. If I have concerns about access, I'll discuss this with you beforehand so we can plan accordingly."
        },
        {
          question: "Can you collect from online delivery depots?",
          answer: "Yes, I often collect items from online delivery depots when customers can't collect themselves. Just provide the depot address and collection reference, and I'll handle the rest."
        }
      ]
    }
  };

  const service = serviceData[slug || ''] || serviceData["small-removals"];

  // Schema.org - FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": (service.faqs || []).map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer }
    }))
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(`service_${slug}`);
    trackWhatsAppMessage(`service_${slug}`);
    const defaultMessage = `Hi Chris! I'd like to request a quote for ${service.title} services. Could you please get back to me?`;
    try {
      const phone = "447735852822";
      const encoded = encodeURIComponent(defaultMessage);
      const waUrl = `https://wa.me/${phone}?text=${encoded}`;
      window.open(waUrl, "_blank");
    } catch {}
  };

  const handleFacebookMessengerClick = () => {
    trackFacebookMessengerClick(`service_${slug}`);
    trackFacebookMessage(`service_${slug}`);
    const messengerUrl = "https://m.me/chrisyourmanwithavankilmarnock";
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (isMobile) {
      window.location.href = messengerUrl;
    } else {
      window.open(messengerUrl, "_blank");
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="min-h-screen">
        <Navigation />
        
        {/* Service Hero Section */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.jpg"
              alt={`${service.title} services in Ayrshire`}
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50"></div>
          </div>
          
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
                {service.title}
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed mb-8">
                {service.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleWhatsAppClick}
                  className="bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-6 rounded-xl flex items-center gap-3 text-lg"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Request Service
                </Button>
                <Button
                  onClick={handleFacebookMessengerClick}
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-6 rounded-xl flex items-center gap-3 text-lg"
                >
                  <img src="/Facebook_Messenger_logo_2020.svg" alt="Facebook Messenger" className="w-6 h-6" />
                  Facebook Message
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 px-4 bg-[hsl(var(--background))] border-b border-white/10">
          <div className="container mx-auto max-w-7xl">
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-[hsl(var(--primary-orange))] mb-3" />
                <div className="text-3xl font-bold text-white mb-2">Fast Response</div>
                <div className="text-white/80">Contact for availability</div>
              </div>
              <div className="flex flex-col items-center">
                <MapPin className="w-8 h-8 text-[hsl(var(--primary-orange))] mb-3" />
                <div className="text-3xl font-bold text-white mb-2">Ayrshire</div>
                <div className="text-white/80">Wide coverage area</div>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-8 h-8 text-[hsl(var(--primary-orange))] mb-3" />
                <div className="text-3xl font-bold text-white mb-2">SEPA Registered</div>
                <div className="text-white/80">Professional service</div>
              </div>
            </div>
          </div>
        </section>

        {/* What's Included Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-12 text-center">
              What's Included
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
              {service.features.map((feature, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-[hsl(var(--card))]">
                  <Check className="w-6 h-6 text-[hsl(var(--primary-orange))] flex-shrink-0 mt-1" />
                  <span className="text-white/90">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Happens When You Contact Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                What Happens When You Contact Me
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                I know moving and delivery needs can be stressful. Here's exactly what to expect when you reach out:
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {service.processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center text-white font-bold text-xl z-10">
                    {step.number}
                  </div>
                  <div className="p-6 rounded-xl bg-[hsl(var(--card))] border border-white/10 h-full pt-12">
                    <h3 className="font-display text-2xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Common Situations Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Common {service.title.includes("&") ? service.title.split("&")[0].trim() : service.title.split(" ")[0]} Situations We Handle
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                Every request is different, but here are scenarios I see frequently and how I approach them:
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {service.commonSituations.map((situation, index) => (
                <div key={index} className="p-6 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                  <h3 className="font-display text-2xl font-bold text-white mb-3">
                    {situation.title}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {situation.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Mid-Page WhatsApp CTA */}
        <section className="py-16 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-4xl">
            <div className="bg-gradient-to-r from-green-600/20 to-green-700/20 rounded-2xl p-6 sm:p-8 border-2 border-green-600/30 text-center">
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white mb-4">
                Ready to Get Started?
              </h3>
              <p className="text-base sm:text-lg text-white/90 mb-6 px-2">
                Get a free quote for {service.title.toLowerCase()} via WhatsApp - quick response guaranteed!
              </p>
              <Button
                onClick={handleWhatsAppClick}
                className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-8 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg mx-auto"
              >
                <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                <span>Get Free Quote on WhatsApp</span>
              </Button>
            </div>
          </div>
        </section>

        {/* Customer Service Promise Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Our Customer Service Promise
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {service.servicePromise.map((promise, index) => (
                <div key={index} className="flex items-start gap-4 p-6 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                  <Check className="w-6 h-6 text-[hsl(var(--primary-orange))] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-display text-xl font-bold text-white mb-2">
                      {promise.title}
                    </h3>
                    <p className="text-white/80 leading-relaxed">
                      {promise.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Service Coverage Area */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Service Coverage Area
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                I provide {service.title.toLowerCase()} services throughout Ayrshire including:
              </p>
            </div>

            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
              {["Cumnock", "Ayr", "Kilmarnock", "Irvine", "Troon", "Prestwick"].map((location, index) => (
                <div key={index} className="text-center p-4 rounded-lg bg-[hsl(var(--card))] border border-white/10">
                  <span className="text-white font-medium">{location}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose Chris, Your Man with a Van
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-8 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Fast Response
                </h3>
                <p className="text-white/80">
                  I'll respond quickly to your request, minimizing wait times and getting your service arranged promptly.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <ShieldCheck className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Expert Service
                </h3>
                <p className="text-white/80">
                  Years of experience with all types of moves, deliveries, and collections. I know what I'm doing and do it well.
                </p>
              </div>

              <div className="text-center p-8 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                <div className="w-16 h-16 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Check className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white mb-4">
                  Fair Pricing
                </h3>
                <p className="text-white/80">
                  Transparent, upfront pricing with no hidden fees. I'll always give you a quote before starting any work.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Related Services Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Other Services Available
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                I offer a full range of van services across Ayrshire. Explore other services that might help with your needs.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Small Removals & House Moves", slug: "small-removals", icon: Truck, description: "Professional house moves and office relocations across Ayrshire" },
                { title: "Courier Services & Delivery", slug: "courier", icon: Package, description: "Fast, reliable courier services across Ayrshire and the UK" },
                { title: "Tip Runs & Waste Removal", slug: "waste-removal", icon: Trash2, description: "SEPA registered waste removal and tip run services" },
                { title: "In-Store Collection & Delivery", slug: "collection-and-delivery", icon: ShoppingCart, description: "Collection from stores and delivery straight to your door" },
                { title: "End-of-Tenancy Clearance", slug: "end-of-tenancy", icon: Home, description: "Complete property clearance for tenants and landlords" },
                { title: "Flat Pack Assembly", slug: "flat-pack-assembly", icon: Wrench, description: "Professional flat pack furniture assembly service" },
              ].filter(s => s.slug !== slug).slice(0, 3).map((relatedService) => (
                <a
                  key={relatedService.slug}
                  href={`/services/${relatedService.slug}`}
                  onClick={() => trackNavigation(`related_service_${relatedService.slug}`)}
                  className="card-service hover:border-[hsl(var(--primary-orange))]/50 transition-all duration-300 group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[hsl(var(--primary-orange))] rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <relatedService.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display text-xl font-bold text-white mb-2 group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                        {relatedService.title}
                      </h3>
                      <p className="text-white/80 text-sm leading-relaxed mb-3">
                        {relatedService.description}
                      </p>
                      <div className="flex items-center text-[hsl(var(--primary-orange))] font-semibold text-sm group-hover:gap-2 transition-all">
                        View {relatedService.title.toLowerCase()} details
                        <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/services"
                onClick={() => trackNavigation('view_all_services')}
                className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] hover:text-[hsl(var(--dark-orange))] font-semibold text-lg transition-colors"
              >
                View All Services
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Service Areas Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Available Throughout Ayrshire
              </h2>
              <p className="text-xl text-white/80 max-w-3xl mx-auto">
                {service.title} is available in all major Ayrshire towns. Click any location to learn more about services in that area.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
              {[
                { name: "Cumnock", slug: "cumnock" },
                { name: "Ayr", slug: "ayr" },
                { name: "Kilmarnock", slug: "kilmarnock" },
                { name: "Irvine", slug: "irvine" },
                { name: "Troon", slug: "troon" },
                { name: "Prestwick", slug: "prestwick" },
              ].map((location) => (
                <a
                  key={location.slug}
                  href={`/locations/${location.slug}`}
                  onClick={() => trackNavigation(`service_to_location_${location.slug}`)}
                  className="flex items-center gap-3 p-4 rounded-lg bg-[hsl(var(--card))] border border-white/10 hover:border-[hsl(var(--primary-orange))]/50 transition-all duration-300 group"
                >
                  <MapPin className="w-5 h-5 text-[hsl(var(--primary-orange))] flex-shrink-0" />
                  <span className="text-white font-medium group-hover:text-[hsl(var(--primary-orange))] transition-colors">{location.name}</span>
                  <ArrowRight className="w-4 h-4 text-white/50 ml-auto group-hover:text-[hsl(var(--primary-orange))] group-hover:translate-x-1 transition-all" />
                </a>
              ))}
            </div>

            <div className="text-center mt-12">
              <a
                href="/locations"
                onClick={() => trackNavigation('view_all_locations')}
                className="inline-flex items-center gap-2 text-[hsl(var(--primary-orange))] hover:text-[hsl(var(--dark-orange))] font-semibold text-lg transition-colors"
              >
                View All Service Areas
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </section>

        {/* Available in your area */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl lg:text-4xl font-bold text-white mb-4">
                {service.title} — Available in Your Area
              </h2>
              <p className="text-white/80 max-w-2xl mx-auto">
                Chris provides {service.title.toLowerCase()} across Ayrshire. Select your town for local pricing and availability.
              </p>
            </div>
            <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-3">
              {LOW_RANKING_LOCATIONS.map((loc) => (
                <a
                  key={loc.slug}
                  href={`/locations/${loc.slug}/${slug}`}
                  onClick={() => trackNavigation(`service_to_location_${loc.slug}`)}
                  className="flex items-center gap-2 p-4 rounded-lg bg-[hsl(var(--card))] border border-white/10 hover:border-[hsl(var(--primary-orange))]/50 transition-all group"
                >
                  <MapPin className="w-4 h-4 text-[hsl(var(--primary-orange))] flex-shrink-0" />
                  <span className="text-white text-sm font-medium group-hover:text-[hsl(var(--primary-orange))] transition-colors">
                    {service.title} in {loc.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-6">
              {service.faqs.map((faq, index) => (
                <div key={index} className="p-6 rounded-xl bg-[hsl(var(--card))] border border-white/10">
                  <h3 className="font-display text-xl font-bold text-white mb-3">
                    {faq.question}
                  </h3>
                  <p className="text-white/80 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-7xl">
            <div className="bg-gradient-to-r from-[hsl(var(--primary-orange))]/20 to-[hsl(var(--sunshine-yellow))]/20 rounded-2xl p-6 sm:p-12 border-2 border-[hsl(var(--primary-orange))]/30 text-center">
              <h2 className="font-display text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
                Ready for Fast, Reliable {service.title}?
              </h2>
              <p className="text-base sm:text-xl text-white/90 mb-8 px-2">
                Contact Chris Today!
              </p>
              <p className="text-base sm:text-lg text-white/80 mb-2">
                <strong>Available Day & Night</strong>
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                <Button
                  onClick={handleWhatsAppClick}
                  className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-bold px-4 sm:px-8 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg"
                >
                  <WhatsAppIcon className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>WhatsApp Me</span>
                </Button>
                <Button
                  onClick={handleFacebookMessengerClick}
                  className="w-full sm:w-auto bg-gradient-to-r from-[#8C9CFF] to-[#4781FF] hover:from-[#7B8BF0] hover:to-[#3C6FE6] text-white font-bold px-4 sm:px-8 py-5 sm:py-6 rounded-xl flex items-center justify-center gap-2 sm:gap-3 text-sm sm:text-lg"
                >
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                  <span>Facebook Messenger</span>
                </Button>
              </div>

              <p className="text-sm text-white/70">
                I'll respond quickly to help with your {service.title.toLowerCase()} needs
              </p>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </>
  );
};

export default ServiceDetail;
