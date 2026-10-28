import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Heart,
  Eye,
  Zap,
  Check,
  Smartphone,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';

interface ProductCatalogProps {
  initialCategory?: 'all' | 'phone' | 'accessory' | 'audio' | 'wearable';
  title?: string;
  subtitle?: string;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  initialCategory = 'all',
  title,
  subtitle,
}) => {
  const {
    products,
    wishlist,
    toggleWishlist,
    setSelectedProduct,
    navigateTo,
    isCustomerLoggedIn,
    setShowCustomerAuthModal,
    t,
  } = useApp();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const brands = useMemo(() => {
    const list = Array.from(new Set(products.map((p) => p.brand)));
    return ['all', ...list];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => p.isActive)
      .filter((p) => {
        if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
        if (selectedBrand !== 'all' && p.brand !== selectedBrand) return false;
        if (search) {
          const query = search.toLowerCase();
          return (
            p.name.toLowerCase().includes(query) ||
            p.brand.toLowerCase().includes(query) ||
            p.model.toLowerCase().includes(query) ||
            (p.ram && p.ram.toLowerCase().includes(query)) ||
            (p.storage && p.storage.toLowerCase().includes(query))
          );
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.sellingPrice - b.sellingPrice;
        if (sortBy === 'price-desc') return b.sellingPrice - a.sellingPrice;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedBrand, search, sortBy]);

  const handleWishlistClick = (e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    if (!isCustomerLoggedIn) {
      setShowCustomerAuthModal(true);
      return;
    }
    toggleWishlist(productId);
  };

  return (
    <section className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-left mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
            <Smartphone className="w-3.5 h-3.5" />
            <span>{t('Available In Store & Online', 'स्टोर और ऑनलाइन पर उपलब्ध')}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {title || t('Explore Smartphone & Accessories Catalog', 'स्मार्टफोन और एक्सेसरीज़ सूची')}
          </h2>
          <p className="text-sm text-slate-600 max-w-2xl">
            {subtitle ||
              t(
                'Original box-packed phones with GST bill, 1-year brand warranty, and fast on-spot 0% EMI finance at Godadara, Surat.',
                'जीएसटी बिल, 1 साल की ब्रांड वारंटी और गोडादरा, सूरत में स्पॉट 0% ईएमआई के साथ 100% असली फोन।'
              )}
          </p>
        </div>

        {/* Filters & Search Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs mb-8 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            
            {/* Search Input */}
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={t('Search phone model, iPhone 16, Vivo, 256GB...', 'फोन मॉडल, iPhone 16, Vivo खोजें...')}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:bg-white transition"
              />
            </div>

            {/* Brand Filter */}
            <div className="md:col-span-4 flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 whitespace-nowrap hidden sm:inline">
                {t('Brand:', 'ब्रांड:')}
              </span>
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                <option value="all">{t('All Brands (Apple, Samsung, Vivo...)', 'सभी ब्रांड्स')}</option>
                {brands.filter((b) => b !== 'all').map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Order */}
            <div className="md:col-span-3">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold rounded-xl px-3 py-2.5 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
              >
                <option value="featured">{t('Featured Models', 'पसंदीदा मॉडल')}</option>
                <option value="price-asc">{t('Price: Low to High', 'कीमत: कम से ज्यादा')}</option>
                <option value="price-desc">{t('Price: High to Low', 'कीमत: ज्यादा से कम')}</option>
              </select>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
            {[
              { id: 'all', label: t('All Items', 'सभी वस्तुएं') },
              { id: 'phone', label: t('Smartphones (5G)', 'स्मार्टफोन') },
              { id: 'audio', label: t('Earbuds & Audio', 'ईयरबड्स व साउंड') },
              { id: 'accessory', label: t('Adapters & Cables', 'चार्जर व केबल') },
              { id: 'wearable', label: t('Smartwatches', 'स्मार्टवॉच') },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`text-xs font-bold px-3.5 py-1.5 rounded-xl transition cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200">
            <Smartphone className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-800">
              {t('No products found', 'कोई उत्पाद नहीं मिला')}
            </h3>
            <p className="text-sm text-slate-500 mt-1">
              {t(
                'Try searching for another model or clear selected filters.',
                'कृपया दूसरा मॉडल खोजें या फ़िल्टर रीसेट करें।'
              )}
            </p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedBrand('all');
                setSelectedCategory('all');
              }}
              className="mt-4 px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl"
            >
              {t('Reset Filters', 'फ़िल्टर रीसेट करें')}
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.includes(product.productId);
              const estEmi = Math.round(product.sellingPrice / 12);

              return (
                <div
                  key={product.productId}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl hover:border-rose-200 transition-all duration-200 flex flex-col cursor-pointer relative"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={product.images[0] || 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=600&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Stock Alert Badge */}
                    <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                      {product.stockQuantity <= product.lowStockAlert && product.stockQuantity > 0 ? (
                        <span className="bg-amber-500 text-slate-950 text-[10px] font-black px-2 py-0.5 rounded-md shadow-xs">
                          {t(`Only ${product.stockQuantity} Left!`, `केवल ${product.stockQuantity} शेष!`)}
                        </span>
                      ) : product.stockQuantity > 0 ? (
                        <span className="bg-emerald-600/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
                          {t('In Stock', 'स्टॉक में उपलब्ध')}
                        </span>
                      ) : (
                        <span className="bg-slate-700 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                          {t('Out of Stock', 'स्टॉक समाप्त')}
                        </span>
                      )}

                      {product.isFeatured && (
                        <span className="bg-rose-600 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-md shadow-xs flex items-center gap-1">
                          <Sparkles className="w-2.5 h-2.5" />
                          <span>{t('BESTSELLER', 'बेस्टसेलर')}</span>
                        </span>
                      )}
                    </div>

                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => handleWishlistClick(e, product.productId)}
                      className={`absolute top-2.5 right-2.5 p-2 rounded-full backdrop-blur-md transition shadow-xs ${
                        isWishlisted
                          ? 'bg-rose-600 text-white'
                          : 'bg-white/80 hover:bg-white text-slate-600 hover:text-rose-600'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-white' : ''}`} />
                    </button>

                    {/* Variant / Spec Bar */}
                    {(product.ram || product.storage) && (
                      <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-1 rounded-lg flex items-center justify-between">
                        <span>{product.ram ? `${product.ram} RAM` : ''}</span>
                        <span>{product.storage ? `${product.storage} ROM` : ''}</span>
                        <span className="text-amber-400 font-bold">{product.color}</span>
                      </div>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="p-4 flex flex-col flex-1 text-left justify-between">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 font-medium mb-1">
                        <span>{product.brand}</span>
                        <span>GST 18% Incl.</span>
                      </div>
                      <h3 className="font-extrabold text-slate-900 text-base line-clamp-1 group-hover:text-rose-600 transition">
                        {product.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                        {product.description}
                      </p>
                    </div>

                    {/* Price and EMI banner */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                      <div className="flex items-baseline justify-between">
                        <div>
                          <span className="text-lg font-black text-slate-900">
                            ₹{product.sellingPrice.toLocaleString('en-IN')}
                          </span>
                          {product.mrp > product.sellingPrice && (
                            <span className="ml-2 text-xs text-slate-400 line-through">
                              ₹{product.mrp.toLocaleString('en-IN')}
                            </span>
                          )}
                        </div>
                        {product.mrp > product.sellingPrice && (
                          <span className="text-[11px] font-extrabold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {Math.round(((product.mrp - product.sellingPrice) / product.mrp) * 100)}% OFF
                          </span>
                        )}
                      </div>

                      {product.isEMIAvailable && (
                        <div className="bg-amber-50/80 border border-amber-200/80 text-amber-900 text-[11px] font-semibold px-2 py-1 rounded-lg flex items-center justify-between">
                          <span className="flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-600" />
                            <span>{t('0% EMI from', '0% ईएमआई')}</span>
                          </span>
                          <span className="font-black text-rose-700">₹{estEmi.toLocaleString('en-IN')}/mo</span>
                        </div>
                      )}

                      {/* View & Enquire button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedProduct(product);
                        }}
                        className="w-full mt-2 py-2 bg-slate-900 hover:bg-rose-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1 shadow-xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{t('View Details & EMI', 'विवरण व ईएमआई देखें')}</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
