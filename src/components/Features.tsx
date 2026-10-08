export default function Features() {
  const features = [
    {
      title: '[Fonctionnalité 1]',
      description: '[Description de la fonctionnalité 1]'
    },
    {
      title: '[Fonctionnalité 2]',
      description: '[Description de la fonctionnalité 2]'
    },
    {
      title: '[Fonctionnalité 3]',
      description: '[Description de la fonctionnalité 3]'
    }
  ];

  return (
    <section id="features" className="section py-16 px-6 bg-[#0A1A2F]">
      <div className="section-container max-w-6xl mx-auto">
        <h2 className="section-title text-3xl md:text-4xl font-bold uppercase text-center text-white mb-8">
          [Fonctionnalités]
        </h2>
        <p className="section-description text-lg text-center text-white/70 mb-12 max-w-2xl mx-auto">
          [Description des fonctionnalités]
        </p>
        <div className="features-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="feature-card bg-white/5 border border-white/10 p-8 text-center transition-all duration-300 hover:bg-white/10 hover:-translate-y-2 hover:border-white/20"
            >
              <h3 className="feature-title text-xl font-bold uppercase text-white mb-4">
                {feature.title}
              </h3>
              <p className="feature-text text-base text-white/80 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}