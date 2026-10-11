'use client';

import { useState, FormEvent } from 'react';

export default function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    setFormState('submitting');
    setErrorMessage('');

    try {
      // Convert FormData to URLSearchParams properly
      const body = new URLSearchParams();
      formData.forEach((value, key) => {
        body.append(key, value.toString());
      });

      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString()
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);

      setFormState('success');
      form.reset();
    } catch {
      setFormState('error');
      setErrorMessage("Erreur lors de l'envoi. Veuillez réessayer.");
    }
  };

  return (
    <section id="contact" className="section contact-section py-16 px-6 bg-[#0A1A2F]">
      <div className="section-container max-w-2xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl font-bold uppercase text-center text-white mb-8">
          Contact
        </h2>
        <p className="section-description text-lg text-center text-white/70 mb-12">
          Une question, une idée d’outil ou une collaboration ? Écrivez-nous.
        </p>

        <form onSubmit={handleSubmit} className="contact-form space-y-6" name="contact" method="POST" data-netlify="true" data-netlify-honeypot="bot-field">
          <input type="hidden" name="form-name" value="contact" />
          <p hidden>
            <label>
              Ne pas remplir :
              <input name="bot-field" />
            </label>
          </p>

          <div className="form-group flex flex-col">
            <label htmlFor="name" className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
              Nom
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              aria-required="true"
              className="px-5 py-4 bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:border-white transition-all duration-300"
              placeholder="Votre nom"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="email" className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              aria-required="true"
              className="px-5 py-4 bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:border-white transition-all duration-300"
              placeholder="Votre email"
            />
          </div>

          <div className="form-group flex flex-col">
            <label htmlFor="message" className="text-sm font-semibold uppercase tracking-wider text-white/60 mb-2">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              required
              aria-required="true"
              className="px-5 py-4 bg-white/5 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:bg-white/10 focus:border-white transition-all duration-300 resize-none"
              placeholder="Votre message"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={formState === 'submitting'}
            className="submit-button w-full px-10 py-5 bg-transparent text-white border-2 border-white font-semibold uppercase tracking-wider hover:bg-white hover:text-[#0A1A2F] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {formState === 'submitting' ? 'Envoi...' : 'Envoyer le message'}
          </button>

          {formState === 'success' && (
            <div className="form-message success text-center p-4 bg-green-500/20 border border-green-500/30 text-green-400 animate-fade-in">
              Message envoyé avec succès !
            </div>
          )}

          {formState === 'error' && (
            <div className="form-message error text-center p-4 bg-red-500/20 border border-red-500/30 text-red-400 animate-fade-in">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </section>
  );
}