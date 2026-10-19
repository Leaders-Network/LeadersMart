'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, clearCart, totalItems } = useCart();

  return (
    <>
      <Header />
      <main className="min-h-screen" style={{ background: '#F7F8FC' }}>
        <div className="max-w-[1312px] mx-auto px-4 lg:px-0 py-10">
          <h1 className="text-[28px] font-700 text-[#171C36] mb-6" style={{ fontWeight: 700 }}>
            Your cart{totalItems > 0 ? ` (${totalItems} item${totalItems > 1 ? 's' : ''})` : ''}
          </h1>

          {cart.length === 0 ? (
            <div className="bg-white rounded-2xl p-16 text-center" style={{ border: '1px solid #E6E8F1' }}>
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: '#EEEDFF' }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="#4353EC" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h2 className="text-[20px] font-700 text-[#171C36] mb-2" style={{ fontWeight: 700 }}>Your cart is empty</h2>
              <p className="text-[14px] mb-6" style={{ color: '#6F7489' }}>Browse our categories and discover everyday upgrades.</p>
              <Link href="/" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-white text-[14px] font-600 hover:opacity-90" style={{ background: '#4353EC', fontWeight: 600 }}>
                Start shopping
              </Link>
            </div>
          ) : (
            <div className="grid lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {cart.map((item) => (
                  <div key={item.id} className="bg-white p-4 flex gap-4" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
                    <div className="relative w-20 h-20 rounded-xl overflow-hidden shrink-0" style={{ background: '#F7F8FC' }}>
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-[13px] font-600 text-[#171C36] mb-0.5" style={{ fontWeight: 600 }}>{item.name}</p>
                      <p className="text-[11px] mb-2" style={{ color: '#9DA3B4' }}>{item.seller}</p>
                      <div className="flex items-center gap-3">
                        <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1.5px solid #E6E8F1' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1.5 text-[15px] hover:bg-gray-50" style={{ color: '#6F7489' }}>−</button>
                          <span className="px-3 py-1.5 text-[13px] font-600 border-x" style={{ borderColor: '#E6E8F1', fontWeight: 600 }}>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1.5 text-[15px] hover:bg-gray-50" style={{ color: '#6F7489' }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} className="text-[13px] hover:opacity-70" style={{ color: '#9DA3B4' }}>Remove</button>
                      </div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-[16px] font-700 text-[#171C36]" style={{ fontWeight: 700 }}>₦{(item.price * item.quantity).toLocaleString('en', { minimumFractionDigits: 2 })}</p>
                      <p className="text-[12px]" style={{ color: '#9DA3B4' }}>₦{item.price.toLocaleString('en', { minimumFractionDigits: 2 })} each</p>
                    </div>
                  </div>
                ))}
                <button onClick={clearCart} className="text-[13px] hover:opacity-70 mt-2" style={{ color: '#9DA3B4' }}>Clear cart</button>
              </div>

              <div className="bg-white p-6 h-fit sticky top-24" style={{ borderRadius: 18, border: '1px solid #E6E8F1' }}>
                <h2 className="text-[16px] font-700 text-[#171C36] mb-4 pb-4" style={{ fontWeight: 700, borderBottom: '1px solid #E6E8F1' }}>Order summary</h2>
                <div className="space-y-3 mb-5">
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: '#6F7489' }}>Subtotal ({totalItems} items)</span>
                    <span className="font-600 text-[#171C36]" style={{ fontWeight: 600 }}>₦{totalPrice.toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex justify-between text-[13px]">
                    <span style={{ color: '#6F7489' }}>Delivery</span>
                    <span className="font-600" style={{ color: '#167A59', fontWeight: 600 }}>
                      {totalPrice >= 50 ? 'Free' : '₦4.99'}
                    </span>
                  </div>
                  {totalPrice < 50 && (
                    <p className="text-[11px]" style={{ color: '#9DA3B4' }}>Add ₦{(50 - totalPrice).toFixed(2)} more for free delivery</p>
                  )}
                  <div className="flex justify-between font-700 text-[15px] pt-3" style={{ borderTop: '1px solid #E6E8F1', fontWeight: 700 }}>
                    <span className="text-[#171C36]">Total</span>
                    <span className="text-[#171C36]">₦{(totalPrice + (totalPrice < 50 ? 4.99 : 0)).toLocaleString('en', { minimumFractionDigits: 2 })}</span>
                  </div>
                </div>
                <button className="w-full py-3 rounded-xl text-white text-[15px] font-600 hover:opacity-90 mb-3" style={{ background: '#4353EC', fontWeight: 600 }}>
                  Proceed to checkout
                </button>
                <Link href="/" className="block text-center text-[13px] font-600 hover:opacity-80" style={{ color: '#4353EC', fontWeight: 600 }}>
                  Continue shopping
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
