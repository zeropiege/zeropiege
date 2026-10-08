export default function Footer() {
  return (
    <footer className="footer bg-[#081524] border-t border-white/10 py-8">
      <div className="footer-container max-w-6xl mx-auto px-6 text-center">
        <p className="text-sm text-white/60">
          &copy; {new Date().getFullYear()} [Nom de Marque]. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}