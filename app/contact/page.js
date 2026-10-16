'use client';
import { useEffect, useRef, useState } from 'react';
import { Mail, MapPin, Check, ListChecks } from 'lucide-react';
import { profile } from '@/lib/data';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);
  const doneRef = useRef(null);
  useEffect(() => { if (sent) doneRef.current?.focus(); }, [sent]);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) return;
    setSent(true); // Portfolio template: the message is not delivered anywhere.
  };

  const field = 'w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-base text-black transition placeholder:text-gray-500 focus:border-black';
  const label = 'mb-1.5 block text-sm font-medium text-gray-700';

  return (
    <main className="bg-white">
      <section className="px-6 pb-10 pt-28 md:pt-32">
        <div className="mx-auto max-w-7xl">
          <span className="mb-4 inline-block rounded-full bg-gray-200 px-3 py-1 text-xs uppercase tracking-wide text-gray-600">Contact</span>
          <h1 className="text-4xl font-light tracking-tight text-black md:text-6xl">Let&apos;s work together.</h1>
          <p className="mt-5 max-w-2xl text-gray-600">Open for freelance & collaboration. Tell me about your project and I&apos;ll get back to you.</p>
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1fr_1.2fr]">
          {/* Info */}
          <div className="space-y-5">
            <Info icon={Mail} label="Email" value={profile.email} href={`mailto:${profile.email}`} />
            <Info icon={MapPin} label="Location" value={profile.location} />
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-black">
                <ListChecks size={18} aria-hidden="true" /> A useful first note
              </p>
              <ul className="mt-2 space-y-1 text-sm text-gray-600">
                <li>Who uses the tool, and on which busy day.</li>
                <li>The step that breaks today.</li>
                <li>A rough date, if there is one.</li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <div>
            {sent ? (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-10 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white"><Check size={28} aria-hidden="true" /></div>
                <h2 ref={doneRef} tabIndex={-1} className="mt-4 text-2xl font-semibold outline-none">Thanks for trying the form!</h2>
                <p className="mt-1 text-gray-600">This is a portfolio template, {form.name}, so your message wasn&apos;t actually sent. In a live version, it lands straight in the owner&apos;s inbox.</p>
                <button type="button" onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }} className="mt-6 min-h-11 rounded-full border border-black px-6 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white">Back to the form</button>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4 rounded-2xl border border-gray-200 bg-gray-50 p-6 md:p-8">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="f-name" className={label}>Name</label>
                    <input id="f-name" name="name" value={form.name} onChange={handle} autoComplete="name" required className={field} />
                  </div>
                  <div>
                    <label htmlFor="f-email" className={label}>Email</label>
                    <input id="f-email" type="email" name="email" value={form.email} onChange={handle} autoComplete="email" required className={field} />
                  </div>
                </div>
                <div>
                  <label htmlFor="f-message" className={label}>About the project</label>
                  <textarea id="f-message" name="message" value={form.message} onChange={handle} placeholder="Who is it for, and what should feel calmer?" rows={6} required className={`${field} resize-none`} />
                </div>
                <button type="submit" className="min-h-12 w-full rounded-xl bg-black py-3.5 font-medium text-white transition hover:bg-gray-800">Send message</button>
                <p className="text-center text-xs text-gray-600">Demo form: nothing is sent or stored.</p>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, label, value, href }) {
  const inner = (
    <div className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5 transition hover:border-black">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gray-100 text-black"><Icon size={20} aria-hidden="true" /></span>
      <div>
        <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-0.5 font-semibold text-black">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}
