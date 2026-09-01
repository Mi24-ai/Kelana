import { useState } from "react";
import { ShoppingBasket, Star, Plus, Minus, Trash2, Sparkles, X } from "lucide-react";
import { soloboxProducts } from "../data/solobox";
import { formatIDR } from "../lib/format";
import BookingWizard from "../components/BookingWizard";
import TravelIllustration from "../components/TravelIllustration";
import type { SoloBoxProduct } from "../types";

interface CartLine {
  product: SoloBoxProduct;
  qty: number;
}

export default function SoloBoxPage() {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);

  const addToCart = (product: SoloBoxProduct) => {
    setCart((prev) => {
      const existing = prev.find((l) => l.product.id === product.id);
      if (existing) {
        return prev.map((l) => (l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l));
      }
      return [...prev, { product, qty: 1 }];
    });
    setCartOpen(true);
  };

  const changeQty = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) => (l.product.id === id ? { ...l, qty: l.qty + delta } : l))
        .filter((l) => l.qty > 0)
    );
  };

  const removeLine = (id: string) => setCart((prev) => prev.filter((l) => l.product.id !== id));

  const total = cart.reduce((sum, l) => sum + l.product.price * l.qty, 0);
  const itemCount = cart.reduce((sum, l) => sum + l.qty, 0);

  const sortedProducts = [...soloboxProducts].sort((a, b) => Number(b.sponsored) - Number(a.sponsored));

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-clay-500)]">SoloBox</p>
          <h1 className="font-[var(--font-display)] text-3xl font-semibold text-[var(--color-indigo-800)]">
            Oleh-Oleh Asli dari UMKM Solo
          </h1>
          <p className="mt-1 max-w-xl text-sm text-[var(--color-ink-500)]">
            Setiap produk disuplai langsung oleh UMKM mitra bernama — dikemas dan dikirim ke alamatmu, atau diambil
            sebelum kepulangan.
          </p>
        </div>
        <button
          onClick={() => setCartOpen(true)}
          className="relative flex items-center gap-2 rounded-full bg-[var(--color-indigo-800)] px-5 py-2.5 text-sm font-semibold text-[var(--color-gold-300)]"
        >
          <ShoppingBasket size={16} /> Keranjang
          {itemCount > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-clay-500)] text-[10px] font-bold text-white">
              {itemCount}
            </span>
          )}
        </button>
      </header>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((p) => (
          <div key={p.id} className="flex flex-col overflow-hidden rounded-2xl border border-[var(--color-gold-300)] bg-white">
            <div className="relative h-32">
              {p.photo ? (
                <img
                  src={p.photo}
                  alt={p.name}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <TravelIllustration variant={p.illustration} className="h-full w-full" />
              )}
              {p.sponsored && (
                <span className="absolute left-2 top-2 flex items-center gap-1 rounded-full bg-[var(--color-gold-500)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[var(--color-indigo-950)]">
                  <Sparkles size={10} /> Direkomendasikan
                </span>
              )}
            </div>
            <div className="flex flex-1 flex-col p-4">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-[var(--color-clay-500)]">{p.category}</p>
              <p className="font-semibold text-[var(--color-indigo-800)]">{p.name}</p>
              <p className="mt-0.5 text-xs text-[var(--color-ink-500)]">
                oleh <span className="font-medium">{p.umkmPartner}</span> · {p.area}
              </p>
              <p className="mt-2 flex-1 text-xs leading-relaxed text-[var(--color-ink-500)]">{p.description}</p>
              <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-[var(--color-gold-900)]">
                <Star size={12} fill="currentColor" /> {p.rating}
                <span className="font-normal text-[var(--color-ink-300)]">({p.reviewCount})</span>
              </div>
              <div className="mt-3 flex items-center justify-between border-t border-dashed border-[var(--color-parchment-300)] pt-3">
                <p className="tabular font-[var(--font-display)] text-base font-semibold text-[var(--color-clay-500)]">
                  {formatIDR(p.price)}
                </p>
                <button
                  onClick={() => addToCart(p)}
                  className="flex items-center gap-1 rounded-full bg-[var(--color-indigo-800)] px-4 py-2 text-xs font-semibold text-[var(--color-gold-300)]"
                >
                  <Plus size={13} /> Tambah
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartOpen && (
        <div className="fixed inset-0 z-50 flex items-end justify-end bg-[var(--color-ink-900)]/50 backdrop-blur-sm md:items-stretch">
          <div className="heritage-frame flex max-h-[85vh] w-full flex-col overflow-hidden rounded-t-3xl bg-[var(--color-parchment-50)] md:h-full md:max-h-none md:w-96 md:rounded-none">
            <div className="flex items-center justify-between border-b border-[var(--color-gold-300)] bg-[var(--color-indigo-800)] px-5 py-4">
              <p className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-parchment-50)]">Keranjang SoloBox</p>
              <button onClick={() => setCartOpen(false)} className="rounded-full p-1.5 text-[var(--color-gold-300)] hover:bg-white/10">
                <X size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <p className="py-10 text-center text-sm text-[var(--color-ink-300)]">Keranjang masih kosong.</p>
              ) : (
                <div className="space-y-3">
                  {cart.map((l) => (
                    <div key={l.product.id} className="rounded-xl border border-[var(--color-gold-300)] bg-white p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <p className="text-sm font-semibold text-[var(--color-indigo-800)]">{l.product.name}</p>
                          <p className="text-xs text-[var(--color-ink-300)]">{l.product.umkmPartner}</p>
                        </div>
                        <button onClick={() => removeLine(l.product.id)} className="text-[var(--color-ink-300)] hover:text-[var(--color-clay-500)]">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => changeQty(l.product.id, -1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-gold-300)] text-[var(--color-indigo-800)]"
                          >
                            <Minus size={13} />
                          </button>
                          <span className="w-5 text-center text-sm font-semibold">{l.qty}</span>
                          <button
                            onClick={() => changeQty(l.product.id, 1)}
                            className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--color-gold-300)] text-[var(--color-indigo-800)]"
                          >
                            <Plus size={13} />
                          </button>
                        </div>
                        <p className="tabular text-sm font-semibold text-[var(--color-clay-500)]">
                          {formatIDR(l.product.price * l.qty)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[var(--color-gold-300)] bg-white p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span className="text-[var(--color-ink-500)]">Total ({itemCount} item)</span>
                  <span className="tabular font-[var(--font-display)] text-lg font-semibold text-[var(--color-indigo-800)]">
                    {formatIDR(total)}
                  </span>
                </div>
                <button
                  onClick={() => {
                    setCartOpen(false);
                    setCheckingOut(true);
                  }}
                  className="w-full rounded-full bg-[var(--color-clay-500)] py-3 text-sm font-semibold text-white"
                >
                  Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {checkingOut && (
        <BookingWizard
          kind="solobox"
          title="Checkout SoloBox"
          subtitle={`${itemCount} produk dari ${new Set(cart.map((l) => l.product.umkmPartner)).size} UMKM mitra`}
          summaryLines={cart.map((l) => ({
            label: `${l.product.name} × ${l.qty}`,
            value: formatIDR(l.product.price * l.qty),
          }))}
          total={total}
          onClose={() => {
            setCheckingOut(false);
            setCart([]);
          }}
        />
      )}
    </div>
  );
}
