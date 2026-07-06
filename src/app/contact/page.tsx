import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
  return (
    <article className="mt-8 flex flex-col gap-8 pb-16">
      <div>
        <p className="mono-label mb-2">Get in touch</p>
        <h1 className="title text-3xl sm:text-4xl">Contact</h1>
      </div>

      <ContactForm />
    </article>
  );
}
