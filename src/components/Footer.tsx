export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="section-shell flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/30">
        <p>&copy; {new Date().getFullYear()} Muhammad Farezy Bin Ab Rahman. Built with React + React Bits.</p>
        <p>Designed &amp; developed from scratch.</p>
      </div>
    </footer>
  );
}
