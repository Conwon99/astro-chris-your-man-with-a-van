import { useEffect, useRef, useState } from "react";
import { Truck, HardHat, CheckCircle, Upload, Send } from "lucide-react";
import LazyImage from "@/components/LazyImage";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const FORMSPREE_URL = "https://formspree.io/f/xzzjbzgl";

type Status = "idle" | "submitting" | "success" | "error";

const driverRequirements = [
  "Clean driving licence (0 points)",
  "No criminal convictions",
  "25 years or older (insurance requirement)",
  "Comfortable driving a large van",
  "Punctual, reliable, and customer-friendly",
];

const labourerRequirements = [
  "Good physical fitness",
  "Able to lift and carry heavy items safely",
  "Reliable and hardworking",
  "Team player with a positive attitude",
  "Experience in removals or labouring a bonus",
];

const Jobs = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [role, setRole] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setStatus("submitting");
    setErrorMsg("");

    const data = new FormData(formRef.current);
    // Ensure the role field from controlled select is in the FormData
    data.set("role", role);

    try {
      const res = await fetch(FORMSPREE_URL, {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setStatus("success");
      } else {
        const json = await res.json().catch(() => ({}));
        setErrorMsg(
          (json as { error?: string }).error ||
            "Something went wrong. Please try again or contact us directly."
        );
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <>
      <main className="min-h-screen">
        <Navigation />

        {/* Hero */}
        <section className="relative py-20 px-4 overflow-hidden min-h-[60vh] flex items-center">
          <div className="absolute inset-0 z-0">
            <LazyImage
              src="/vanfront.webp"
              alt="Chris, Your Man with a Van — join the team"
              className="w-full h-full object-cover object-center"
              fallbackSrc="/vanfront.jpg"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/90 via-black/70 to-black/50" />
          </div>
          <div className="container mx-auto max-w-7xl relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6">
                Want to Join the Team?
              </h1>
              <p className="text-xl lg:text-2xl text-white/90 leading-relaxed">
                We're growing and looking for reliable, hard-working people across Ayrshire.
                Send us your CV and let's have a chat.
              </p>
            </div>
          </div>
        </section>

        {/* Role Cards */}
        <section className="py-20 px-4 bg-[hsl(var(--background))]">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Current Openings
              </h2>
              <p className="text-white/70 text-lg">
                Two positions available — apply for the one that suits you, or both.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Driver Card */}
              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/30 bg-[hsl(var(--card))]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(var(--primary-orange))] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Truck className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">Driver</h3>
                    <p className="text-[hsl(var(--sunshine-yellow))] text-sm font-medium">Van Driver — Ayrshire</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Drive and represent Chris, Your Man with a Van on jobs across Ayrshire. You'll be the face of the business — professional, friendly, and on time.
                </p>
                <ul className="space-y-3">
                  {driverRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-white/85">
                      <CheckCircle className="w-5 h-5 text-[hsl(var(--primary-orange))] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Labourer Card */}
              <div className="rounded-2xl p-8 border-2 border-[hsl(var(--sunshine-yellow))]/30 bg-[hsl(var(--card))]">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-[hsl(51_85%_60%)] rounded-xl flex items-center justify-center flex-shrink-0">
                    <HardHat className="w-7 h-7 text-black" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-white">Labourer</h3>
                    <p className="text-[hsl(var(--sunshine-yellow))] text-sm font-medium">General Labourer — Ayrshire</p>
                  </div>
                </div>
                <p className="text-white/80 mb-6 leading-relaxed">
                  Help with removals, clearances, deliveries, and general van work. Hands-on, physical work in a friendly team environment.
                </p>
                <ul className="space-y-3">
                  {labourerRequirements.map((req) => (
                    <li key={req} className="flex items-start gap-3 text-white/85">
                      <CheckCircle className="w-5 h-5 text-[hsl(51_85%_60%)] mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-20 px-4 bg-[hsl(var(--muted))]">
          <div className="container mx-auto max-w-2xl">
            <div className="text-center mb-12">
              <h2 className="font-display text-4xl font-bold text-white mb-4">
                Apply Now
              </h2>
              <p className="text-white/70 text-lg">
                Fill in your details below and attach your CV. We'll be in touch.
              </p>
            </div>

            {status === "success" ? (
              <div className="rounded-2xl p-10 text-center border-2 border-[hsl(var(--primary-orange))]/40 bg-[hsl(var(--card))]">
                <CheckCircle className="w-16 h-16 text-[hsl(var(--primary-orange))] mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-white mb-3">
                  Application Received!
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Thanks for getting in touch. We'll review your application and get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="rounded-2xl p-8 border-2 border-[hsl(var(--primary-orange))]/20 bg-[hsl(var(--card))] space-y-6"
                encType="multipart/form-data"
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white font-medium">
                    Full Name <span className="text-[hsl(var(--primary-orange))]">*</span>
                  </Label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="bg-[hsl(var(--background))] border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(var(--primary-orange))]"
                  />
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white font-medium">
                    Email Address <span className="text-[hsl(var(--primary-orange))]">*</span>
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="your@email.com"
                    className="bg-[hsl(var(--background))] border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(var(--primary-orange))]"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-white font-medium">
                    Phone Number <span className="text-[hsl(var(--primary-orange))]">*</span>
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="07700 000000"
                    className="bg-[hsl(var(--background))] border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(var(--primary-orange))]"
                  />
                </div>

                {/* Role */}
                <div className="space-y-2">
                  <Label htmlFor="role" className="text-white font-medium">
                    Role Applying For <span className="text-[hsl(var(--primary-orange))]">*</span>
                  </Label>
                  <Select value={role} onValueChange={setRole} required>
                    <SelectTrigger
                      id="role"
                      className="bg-[hsl(var(--background))] border-white/20 text-white focus:border-[hsl(var(--primary-orange))]"
                    >
                      <SelectValue placeholder="Select a role…" />
                    </SelectTrigger>
                    <SelectContent className="bg-[hsl(var(--card))] border-white/20 text-white">
                      <SelectItem value="Driver">Driver</SelectItem>
                      <SelectItem value="Labourer">Labourer</SelectItem>
                      <SelectItem value="Either">Either / Both</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* CV Upload */}
                <div className="space-y-2">
                  <Label htmlFor="cv" className="text-white font-medium">
                    CV / Resume <span className="text-[hsl(var(--primary-orange))]">*</span>
                  </Label>
                  <div className="flex items-center gap-3 rounded-md border border-white/20 bg-[hsl(var(--background))] px-3 py-2 cursor-pointer hover:border-[hsl(var(--primary-orange))] transition-colors">
                    <Upload className="w-4 h-4 text-white/50 flex-shrink-0" />
                    <input
                      id="cv"
                      name="cv"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      required
                      className="flex-1 text-sm text-white/70 file:mr-3 file:py-0 file:px-0 file:border-0 file:bg-transparent file:text-[hsl(var(--primary-orange))] file:font-medium file:cursor-pointer focus:outline-none"
                    />
                  </div>
                  <p className="text-white/40 text-xs">PDF, Word (.doc, .docx) accepted</p>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-white font-medium">
                    Anything else you'd like us to know?{" "}
                    <span className="text-white/40 font-normal">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Tell us a bit about yourself, availability, or any relevant experience…"
                    rows={4}
                    className="bg-[hsl(var(--background))] border-white/20 text-white placeholder:text-white/40 focus:border-[hsl(var(--primary-orange))] resize-none"
                  />
                </div>

                {/* Error message */}
                {status === "error" && (
                  <p className="text-red-400 text-sm rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3">
                    {errorMsg}
                  </p>
                )}

                <Button
                  type="submit"
                  disabled={status === "submitting" || !role}
                  className="w-full h-14 text-base font-bold rounded-xl bg-[hsl(var(--primary-orange))] hover:bg-[hsl(var(--dark-orange))] text-white disabled:opacity-60"
                >
                  {status === "submitting" ? (
                    "Sending…"
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Application
                    </>
                  )}
                </Button>

                <p className="text-white/40 text-xs text-center">
                  By submitting this form you agree to us contacting you regarding your application.
                </p>
              </form>
            )}
          </div>
        </section>
      </main>

      <Footer client:load />
    </>
  );
};

export default Jobs;
