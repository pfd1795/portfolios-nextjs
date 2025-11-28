import Link from 'next/link';

export default function DashboardPage() {
  return (
    <section className="text-white min-h-screen flex flex-col items-center justify-center space-y-6 p-6">
      <h2 className="text-3xl font-bold">¡Bienvenidos al Panel de Control!</h2>

      <p className="text-lg mb-4">
        Esta página será actualizada con contenido próximamente.
      </p>

      <Link
        href="/home"
        title="Volver al inicio"
        className="text-sky-400 hover:text-sky-600 underline transition-colors"
      >
        Volver al Inicio
      </Link>
    </section>
  );
}
