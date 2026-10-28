/**
 * AURA BOTANICA — Core Interactive Logic
 * Modern, responsive, micro-animated brand store engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------------------------------------------------------------------------
  // 1. PRODUCT CATALOG DATA
  // ---------------------------------------------------------------------------
  const products = [
    {
      id: 'aura-07',
      name: 'No. 07 Solitude Eau de Parfum',
      category: 'fragrance',
      price: 135,
      rating: '4.9',
      reviews: 428,
      badge: 'Bestseller',
      image: 'assets/images/hero.jpg',
      notes: 'Amber, Bergamot, Smoked Fluted Sandalwood & Wild Fig.',
      description: 'An evocative olfactory portrait of mist-veiled forests at dawn. Distilled in Grasse with wild-harvested botanicals and organic grain spirits.',
      ritual: 'Mist lightly across pulse points—collarbones, wrists, and nape. Allow the top citrus notes to unfold into deep smoked amber over 8 hours.',
      ingredients: 'Organic Cane Alcohol, Parfum (Natural Essential Oils), Citrus Aurantium Bergamia, Santalum Album (Sandalwood) Oil, Amber Resin Extract.'
    },
    {
      id: 'aurora-serum',
      name: 'Radiance Recovery Botanical Serum',
      category: 'skincare',
      price: 88,
      rating: '5.0',
      reviews: 312,
      badge: 'Award Winner',
      image: 'assets/images/serum.jpg',
      notes: 'Cold-pressed Rosehip, Squalane, Sea Buckthorn & CoQ10.',
      description: 'A nutrient-dense golden elixir engineered to reinforce the lipid barrier, replenish moisture reserves, and restore a luminous inner glow.',
      ritual: 'Warm 3 to 4 drops between palms. Press gently into damp cleansed face and neck morning and night before heavier moisturizers.',
      ingredients: 'Simmondsia Chinensis (Jojoba) Oil, Rosa Canina (Rosehip) Seed Oil, Olive Squalane, Hippophae Rhamnoides (Sea Buckthorn) Fruit Oil, Tocopherol.'
    },
    {
      id: 'boheme-candle',
      name: 'Bohème Artisanal Ceramic Candle',
      category: 'home',
      price: 64,
      rating: '4.8',
      reviews: 189,
      badge: 'Hand-Poured',
      image: 'assets/images/candle.jpg',
      notes: 'Charred Cedar, Crushed French Lavender, Birchwood & Honeyed Wax.',
      description: 'Hand-poured into matte wheel-thrown stoneware. Features a crackling natural FSC-certified cedar wood wick with 60 hours of clean burn time.',
      ritual: 'Trim wooden wick to 1/4 inch before each burn. Allow wax to melt fully to edge of vessel on initial lighting to prevent tunneling.',
      ingredients: '100% Non-GMO Soy & Coconut Wax, FSC Wood Wick, Therapeutic Grade Essential Oils, Clean Phthalate-Free Botanical Fragrance.'
    },
    {
      id: 'nocturne-mist',
      name: 'Nocturne Botanical Pillow & Room Mist',
      category: 'fragrance',
      price: 52,
      rating: '4.9',
      reviews: 142,
      badge: 'Evening Ritual',
      image: 'assets/images/hero.jpg',
      notes: 'Roman Chamomile, Wild Cypress, French Lavender & Vetiver.',
      description: 'A neuro-calming aromatherapy mist designed to quiet mind chatter and ease the transition into restorative deep sleep states.',
      ritual: 'Generously mist linens, curtains, and pillows 10 minutes prior to retiring. Inhale deeply through the diaphragm.',
      ingredients: 'Distilled Spring Water, Hamamelis Virginiana (Witch Hazel), Lavandula Angustifolia Oil, Anthemis Nobilis (Chamomile) Flower Oil, Vetiveria Zizanioides Root Oil.'
    },
    {
      id: 'velvet-balm',
      name: 'Wild Blue Tansy Nectar Balm',
      category: 'skincare',
      price: 74,
      rating: '4.9',
      reviews: 216,
      badge: 'Limited Batch',
      image: 'assets/images/serum.jpg',
      notes: 'Moroccan Blue Tansy, Cupuaçu Butter, Marula & Blue Chamomile.',
      description: 'A velvety azure melt that comforts stressed, hyper-reactive skin. Rich in chamazulene to rapidly soothe redness and deeply nourish.',
      ritual: 'Melt a pea-sized amount onto fingertips; it instantly transforms into a silky nectar oil. Gently massage over dry areas or chapped lips.',
      ingredients: 'Theobroma Grandiflorum (Cupuaçu) Butter, Sclerocarya Birrea (Marula) Seed Oil, Tanacetum Annuum (Blue Tansy) Essential Oil, Helichrysum Italicum Oil.'
    },
    {
      id: 'hinoki-incense',
      name: 'Temple Hinoki & Frankincense Cones',
      category: 'home',
      price: 42,
      rating: '4.7',
      reviews: 95,
      badge: 'Slow Living',
      image: 'assets/images/candle.jpg',
      notes: 'Japanese Hinoki Cypress, Oman Frankincense, Ground Myrrh.',
      description: 'Hand-pressed according to century-old meditative traditions without charcoal, toxic binders, or artificial fragrances. 30 cones per box.',
      ritual: 'Light tip until glowing red; gently blow out flame. Place on fireproof ceramic dish and allow sacred woody smoke to purify space.',
      ingredients: 'Ground Hinoki Wood Powder, Boswellia Carterii (Frankincense) Resin, Tabu-no-ki Bark, Organic Essential Essences.'
    }
  ];

  // ---------------------------------------------------------------------------
  // 2. WEB AUDIO API SYNTHESIZER (MICRO-FEEDBACK)
  // ---------------------------------------------------------------------------
  let audioCtx = null;
  function playTone(type = 'click') {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;
      if (type === 'add') {
        // Soft double chime (luxurious high tone)
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.12); // E5
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'success') {
        // Melodic triple chime
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.25);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
        osc.start(now);
        osc.stop(now + 0.45);
      } else {
        // Subtle crisp click
        osc.frequency.setValueAtTime(400, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch (e) {
      // Audio not permitted or supported; gracefully ignore
    }
  }

  // ---------------------------------------------------------------------------
  // 3. CART STATE MANAGEMENT
  // ---------------------------------------------------------------------------
  let cart = [
    {
      id: 'aura-07',
      name: 'No. 07 Solitude Eau de Parfum',
      price: 135,
      image: 'assets/images/hero.jpg',
      qty: 1
    }
  ];

  let appliedDiscount = 0; // percentage, e.g., 0.15 for 15%
  const FREE_SHIPPING_THRESHOLD = 150;

  const cartDrawerOverlay = document.getElementById('cartDrawerOverlay');
  const cartToggleBtn = document.getElementById('cartToggleBtn');
  const cartCloseBtn = document.getElementById('cartCloseBtn');
  const cartItemsList = document.getElementById('cartItemsList');
  const cartSubtotalEl = document.getElementById('cartSubtotal');
  const cartTotalEl = document.getElementById('cartTotal');
  const cartCountBadges = document.querySelectorAll('.cart-badge');
  const shippingFill = document.getElementById('shippingFill');
  const shippingLabel = document.getElementById('shippingLabel');
  const promoInput = document.getElementById('promoInput');
  const applyPromoBtn = document.getElementById('applyPromoBtn');

  function openCart() {
    cartDrawerOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawerOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  cartToggleBtn.addEventListener('click', () => {
    playTone('click');
    openCart();
  });

  cartCloseBtn.addEventListener('click', () => {
    playTone('click');
    closeCart();
  });

  cartDrawerOverlay.addEventListener('click', (e) => {
    if (e.target === cartDrawerOverlay) closeCart();
  });

  function updateCartUI() {
    const totalItems = cart.reduce((acc, item) => acc + item.qty, 0);
    cartCountBadges.forEach(badge => badge.textContent = totalItems);

    if (cart.length === 0) {
      cartItemsList.innerHTML = `
        <div class="cart-empty-state">
          <svg width="48" height="48" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <p style="font-weight: 600; margin-bottom: 6px;">Your ritual bag is empty</p>
          <p style="font-size: 0.8rem; color: var(--text-muted);">Explore our botanicals and fragrances to begin.</p>
        </div>
      `;
      cartSubtotalEl.textContent = '$0.00';
      cartTotalEl.textContent = '$0.00';
      shippingFill.style.width = '0%';
      shippingLabel.textContent = `Add $${FREE_SHIPPING_THRESHOLD} more for Free Worldwide Delivery`;
      return;
    }

    // Render items
    cartItemsList.innerHTML = cart.map(item => `
      <div class="cart-item" data-id="${item.id}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-img">
        <div>
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-price">$${item.price}</div>
          <div class="qty-control">
            <button class="qty-btn" data-action="dec" data-id="${item.id}">−</button>
            <span style="font-size: 0.85rem; font-weight: 600; min-width: 18px; text-align: center;">${item.qty}</span>
            <button class="qty-btn" data-action="inc" data-id="${item.id}">+</button>
          </div>
        </div>
        <button class="cart-item-remove" data-action="remove" data-id="${item.id}" title="Remove item">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
          </svg>
        </button>
      </div>
    `).join('');

    // Calculate totals
    const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    const discountAmount = subtotal * appliedDiscount;
    const finalTotal = Math.max(0, subtotal - discountAmount);

    cartSubtotalEl.textContent = `$${subtotal.toFixed(2)}`;
    cartTotalEl.textContent = `$${finalTotal.toFixed(2)}`;

    // Shipping progress
    if (subtotal >= FREE_SHIPPING_THRESHOLD) {
      shippingFill.style.width = '100%';
      shippingLabel.innerHTML = '✨ <strong>Complimentary Express Shipping</strong> Unlocked!';
    } else {
      const remaining = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(0);
      const percentage = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
      shippingFill.style.width = `${percentage}%`;
      shippingLabel.textContent = `Add $${remaining} more for Free Worldwide Delivery`;
    }
  }

  // Cart click delegations (qty + remove)
  cartItemsList.addEventListener('click', (e) => {
    const btn = e.target.closest('button');
    if (!btn) return;
    const id = btn.getAttribute('data-id');
    const action = btn.getAttribute('data-action');

    const item = cart.find(i => i.id === id);
    if (!item) return;

    if (action === 'inc') {
      item.qty += 1;
      playTone('click');
    } else if (action === 'dec') {
      if (item.qty > 1) {
        item.qty -= 1;
        playTone('click');
      } else {
        cart = cart.filter(i => i.id !== id);
        showToast('Item removed from bag');
        playTone('click');
      }
    } else if (action === 'remove') {
      cart = cart.filter(i => i.id !== id);
      showToast('Item removed from bag');
      playTone('click');
    }
    updateCartUI();
  });

  // Add to cart helper
  window.addToCart = function(productId, qty = 1) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(i => i.id === productId);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty: qty
      });
    }

    playTone('add');
    updateCartUI();
    showToast(`Added "${product.name}" to bag`);
    openCart();
  };

  // Promo code handler
  applyPromoBtn.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === 'AURA15') {
      appliedDiscount = 0.15;
      showToast('✦ Code "AURA15" applied: 15% discount!');
      playTone('success');
      promoInput.disabled = true;
      applyPromoBtn.textContent = 'Applied';
      applyPromoBtn.style.background = 'var(--accent-gold)';
      applyPromoBtn.style.color = '#fff';
      updateCartUI();
    } else {
      showToast('Invalid promo code. Try "AURA15"');
      playTone('click');
    }
  });

  // ---------------------------------------------------------------------------
  // 4. PRODUCT CATALOG RENDERING & FILTERING
  // ---------------------------------------------------------------------------
  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');

  function renderProducts(category = 'all') {
    const filtered = category === 'all' 
      ? products 
      : products.filter(p => p.category === category);

    productsGrid.innerHTML = filtered.map(p => `
      <article class="product-card" data-id="${p.id}">
        <div class="product-image-box">
          <span class="badge badge-gold product-badge-overlay">${p.badge}</span>
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <button class="quick-view-overlay-btn" onclick="openQuickView('${p.id}')">Quick Ritual View</button>
        </div>
        <div class="product-details">
          <div class="product-category-row">
            <span class="product-category">${p.category}</span>
            <div class="product-rating">
              <span class="star-icon">★</span>
              <span>${p.rating} (${p.reviews})</span>
            </div>
          </div>
          <h3 class="product-title">${p.name}</h3>
          <p class="product-notes">${p.notes}</p>
          <div class="product-footer">
            <span class="product-price">$${p.price}</span>
            <button class="add-to-cart-btn" onclick="addToCart('${p.id}')">
              <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
              </svg>
              Add to Bag
            </button>
          </div>
        </div>
      </article>
    `).join('');
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      playTone('click');
      renderProducts(cat);
    });
  });

  // ---------------------------------------------------------------------------
  // 5. QUICK VIEW MODAL
  // ---------------------------------------------------------------------------
  const quickViewModal = document.getElementById('quickViewModal');
  const qvCloseBtn = document.getElementById('qvCloseBtn');
  const qvImg = document.getElementById('qvImg');
  const qvBadge = document.getElementById('qvBadge');
  const qvCategory = document.getElementById('qvCategory');
  const qvTitle = document.getElementById('qvTitle');
  const qvPrice = document.getElementById('qvPrice');
  const qvDescription = document.getElementById('qvDescription');
  const qvTabContent = document.getElementById('qvTabContent');
  const qvTabs = document.querySelectorAll('.qv-tab-btn');
  const qvAddBtn = document.getElementById('qvAddBtn');

  let activeProductInModal = null;

  window.openQuickView = function(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    activeProductInModal = product;

    qvImg.src = product.image;
    qvImg.alt = product.name;
    qvBadge.textContent = product.badge;
    qvCategory.textContent = product.category;
    qvTitle.textContent = product.name;
    qvPrice.textContent = `$${product.price}`;
    qvDescription.textContent = product.description;

    // Reset tabs to Notes
    qvTabs.forEach(t => t.classList.remove('active'));
    qvTabs[0].classList.add('active');
    qvTabContent.innerHTML = `<strong>Scent Profile & Essences:</strong><br>${product.notes}`;

    playTone('click');
    quickViewModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  };

  function closeQuickView() {
    quickViewModal.classList.remove('open');
    document.body.style.overflow = '';
  }

  qvCloseBtn.addEventListener('click', closeQuickView);
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) closeQuickView();
  });

  qvTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      if (!activeProductInModal) return;
      qvTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabType = tab.getAttribute('data-tab');

      if (tabType === 'notes') {
        qvTabContent.innerHTML = `<strong>Scent Profile & Essences:</strong><br>${activeProductInModal.notes}`;
      } else if (tabType === 'ritual') {
        qvTabContent.innerHTML = `<strong>Recommended Ritual:</strong><br>${activeProductInModal.ritual}`;
      } else if (tabType === 'ingredients') {
        qvTabContent.innerHTML = `<strong>Full Formulation:</strong><br>${activeProductInModal.ingredients}`;
      }
      playTone('click');
    });
  });

  qvAddBtn.addEventListener('click', () => {
    if (!activeProductInModal) return;
    addToCart(activeProductInModal.id);
    closeQuickView();
  });

  // ---------------------------------------------------------------------------
  // 6. SCENT & RITUAL FINDER QUIZ
  // ---------------------------------------------------------------------------
  let quizAnswers = {
    vibe: null,
    ritual: null
  };

  const vibeOptions = document.querySelectorAll('.vibe-option');
  const ritualOptions = document.querySelectorAll('.ritual-option');
  const quizStep1 = document.getElementById('quizStep1');
  const quizStep2 = document.getElementById('quizStep2');
  const quizResultBox = document.getElementById('quizResultBox');
  const quizProgressBar = document.getElementById('quizProgressBar');
  const quizStepLabel = document.getElementById('quizStepLabel');
  const restartQuizBtn = document.getElementById('restartQuizBtn');

  vibeOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      vibeOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizAnswers.vibe = btn.getAttribute('data-val');
      playTone('click');

      // Proceed to Step 2
      setTimeout(() => {
        quizStep1.style.display = 'none';
        quizStep2.style.display = 'block';
        quizProgressBar.style.width = '100%';
        quizStepLabel.textContent = 'Step 2 of 2 — Desired Ritual';
      }, 250);
    });
  });

  ritualOptions.forEach(btn => {
    btn.addEventListener('click', () => {
      ritualOptions.forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizAnswers.ritual = btn.getAttribute('data-val');
      playTone('success');

      // Determine match
      calculateQuizResult();
    });
  });

  function calculateQuizResult() {
    quizStep2.style.display = 'none';
    quizStepLabel.textContent = 'Your Tailored Formulation Match';

    // Logic: Match answers to best suited item
    let matchedId = 'aura-07';
    if (quizAnswers.vibe === 'grounding' || quizAnswers.ritual === 'evening') {
      matchedId = quizAnswers.ritual === 'space' ? 'hinoki-incense' : 'boheme-candle';
    } else if (quizAnswers.vibe === 'glow' || quizAnswers.ritual === 'morning') {
      matchedId = 'aurora-serum';
    } else if (quizAnswers.vibe === 'calm') {
      matchedId = 'nocturne-mist';
    }

    const matched = products.find(p => p.id === matchedId) || products[0];

    const resultImg = document.getElementById('quizMatchImg');
    const resultTitle = document.getElementById('quizMatchTitle');
    const resultDesc = document.getElementById('quizMatchDesc');
    const resultAddBtn = document.getElementById('quizMatchAddBtn');

    resultImg.src = matched.image;
    resultImg.alt = matched.name;
    resultTitle.textContent = matched.name;
    resultDesc.textContent = `${matched.notes} Perfectly aligns with your preference for ${quizAnswers.vibe || 'natural'} energy and ${quizAnswers.ritual || 'daily'} sacred practices.`;

    resultAddBtn.onclick = () => {
      addToCart(matched.id);
    };

    quizResultBox.classList.add('show');
  }

  restartQuizBtn.addEventListener('click', () => {
    quizAnswers = { vibe: null, ritual: null };
    vibeOptions.forEach(b => b.classList.remove('selected'));
    ritualOptions.forEach(b => b.classList.remove('selected'));
    quizResultBox.classList.remove('show');
    quizStep2.style.display = 'none';
    quizStep1.style.display = 'block';
    quizProgressBar.style.width = '50%';
    quizStepLabel.textContent = 'Step 1 of 2 — Chosen Energy';
    playTone('click');
  });

  // ---------------------------------------------------------------------------
  // 7. CHECKOUT & ORDER CONFIRMATION SIMULATOR
  // ---------------------------------------------------------------------------
  const checkoutBtn = document.getElementById('checkoutBtn');
  const checkoutModal = document.getElementById('checkoutModal');
  const checkoutModalClose = document.getElementById('checkoutModalClose');
  const checkoutOrderId = document.getElementById('checkoutOrderId');

  checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      showToast('Your bag is empty! Add an item before checking out.');
      return;
    }
    closeCart();
    playTone('success');

    // Generate random order ID
    const randomId = 'AUR-' + Math.floor(100000 + Math.random() * 900000);
    checkoutOrderId.textContent = randomId;

    // Clear cart
    cart = [];
    appliedDiscount = 0;
    updateCartUI();

    checkoutModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });

  checkoutModalClose.addEventListener('click', () => {
    checkoutModal.classList.remove('open');
    document.body.style.overflow = '';
  });

  checkoutModal.addEventListener('click', (e) => {
    if (e.target === checkoutModal) {
      checkoutModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  // ---------------------------------------------------------------------------
  // 8. THEME TOGGLE (LIGHT & DARK MODE)
  // ---------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  const savedTheme = localStorage.getItem('aura-theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('aura-theme', next);
    updateThemeIcon(next);
    playTone('click');
    showToast(`Switched to ${next === 'dark' ? 'Obsidian Night' : 'Alabaster Light'} mode`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.innerHTML = `
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      `;
    } else {
      themeIcon.innerHTML = `
        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      `;
    }
  }

  // ---------------------------------------------------------------------------
  // 9. NAVBAR SCROLL EFFECT & MOBILE MENU
  // ---------------------------------------------------------------------------
  const header = document.querySelector('.site-header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    playTone('click');
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });

  // ---------------------------------------------------------------------------
  // 10. NEWSLETTER & TOAST SYSTEM
  // ---------------------------------------------------------------------------
  const newsletterForm = document.getElementById('newsletterForm');
  const toastContainer = document.getElementById('toastContainer');

  newsletterForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('newsletterEmail').value;
    if (email) {
      playTone('success');
      showToast('✦ Welcome to the Circle! Use code AURA15 for 15% off.');
      newsletterForm.reset();
    }
  });

  function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="var(--accent-gold)">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
      <span>${message}</span>
    `;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3800);
  }

  // Initial setup
  renderProducts('all');
  updateCartUI();
});
