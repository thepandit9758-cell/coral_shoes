
const PRODUCTS = [
  {
    id: 'shoe-01',
    title: 'CoralPulse EVA Pro Runner',
    category: 'EVA Lightweight',
    price: 1599,
    mrp: 2499,
    rating: 4.9,
    reviews: 46,
    badge: 'Bestseller',
    sole: 'High-Rebound EVA Foam',
    upper: 'Breathable Engineered Mesh',
    weight: '235g (per shoe)',
    image: './aerial-gym-training.jpg',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Jet Black & Coral', hex: '#1C1917' },
      { name: 'Coral Blaze', hex: '#E05A47' }
    ],
    desc: 'Featherlight EVA midsole engineered to absorb impact during morning runs, gym sessions, and long daily walks.'
  },

  {
    id: 'shoe-02',
    title: 'AirMesh Cushion Sports Trainer',
    category: 'Sports & Running',
    price: 1699,
    mrp: 2599,
    rating: 4.9,
    reviews: 54,
    badge: 'Top Rated',
    sole: 'Dual-Density EVA + Grip Rubber',
    upper: '3D AirMesh Ventilation',
    weight: '250g (per shoe)',
    image: './airmesh-sports-trainer.jpg',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Slate & Coral', hex: '#64748B' },
      { name: 'Graphite', hex: '#374151' }
    ],
    desc: 'Responsive sports trainer with reinforced heel lock and airy 3D mesh upper for maximum breathability.'
  },

  {
    id: 'shoe-03',
    title: 'CourtLow Suede Accent Sneakers',
    category: 'Casual Sneakers',
    price: 1549,
    mrp: 2299,
    rating: 4.8,
    reviews: 39,
    badge: 'New Drop',
    sole: 'Natural Gum Rubber Cupsole',
    upper: 'Micro-Leather & Suede Heel Tab',
    weight: '310g (per shoe)',
    image: './court-suede-sneakers.jpg',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Cream & Coral', hex: '#E05A47' },
      { name: 'Classic White', hex: '#F5F5F4' }
    ],
    desc: 'Clean low-top court silhouette with coral suede heel accents and memory-foam insole for effortless everyday wear.'
  },

  {
    id: 'shoe-04',
    title: 'Apex High-Top Street Sneakers',
    category: 'High-Tops',
    price: 1999,
    mrp: 2999,
    rating: 4.9,
    reviews: 31,
    badge: 'Street Edition',
    sole: 'Sculpted Traction Outsole',
    upper: 'Padded Collar + Nubuck Overlays',
    weight: '360g (per shoe)',
    image: './nighttop-street-sneakers.jpg',
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'White, Slate & Coral', hex: '#475569' },
      { name: 'Triple Charcoal', hex: '#292524' }
    ],
    desc: 'Mid-high ankle support with bold coral side-cage detailing and cushioned tongue for street and court styling.'
  },

  {
    id: 'shoe-05',
    title: 'AeroKnit Gym & Walk Sneakers',
    category: 'EVA Lightweight',
    price: 1399,
    mrp: 1999,
    rating: 4.8,
    reviews: 42,
    badge: 'Value Pick',
    sole: 'CloudFlex EVA Midsole',
    upper: 'Seamless Stretch Flyknit',
    weight: '220g (per shoe)',
    image: './alimeh-sports-training.jpg',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Navy Slate', hex: '#334155' },
      { name: 'Ash Grey', hex: '#78716C' }
    ],
    desc: 'Sock-like stretch knit upper with zero-break-in comfort—perfect for travel, college, and daily cardio.'
  },

  {
    id: 'shoe-06',
    title: 'Sandstone Suede Loafers & Court',
    category: 'Loafers & Smart',
    price: 1849,
    mrp: 2699,
    rating: 4.9,
    reviews: 28,
    badge: 'Smart Casual',
    sole: 'Flexible Crepe-Feel Outsole',
    upper: 'Soft Brushed Vegan Suede',
    weight: '295g (per shoe)',
    image: './sandstone-suede-loafers.jpg',
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Warm Camel', hex: '#B08968' },
      { name: 'Sandstone', hex: '#D6C7B2' }
    ],
    desc: 'Refined slip-on silhouette crafted for smart-casual office days, festive gatherings, and weekend dinners.'
  }
];

    const CATEGORIES = ['All', 'Sports & Running', 'EVA Lightweight', 'Casual Sneakers', 'High-Tops', 'Loafers & Smart'];
    const FREE_SHIPPING_THRESHOLD = 1499;

    let state = {
      activeCategory: 'All',
      sizeFilter: 'All',
      searchQuery: '',
      sortBy: 'featured',
      wishlistOnly: false,
      wishlist: new Set(),
      cart: [],
      promoCode: null,
      quickViewProduct: null,
      qvSize: '',
      qvColor: '',
      fulfillMode: 'delivery'
    };

    try {
      const savedCart = JSON.parse(localStorage.getItem('coral_shoes_cart') || '[]');
      if (Array.isArray(savedCart)) state.cart = savedCart;
      const savedWish = JSON.parse(localStorage.getItem('coral_shoes_wish') || '[]');
      if (Array.isArray(savedWish)) state.wishlist = new Set(savedWish);
    } catch (e) {}

    function persistState() {
      try {
        localStorage.setItem('coral_shoes_cart', JSON.stringify(state.cart));
        localStorage.setItem('coral_shoes_wish', JSON.stringify([...state.wishlist]));
      } catch (e) {}
    }

    function formatINR(num) {
      return '₹' + (Number(num) || 0).toLocaleString('en-IN');
    }

    function showToast(msg) {
      const el = document.getElementById('toast');
      el.textContent = msg;
      el.classList.remove('hidden');
      clearTimeout(window.__toastTimer);
      window.__toastTimer = setTimeout(() => el.classList.add('hidden'), 2600);
    }

    function getFilteredProducts() {
      let list = PRODUCTS.filter(p => {
        if (state.activeCategory !== 'All' && p.category !== state.activeCategory) return false;
        if (state.sizeFilter !== 'All' && !p.sizes.includes(state.sizeFilter)) return false;
        if (state.wishlistOnly && !state.wishlist.has(p.id)) return false;
        if (state.searchQuery.trim()) {
          const q = state.searchQuery.toLowerCase();
          if (!p.title.toLowerCase().includes(q) && !p.category.toLowerCase().includes(q) && !p.desc.toLowerCase().includes(q)) return false;
        }
        return true;
      });
      if (state.sortBy === 'price-asc') list = [...list].sort((a, b) => a.price - b.price);
      else if (state.sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price);
      else if (state.sortBy === 'rating') list = [...list].sort((a, b) => b.rating - a.rating);
      return list;
    }

    function renderCategoryPills() {
      const container = document.getElementById('category-pills');
      container.innerHTML = CATEGORIES.map(cat => {
        const active = state.activeCategory === cat;
        return `<button type="button" data-pill-cat="${cat}" class="px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition ${active ? 'bg-charcoal text-white' : 'bg-white text-stone-700 border border-stone-200 hover:border-coral'}">${cat}</button>`;
      }).join('');
    }

    function renderCatalog() {
      const grid = document.getElementById('product-grid');
      const empty = document.getElementById('empty-catalog');
      const filterBar = document.getElementById('active-filter-bar');
      const filterText = document.getElementById('active-filter-text');
      const list = getFilteredProducts();

      if (state.wishlistOnly || state.searchQuery.trim() || state.sizeFilter !== 'All') {
        filterBar.classList.remove('hidden');
        const parts = [];
        if (state.wishlistOnly) parts.push('Saved Shoes');
        if (state.sizeFilter !== 'All') parts.push(`Size: ${state.sizeFilter}`);
        if (state.searchQuery.trim()) parts.push(`Search: "${state.searchQuery.trim()}"`);
        filterText.textContent = `Showing ${list.length} pair(s) — ${parts.join(' • ')}`;
      } else {
        filterBar.classList.add('hidden');
      }

      if (!list.length) {
        grid.innerHTML = '';
        empty.classList.remove('hidden');
        return;
      }
      empty.classList.add('hidden');

      grid.innerHTML = list.map(p => {
        const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);
        const wished = state.wishlist.has(p.id);
        return `
          <article class="group bg-white rounded-2xl border border-stone-200/90 overflow-hidden flex flex-col justify-between hover:shadow-md transition">
            <div>
              <div class="relative aspect-[4/3] bg-sand overflow-hidden">
                <img src="${p.image}" alt="${p.title}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500 cursor-pointer" data-quick-view="${p.id}" />
                <span class="absolute top-3 left-3 bg-white/95 text-charcoal text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs">${p.badge}</span>
                <button type="button" data-toggle-wish="${p.id}" aria-label="Save to wishlist" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 flex items-center justify-center shadow-xs hover:scale-110 transition ${wished ? 'text-coral' : 'text-stone-400'}">
                  <svg class="w-4 h-4" fill="${wished ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"/></svg>
                </button>
              </div>
              <div class="p-4">
                <div class="flex items-center justify-between text-xs text-stone-500 mb-1">
                  <span>${p.category}</span>
                  <span class="font-medium text-charcoal">★ ${p.rating} (${p.reviews})</span>
                </div>
                <h3 data-quick-view="${p.id}" class="font-semibold text-base text-charcoal leading-snug cursor-pointer hover:text-coral transition">${p.title}</h3>
                <p class="text-xs text-stone-500 mt-1">${p.sole} • ${p.sizes[0]}–${p.sizes[p.sizes.length - 1]}</p>
                <div class="flex items-center gap-2 mt-2.5">
                  <span class="font-bold text-base text-charcoal">${formatINR(p.price)}</span>
                  <span class="text-xs text-stone-400 line-through">${formatINR(p.mrp)}</span>
                  <span class="text-[11px] font-semibold text-emerald-700">${disc}% off</span>
                </div>
              </div>
            </div>
            <div class="px-4 pb-4 pt-1 flex gap-2">
              <button type="button" data-quick-add="${p.id}" class="flex-1 bg-charcoal hover:bg-coral text-white text-xs sm:text-sm font-medium py-2.5 rounded-full transition">Add to Bag</button>
              <button type="button" data-quick-view="${p.id}" class="px-4 py-2.5 rounded-full border border-stone-300 hover:border-charcoal text-xs font-medium transition">Sizes</button>
            </div>
          </article>
        `;
      }).join('');
    }

    function updateHeaderBadges() {
      const totalQty = state.cart.reduce((sum, item) => sum + item.qty, 0);
      document.getElementById('cart-count').textContent = String(totalQty);
      const wishBadge = document.getElementById('wishlist-count');
      wishBadge.textContent = String(state.wishlist.size);
      wishBadge.classList.toggle('hidden', state.wishlist.size === 0);
      const wishIcon = document.getElementById('wishlist-header-icon');
      wishIcon.setAttribute('fill', state.wishlistOnly ? 'currentColor' : 'none');
      wishIcon.classList.toggle('text-coral', state.wishlistOnly);
    }

    function calcCartTotals() {
      const subtotal = state.cart.reduce((sum, item) => {
        const prod = PRODUCTS.find(p => p.id === item.id);
        return sum + (prod ? prod.price * item.qty : 0);
      }, 0);
      let discount = 0;
      let promoLabel = '';
      if (state.promoCode === 'CORAL10' && subtotal > 0) {
        discount = Math.round(subtotal * 0.10);
        promoLabel = 'Promo (CORAL10 - 10%)';
      } else if (state.promoCode === 'MATHURA15' && subtotal >= 1999) {
        discount = Math.round(subtotal * 0.15);
        promoLabel = 'Promo (MATHURA15 - 15%)';
      }
      const afterDiscount = Math.max(0, subtotal - discount);
      const shipping = (afterDiscount === 0 || afterDiscount >= FREE_SHIPPING_THRESHOLD || state.fulfillMode === 'pickup') ? 0 : 79;
      return { subtotal, discount, promoLabel, shipping, total: afterDiscount + shipping };
    }

    function renderCart() {
      const container = document.getElementById('cart-items-container');
      const footer = document.getElementById('cart-footer');
      const { subtotal, discount, promoLabel, shipping, total } = calcCartTotals();

      const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
      const pct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      document.getElementById('shipping-progress-bar').style.width = pct + '%';
      document.getElementById('cart-shipping-msg').textContent = subtotal === 0
        ? 'Add shoes worth ₹1,499 for Free Delivery'
        : remaining === 0
          ? 'Unlocked Free Express Delivery!'
          : `Add ${formatINR(remaining)} more for Free Delivery`;

      if (!state.cart.length) {
        footer.classList.add('hidden');
        container.innerHTML = `
          <div class="text-center py-14 space-y-3">
            <div class="w-12 h-12 rounded-full bg-sand mx-auto flex items-center justify-center text-stone-500">👟</div>
            <p class="font-editorial text-lg font-semibold">Your shoe bag is empty</p>
            <p class="text-xs text-stone-500">Browse our EVA runners, sports trainers, and casual sneakers.</p>
          </div>
        `;
        return;
      }

      footer.classList.remove('hidden');
      container.innerHTML = state.cart.map((item, idx) => {
        const p = PRODUCTS.find(x => x.id === item.id);
        if (!p) return '';
        return `
          <div class="flex gap-3.5 bg-white p-3 rounded-2xl border border-stone-200/80">
            <img src="${p.image}" alt="${p.title}" class="w-20 h-20 rounded-xl object-cover shrink-0 bg-sand" />
            <div class="flex-1 min-w-0">
              <div class="flex items-start justify-between gap-2">
                <h4 class="font-semibold text-sm text-charcoal truncate">${p.title}</h4>
                <button type="button" data-cart-remove="${idx}" aria-label="Remove pair" class="text-stone-400 hover:text-coral text-xs">✕</button>
              </div>
              <p class="text-xs text-stone-500 mt-0.5">${item.size} • ${item.color}</p>
              <div class="flex items-center justify-between mt-2.5">
                <span class="font-bold text-sm">${formatINR(p.price * item.qty)}</span>
                <div class="inline-flex items-center border border-stone-300 rounded-full bg-cream">
                  <button type="button" data-cart-dec="${idx}" class="w-7 h-7 text-xs font-bold hover:text-coral">−</button>
                  <span class="px-2 text-xs font-semibold">${item.qty}</span>
                  <button type="button" data-cart-inc="${idx}" class="w-7 h-7 text-xs font-bold hover:text-coral">+</button>
                </div>
              </div>
            </div>
          </div>
        `;
      }).join('');

      document.getElementById('cart-subtotal').textContent = formatINR(subtotal);
      const discRow = document.getElementById('cart-discount-row');
      if (discount > 0) {
        discRow.classList.remove('hidden');
        document.getElementById('cart-discount-label').textContent = promoLabel;
        document.getElementById('cart-discount-val').textContent = '-' + formatINR(discount);
      } else {
        discRow.classList.add('hidden');
      }
      document.getElementById('cart-shipping-val').textContent = shipping === 0 ? 'Free' : formatINR(shipping);
      document.getElementById('cart-total').textContent = formatINR(total);
      document.getElementById('chk-total').textContent = formatINR(total);
    }

    function addToCart(productId, size, color) {
      const p = PRODUCTS.find(x => x.id === productId);
      if (!p) return;
      const chosenSize = size || (state.sizeFilter !== 'All' && p.sizes.includes(state.sizeFilter) ? state.sizeFilter : p.sizes[1] || p.sizes[0]);
      const chosenColor = color || p.colors[0].name;
      const existing = state.cart.find(c => c.id === productId && c.size === chosenSize && c.color === chosenColor);
      if (existing) existing.qty += 1;
      else state.cart.push({ id: productId, size: chosenSize, color: chosenColor, qty: 1 });
      persistState();
      updateHeaderBadges();
      renderCart();
      showToast(`Added "${p.title}" (${chosenSize}) to bag`);
    }

    function openQuickView(productId) {
      const p = PRODUCTS.find(x => x.id === productId);
      if (!p) return;
      state.quickViewProduct = p;
      state.qvSize = (state.sizeFilter !== 'All' && p.sizes.includes(state.sizeFilter)) ? state.sizeFilter : (p.sizes[1] || p.sizes[0]);
      state.qvColor = p.colors[0].name;
      const disc = Math.round(((p.mrp - p.price) / p.mrp) * 100);
      document.getElementById('qv-img').src = p.image;
      document.getElementById('qv-img').alt = p.title;
      document.getElementById('qv-category').textContent = p.category;
      document.getElementById('qv-title').textContent = p.title;
      document.getElementById('qv-price').textContent = formatINR(p.price);
      document.getElementById('qv-mrp').textContent = formatINR(p.mrp);
      document.getElementById('qv-discount').textContent = `${disc}% OFF`;
      document.getElementById('qv-desc').textContent = p.desc;
      document.getElementById('qv-specs').innerHTML = `
        <div><strong>Sole:</strong> ${p.sole}</div>
        <div><strong>Upper:</strong> ${p.upper}</div>
        <div><strong>Weight:</strong> ${p.weight}</div>
      `;
      renderQuickViewOptions();
      document.getElementById('quick-view-modal').classList.remove('hidden');
    }

    function renderQuickViewOptions() {
      const p = state.quickViewProduct;
      if (!p) return;
      document.getElementById('qv-sizes').innerHTML = p.sizes.map(s => `
        <button type="button" data-qv-size="${s}" class="px-3.5 py-1.5 rounded-xl text-xs font-semibold border transition ${state.qvSize === s ? 'bg-charcoal text-white border-charcoal' : 'bg-white text-charcoal border-stone-300 hover:border-coral'}">${s}</button>
      `).join('');
      document.getElementById('qv-color-label').textContent = state.qvColor;
      document.getElementById('qv-colors').innerHTML = p.colors.map(c => `
        <button type="button" data-qv-color="${c.name}" title="${c.name}" class="w-7 h-7 rounded-full border-2 transition ${state.qvColor === c.name ? 'border-coral scale-110' : 'border-white shadow'}" style="background-color: ${c.hex}"></button>
      `).join('');
    }

    document.addEventListener('click', (e) => {
      const navCat = e.target.closest('[data-nav-cat]');
      if (navCat) {
        state.activeCategory = navCat.getAttribute('data-nav-cat');
        state.wishlistOnly = false;
        renderCategoryPills();
        renderCatalog();
        updateHeaderBadges();
        document.getElementById('mobile-menu').classList.add('hidden');
      }

      const catCard = e.target.closest('[data-cat-card]');
      if (catCard) {
        state.activeCategory = catCard.getAttribute('data-cat-card');
        state.wishlistOnly = false;
        renderCategoryPills();
        renderCatalog();
        updateHeaderBadges();
        document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
      }

      const pill = e.target.closest('[data-pill-cat]');
      if (pill) {
        state.activeCategory = pill.getAttribute('data-pill-cat');
        renderCategoryPills();
        renderCatalog();
      }

      const wishBtn = e.target.closest('[data-toggle-wish]');
      if (wishBtn) {
        const id = wishBtn.getAttribute('data-toggle-wish');
        if (state.wishlist.has(id)) {
          state.wishlist.delete(id);
          showToast('Removed from saved shoes');
        } else {
          state.wishlist.add(id);
          showToast('Saved to wishlist');
        }
        persistState();
        updateHeaderBadges();
        renderCatalog();
      }

      const quickAdd = e.target.closest('[data-quick-add]');
      if (quickAdd) addToCart(quickAdd.getAttribute('data-quick-add'));

      const quickView = e.target.closest('[data-quick-view]');
      if (quickView) openQuickView(quickView.getAttribute('data-quick-view'));

      const qvSize = e.target.closest('[data-qv-size]');
      if (qvSize) {
        state.qvSize = qvSize.getAttribute('data-qv-size');
        renderQuickViewOptions();
      }

      const qvColor = e.target.closest('[data-qv-color]');
      if (qvColor) {
        state.qvColor = qvColor.getAttribute('data-qv-color');
        renderQuickViewOptions();
      }

      const cartInc = e.target.closest('[data-cart-inc]');
      if (cartInc) {
        const idx = Number(cartInc.getAttribute('data-cart-inc'));
        if (state.cart[idx]) state.cart[idx].qty += 1;
        persistState();
        updateHeaderBadges();
        renderCart();
      }

      const cartDec = e.target.closest('[data-cart-dec]');
      if (cartDec) {
        const idx = Number(cartDec.getAttribute('data-cart-dec'));
        if (state.cart[idx]) {
          state.cart[idx].qty -= 1;
          if (state.cart[idx].qty <= 0) state.cart.splice(idx, 1);
        }
        persistState();
        updateHeaderBadges();
        renderCart();
      }

      const cartRem = e.target.closest('[data-cart-remove]');
      if (cartRem) {
        state.cart.splice(Number(cartRem.getAttribute('data-cart-remove')), 1);
        persistState();
        updateHeaderBadges();
        renderCart();
      }

      const fulfillBtn = e.target.closest('[data-fulfill]');
      if (fulfillBtn) {
        state.fulfillMode = fulfillBtn.getAttribute('data-fulfill');
        document.querySelectorAll('.fulfill-btn').forEach(b => {
          const isAct = b.getAttribute('data-fulfill') === state.fulfillMode;
          b.className = `fulfill-btn py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${isAct ? 'bg-white shadow-xs text-charcoal' : 'text-stone-600'}`;
        });
        const isPickup = state.fulfillMode === 'pickup';
        document.getElementById('pickup-note').classList.toggle('hidden', !isPickup);
        document.getElementById('address-group').classList.toggle('hidden', isPickup);
        document.getElementById('chk-address').required = !isPickup;
        renderCart();
      }
    });

    document.getElementById('mobile-menu-btn').addEventListener('click', () => {
      document.getElementById('mobile-menu').classList.toggle('hidden');
    });

    ['desktop-search', 'mobile-search'].forEach(id => {
      document.getElementById(id).addEventListener('input', (e) => {
        state.searchQuery = e.target.value;
        renderCatalog();
      });
    });

    document.getElementById('size-filter').addEventListener('change', (e) => {
      state.sizeFilter = e.target.value;
      renderCatalog();
    });

    document.getElementById('sort-select').addEventListener('change', (e) => {
      state.sortBy = e.target.value;
      renderCatalog();
    });

    document.getElementById('wishlist-filter-btn').addEventListener('click', () => {
      state.wishlistOnly = !state.wishlistOnly;
      updateHeaderBadges();
      renderCatalog();
      document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
    });

    function resetFilters() {
      state.activeCategory = 'All';
      state.sizeFilter = 'All';
      state.searchQuery = '';
      state.wishlistOnly = false;
      document.getElementById('size-filter').value = 'All';
      document.getElementById('desktop-search').value = '';
      document.getElementById('mobile-search').value = '';
      renderCategoryPills();
      updateHeaderBadges();
      renderCatalog();
    }

    document.getElementById('clear-filters-btn').addEventListener('click', resetFilters);
    document.getElementById('empty-reset-btn').addEventListener('click', resetFilters);

    document.getElementById('qv-close').addEventListener('click', () => document.getElementById('quick-view-modal').classList.add('hidden'));
    document.getElementById('qv-close-mobile').addEventListener('click', () => document.getElementById('quick-view-modal').classList.add('hidden'));
    document.getElementById('qv-add-btn').addEventListener('click', () => {
      if (state.quickViewProduct) {
        addToCart(state.quickViewProduct.id, state.qvSize, state.qvColor);
        document.getElementById('quick-view-modal').classList.add('hidden');
      }
    });

    document.getElementById('open-cart-btn').addEventListener('click', () => {
      renderCart();
      document.getElementById('cart-drawer').classList.remove('hidden');
    });
    document.getElementById('close-cart-btn').addEventListener('click', () => document.getElementById('cart-drawer').classList.add('hidden'));

    document.getElementById('promo-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const code = document.getElementById('promo-input').value.trim().toUpperCase();
      if (code === 'CORAL10') {
        state.promoCode = 'CORAL10';
        showToast('CORAL10 applied (10% off)');
      } else if (code === 'MATHURA15') {
        const sub = state.cart.reduce((s, i) => {
          const p = PRODUCTS.find(x => x.id === i.id);
          return s + (p ? p.price * i.qty : 0);
        }, 0);
        if (sub < 1999) {
          showToast('MATHURA15 requires ₹1,999+ subtotal');
          return;
        }
        state.promoCode = 'MATHURA15';
        showToast('MATHURA15 applied (15% off)');
      } else {
        showToast('Invalid code. Try CORAL10 or MATHURA15');
        return;
      }
      renderCart();
    });

    document.getElementById('proceed-checkout-btn').addEventListener('click', () => {
      document.getElementById('cart-drawer').classList.add('hidden');
      document.getElementById('checkout-form').classList.remove('hidden');
      document.getElementById('order-success').classList.add('hidden');
      renderCart();
      document.getElementById('checkout-modal').classList.remove('hidden');
    });

    document.getElementById('close-checkout-btn').addEventListener('click', () => document.getElementById('checkout-modal').classList.add('hidden'));

    document.getElementById('checkout-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('chk-name').value.trim();
      const { total } = calcCartTotals();
      const orderId = 'TCS-SH-' + Math.floor(10000 + Math.random() * 90000);
      const modeText = state.fulfillMode === 'pickup'
        ? 'ready for pickup at our Nawada Chauraha, Mathura store'
        : 'confirmed for doorstep delivery';
      document.getElementById('order-summary-msg').textContent = `Thank you, ${name}! Order ${orderId} (${formatINR(total)}) is ${modeText}.`;
      document.getElementById('checkout-form').classList.add('hidden');
      document.getElementById('order-success').classList.remove('hidden');
      state.cart = [];
      state.promoCode = null;
      persistState();
      updateHeaderBadges();
      renderCart();
    });

    document.getElementById('done-order-btn').addEventListener('click', () => {
      document.getElementById('checkout-modal').classList.add('hidden');
    });

    document.getElementById('newsletter-form').addEventListener('submit', (e) => {
      e.preventDefault();
      document.getElementById('newsletter-input').value = '';
      showToast('Welcome to Coral Sneaker Club! Use CORAL10 at checkout.');
    });

    renderCategoryPills();
    updateHeaderBadges();
    renderCatalog();
    renderCart();
