/**
 * ============================================================================
 * VAULT // X — QUANTUM WEALTH & EXPENSE OS
 * Complete Client-side Logic: WebAudio Sound Engine, 3D Card Physics,
 * Bento Analytics, Time Machine Compound Interest Simulator, Dream Vault &
 * Dynamic Canvas Visualizers.
 * ============================================================================
 */

(function () {
  'use strict';

  // --------------------------------------------------------------------------
  // 01 // PROCEDURAL WEBAUDIO SOUND ENGINE (Zero External Audio Assets)
  // --------------------------------------------------------------------------
  class VaultAudioEngine {
    constructor() {
      this.ctx = null;
      this.isMuted = false;
    }

    init() {
      if (this.ctx) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    toggleMute() {
      this.isMuted = !this.isMuted;
      return this.isMuted;
    }

    // Cha-ching cash register effect
    playChaChing() {
      if (this.isMuted) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      // High chime 1
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(1318.5, t); // E6
      osc1.frequency.setValueAtTime(1760, t + 0.08); // A6
      gain1.gain.setValueAtTime(0.25, t);
      gain1.gain.exponentialRampToValueAtTime(0.001, t + 0.45);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(t);
      osc1.stop(t + 0.46);

      // Shimmer metallic sound
      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(2637, t + 0.08); // E7
      gain2.gain.setValueAtTime(0.18, t + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, t + 0.6);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(t + 0.08);
      osc2.stop(t + 0.61);
    }

    // Crisp coin clink
    playCoin() {
      if (this.isMuted) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2093, t); // C7
      osc.frequency.setValueAtTime(2793, t + 0.05); // F7

      gain.gain.setValueAtTime(0.2, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.31);
    }

    // Card Swipe / Tab Click
    playClick() {
      if (this.isMuted) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(800, t);
      osc.frequency.exponentialRampToValueAtTime(1200, t + 0.04);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.06);
    }

    // Success / Goal unlocked fanfare
    playFanfare() {
      if (this.isMuted) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      const chord = [523.25, 659.25, 783.99, 1046.5]; // C Major
      const now = this.ctx.currentTime;

      chord.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const t = now + idx * 0.07;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t);

        gain.gain.setValueAtTime(0.18, t);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(t);
        osc.stop(t + 0.52);
      });
    }

    // Danger / Delete buzz
    playDelete() {
      if (this.isMuted) return;
      this.init();
      this.resume();
      if (!this.ctx) return;

      const t = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, t);
      osc.frequency.exponentialRampToValueAtTime(110, t + 0.12);

      gain.gain.setValueAtTime(0.15, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(t);
      osc.stop(t + 0.15);
    }
  }

  const audio = new VaultAudioEngine();

  // --------------------------------------------------------------------------
  // 02 // DATA ENGINE & LOCAL STORAGE REPOSITORY
  // --------------------------------------------------------------------------
  const STORAGE_KEY_TX = 'vaultx_transactions_v1';
  const STORAGE_KEY_GOALS = 'vaultx_goals_v1';

  // Realistic starter seed data tailored for a 17-year-old
  const DEFAULT_TRANSACTIONS = [
    { id: 'tx-1', desc: 'Projeto Freelance: Landing Page Web', category: 'Salário/Mesada', type: 'income', amount: 1200.00, date: '2026-10-20', method: 'PIX' },
    { id: 'tx-2', desc: 'Mesada / Ajuda de Custo Quinzenal', category: 'Salário/Mesada', type: 'income', amount: 400.00, date: '2026-10-18', method: 'PIX' },
    { id: 'tx-3', desc: 'Venda de Skin CS2 / Valorant', category: 'Investimentos', type: 'income', amount: 350.00, date: '2026-10-14', method: 'PIX' },
    { id: 'tx-4', desc: 'Hamburgueria Artesanal com os amigos', category: 'Lanches/Rolê', type: 'expense', amount: 85.00, date: '2026-10-21', method: 'PIX' },
    { id: 'tx-5', desc: 'Steam Sale: 2 Jogos na Promoção', category: 'Games/Skins', type: 'expense', amount: 140.00, date: '2026-10-19', method: 'Cartão de Débito' },
    { id: 'tx-6', desc: 'Spotify Premium Família', category: 'Assinaturas', type: 'expense', amount: 24.00, date: '2026-10-15', method: 'Cartão de Crédito' },
    { id: 'tx-7', desc: 'Curso de Python & WebDev Fullstack', category: 'Estudos/Tech', type: 'expense', amount: 110.00, date: '2026-10-12', method: 'PIX' },
    { id: 'tx-8', desc: 'Tênis Sneaker Streetwear', category: 'Moda/Estilo', type: 'expense', amount: 290.00, date: '2026-10-09', method: 'Cartão de Crédito' },
    { id: 'tx-9', desc: 'Uber volta da festa sábado', category: 'Transporte', type: 'expense', amount: 42.00, date: '2026-10-08', method: 'PIX' },
    { id: 'tx-10', desc: 'Açaí pós-treino / academia', category: 'Lanches/Rolê', type: 'expense', amount: 26.00, date: '2026-10-06', method: 'Dinheiro Físico' },
    { id: 'tx-11', desc: 'Aporte CDB 110% CDI (Reserva)', category: 'Investimentos', type: 'expense', amount: 103.00, date: '2026-10-04', method: 'PIX' }
  ];

  const DEFAULT_GOALS = [
    { id: '1', name: 'Setup Gamer / Placa de Vídeo RTX', target: 4500, current: 3600, emoji: '🎮' },
    { id: '2', name: 'Viagem de Fim de Ano com a Galera', target: 1800, current: 1050, emoji: '✈️' },
    { id: '3', name: 'Reserva de Emergência Blindada', target: 1500, current: 1500, emoji: '🛡️' }
  ];

  let transactions = [];
  let goals = [];
  let currentCurrency = 'BRL'; // BRL, USD, EUR
  const currencySymbols = { BRL: 'R$ ', USD: '$ ', EUR: '€ ' };
  const currencyRates = { BRL: 1.0, USD: 0.18, EUR: 0.16 };

  function loadData() {
    try {
      const storedTx = localStorage.getItem(STORAGE_KEY_TX);
      transactions = storedTx ? JSON.parse(storedTx) : [...DEFAULT_TRANSACTIONS];

      const storedGoals = localStorage.getItem(STORAGE_KEY_GOALS);
      goals = storedGoals ? JSON.parse(storedGoals) : [...DEFAULT_GOALS];
    } catch (e) {
      console.warn('LocalStorage error, falling back to defaults:', e);
      transactions = [...DEFAULT_TRANSACTIONS];
      goals = [...DEFAULT_GOALS];
    }
  }

  function saveData() {
    try {
      localStorage.setItem(STORAGE_KEY_TX, JSON.stringify(transactions));
      localStorage.setItem(STORAGE_KEY_GOALS, JSON.stringify(goals));
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  }

  function formatMoney(amountBRL) {
    const rate = currencyRates[currentCurrency] || 1.0;
    const converted = amountBRL * rate;
    const symbol = currencySymbols[currentCurrency] || 'R$ ';

    if (currentCurrency === 'BRL') {
      return symbol + converted.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }
    return symbol + converted.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  // --------------------------------------------------------------------------
  // 03 // 3D VIRTUAL CARD PHYSICS & PARALLAX
  // --------------------------------------------------------------------------
  function initVirtualCard() {
    const card = document.getElementById('virtualCard');
    const glare = card ? card.querySelector('.card-glare') : null;
    const skinBtns = document.querySelectorAll('.skin-btn');
    const revealBtn = document.getElementById('revealCardBtn');
    const digitsDisplay = document.getElementById('cardDigitsDisplay');
    let isRevealed = false;

    if (card) {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;

        const rotX = -((y - cy) / cy) * 14;
        const rotY = ((x - cx) / cx) * 14;

        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.02, 1.02, 1.02)`;

        if (glare) {
          glare.style.left = `${(x / rect.width) * 100 - 50}%`;
          glare.style.top = `${(y / rect.height) * 100 - 50}%`;
        }
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    }

    // Skin Selector
    skinBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        skinBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const skin = btn.dataset.skin;

        card.className = `virtual-card skin-${skin}`;
        audio.playClick();
      });
    });

    // Reveal card digits
    if (revealBtn && digitsDisplay) {
      revealBtn.addEventListener('click', () => {
        isRevealed = !isRevealed;
        digitsDisplay.textContent = isRevealed ? '4532 8901 2341 8839' : '•••• 8839';
        audio.playCoin();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 04 // AMBIENT CANVAS (Glowing particles & currency waves)
  // --------------------------------------------------------------------------
  function initAmbientCanvas() {
    const canvas = document.getElementById('ambientCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const count = 45;

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -0.3 - Math.random() * 0.5,
        radius: 1.5 + Math.random() * 2.5,
        color: Math.random() > 0.4 ? 'rgba(0, 255, 136, ' : 'rgba(0, 229, 255, ',
        alpha: 0.1 + Math.random() * 0.4
      });
    }

    function renderAmbient() {
      requestAnimationFrame(renderAmbient);
      ctx.clearRect(0, 0, width, height);

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color + p.alpha + ')';
        ctx.shadowBlur = 10;
        ctx.shadowColor = p.color + '0.8)';
        ctx.fill();
        ctx.shadowBlur = 0;
      });
    }

    renderAmbient();
  }

  // --------------------------------------------------------------------------
  // 05 // METRICS & HEALTH SCORE COMPUTATION
  // --------------------------------------------------------------------------
  function updateDashboardMetrics() {
    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'income') totalIncome += t.amount;
      else if (t.type === 'expense') totalExpense += t.amount;
    });

    const totalBalance = totalIncome - totalExpense;
    const savingsRate = totalIncome > 0 ? Math.round(((totalIncome - totalExpense) / totalIncome) * 100) : 0;
    const clampedRate = Math.max(0, savingsRate);

    // Update DOM
    const cardBalEl = document.getElementById('cardBalanceDisplay');
    const totalBalEl = document.getElementById('totalBalanceVal');
    const totalIncEl = document.getElementById('totalIncomeVal');
    const totalExpEl = document.getElementById('totalExpenseVal');
    const savingsRateEl = document.getElementById('savingsRateVal');
    const runwayDaysEl = document.getElementById('runwayDaysVal');
    const budgetUsageBar = document.getElementById('budgetUsageBar');
    const budgetUsageText = document.getElementById('budgetUsageText');

    if (cardBalEl) cardBalEl.textContent = formatMoney(totalBalance);
    if (totalBalEl) totalBalEl.textContent = formatMoney(totalBalance);
    if (totalIncEl) totalIncEl.textContent = formatMoney(totalIncome);
    if (totalExpEl) totalExpEl.textContent = formatMoney(totalExpense);
    if (savingsRateEl) savingsRateEl.textContent = `${clampedRate}%`;

    // Runway: based on 30-day average daily expense
    const dailyExpense = (totalExpense / 30) || 1;
    const runwayDays = Math.max(0, Math.round(totalBalance / dailyExpense));
    if (runwayDaysEl) runwayDaysEl.textContent = `${runwayDays} Dias`;

    // Budget Usage (assuming budget target = 70% of total income)
    const budgetTarget = Math.max(1, totalIncome * 0.7);
    const budgetPercent = Math.min(100, Math.round((totalExpense / budgetTarget) * 100));
    if (budgetUsageBar) budgetUsageBar.style.width = `${budgetPercent}%`;
    if (budgetUsageText) budgetUsageText.textContent = `${budgetPercent}% do limite mensal utilizado`;

    // Health Score calculation (0 - 100)
    let score = 50;
    if (clampedRate >= 40) score += 35;
    else if (clampedRate >= 20) score += 20;
    else if (clampedRate >= 10) score += 10;
    else score -= 15;

    if (totalBalance > 1000) score += 15;
    if (budgetPercent <= 60) score += 10;

    score = Math.max(15, Math.min(99, score));

    const scoreNumEl = document.getElementById('healthScoreNum');
    const scoreCircleFill = document.getElementById('scoreCircleFill');
    const healthStatusEl = document.getElementById('healthStatusText');

    if (scoreNumEl) scoreNumEl.textContent = score;
    if (scoreCircleFill) scoreCircleFill.setAttribute('stroke-dasharray', `${score}, 100`);

    if (healthStatusEl) {
      if (score >= 80) healthStatusEl.textContent = 'DOMINANDO O JOGO 🔥';
      else if (score >= 60) healthStatusEl.textContent = 'ESTÁVEL & EVOLUINDO 📈';
      else healthStatusEl.textContent = 'ALERTA DE SOBREVIVÊNCIA ⚠️';
    }

    renderCategoryChart();
    renderCashflowWave();
  }

  // --------------------------------------------------------------------------
  // 06 // CATEGORY DOUGHNUT CHART
  // --------------------------------------------------------------------------
  const categoryColors = {
    'Lanches/Rolê': '#ff3b68',
    'Games/Skins': '#00e5ff',
    'Assinaturas': '#ffd000',
    'Moda/Estilo': '#b026ff',
    'Estudos/Tech': '#00ff88',
    'Transporte': '#ff9d00',
    'Investimentos': '#38bdf8',
    'Salário/Mesada': '#22c55e',
    'Outros': '#94a3b8'
  };

  function renderCategoryChart() {
    const canvas = document.getElementById('categoryChartCanvas');
    const legendList = document.getElementById('categoryLegendList');
    const centerTotal = document.getElementById('chartCenterTotal');
    const topBadge = document.getElementById('topCategoryBadge');
    if (!canvas || !legendList) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Sum by category for expenses
    const categoryTotals = {};
    let totalExpense = 0;

    transactions.forEach(t => {
      if (t.type === 'expense') {
        categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
        totalExpense += t.amount;
      }
    });

    if (centerTotal) centerTotal.textContent = formatMoney(totalExpense);

    const categories = Object.keys(categoryTotals);
    if (categories.length === 0 || totalExpense === 0) {
      legendList.innerHTML = '<div style="color:var(--text-sub); font-size:0.8rem;">Nenhum gasto registrado ainda.</div>';
      return;
    }

    // Sort categories descending
    categories.sort((a, b) => categoryTotals[b] - categoryTotals[a]);

    // Top Category Badge
    const topCat = categories[0];
    const topPct = Math.round((categoryTotals[topCat] / totalExpense) * 100);
    if (topBadge) topBadge.textContent = `MAIOR GASTO: ${topCat.toUpperCase()} (${topPct}%)`;

    // Draw Doughnut
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;
    const outerRadius = 88;
    const innerRadius = 60;
    let startAngle = -Math.PI / 2;

    legendList.innerHTML = '';

    categories.forEach((cat) => {
      const amount = categoryTotals[cat];
      const sliceAngle = (amount / totalExpense) * (Math.PI * 2);
      const color = categoryColors[cat] || '#00ff88';

      ctx.beginPath();
      ctx.arc(cx, cy, outerRadius, startAngle, startAngle + sliceAngle);
      ctx.arc(cx, cy, innerRadius, startAngle + sliceAngle, startAngle, true);
      ctx.closePath();

      ctx.fillStyle = color;
      ctx.shadowBlur = 10;
      ctx.shadowColor = color;
      ctx.fill();
      ctx.shadowBlur = 0;

      startAngle += sliceAngle;

      // Legend Item
      const pct = Math.round((amount / totalExpense) * 100);
      const item = document.createElement('div');
      item.className = 'legend-item';
      item.innerHTML = `
        <div class="legend-label-group">
          <span class="legend-color-dot" style="background:${color}; box-shadow:0 0 8px ${color}"></span>
          <span>${cat}</span>
        </div>
        <div>
          <span style="font-family:var(--font-mono); margin-right:8px; color:var(--text-muted);">${formatMoney(amount)}</span>
          <span class="legend-pct">${pct}%</span>
        </div>
      `;
      legendList.appendChild(item);
    });
  }

  // --------------------------------------------------------------------------
  // 07 // CASHFLOW WAVE GRAPH (ENTRADAS VS GASTOS)
  // --------------------------------------------------------------------------
  function renderCashflowWave() {
    const canvas = document.getElementById('cashflowCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    // 7 points timeline representation
    const incomePoints = [400, 600, 500, 1200, 800, 1500, 1950];
    const expensePoints = [200, 450, 320, 680, 550, 720, 820];

    const maxVal = Math.max(...incomePoints, ...expensePoints, 2000);

    function drawWave(points, strokeColor, fillColor) {
      const step = width / (points.length - 1);
      const coords = points.map((p, i) => ({
        x: i * step,
        y: height - (p / maxVal) * (height - 40) - 20
      }));

      ctx.beginPath();
      ctx.moveTo(coords[0].x, coords[0].y);

      for (let i = 0; i < coords.length - 1; i++) {
        const xc = (coords[i].x + coords[i + 1].x) / 2;
        const yc = (coords[i].y + coords[i + 1].y) / 2;
        ctx.quadraticCurveTo(coords[i].x, coords[i].y, xc, yc);
      }
      ctx.lineTo(coords[coords.length - 1].x, coords[coords.length - 1].y);

      // Line Stroke
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 3;
      ctx.shadowBlur = 12;
      ctx.shadowColor = strokeColor;
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Gradient Fill
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.closePath();
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, fillColor);
      grad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = grad;
      ctx.fill();

      // Glowing dots
      coords.forEach(pt => {
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 4, 0, Math.PI * 2);
        ctx.fillStyle = strokeColor;
        ctx.fill();
        ctx.beginPath();
        ctx.arc(pt.x, pt.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#fff';
        ctx.fill();
      });
    }

    // Draw Expense wave first, then Income on top
    drawWave(expensePoints, '#ff3b68', 'rgba(255, 59, 104, 0.25)');
    drawWave(incomePoints, '#00ff88', 'rgba(0, 255, 136, 0.25)');
  }

  // --------------------------------------------------------------------------
  // 08 // TIME MACHINE: COMPOUND INTEREST SIMULATOR (17 TO 30 YEARS OLD)
  // --------------------------------------------------------------------------
  function initTimeMachine() {
    const monthlySlider = document.getElementById('tmMonthlySlider');
    const yearsSlider = document.getElementById('tmYearsSlider');
    const rateSlider = document.getElementById('tmRateSlider');

    const monthlyDisplay = document.getElementById('tmMonthlyDisplay');
    const yearsDisplay = document.getElementById('tmYearsDisplay');
    const rateDisplay = document.getElementById('tmRateDisplay');

    const totalAccumEl = document.getElementById('tmTotalAccumulated');
    const totalInvestedEl = document.getElementById('tmTotalInvested');
    const totalInterestEl = document.getElementById('tmTotalInterest');

    function calculateCompound() {
      const p = parseFloat(monthlySlider.value);
      const years = parseInt(yearsSlider.value, 10);
      const annualRate = parseFloat(rateSlider.value) / 100;
      const months = years * 12;
      const monthlyRate = annualRate / 12;

      // Future value of regular monthly deposits
      const futureValue = p * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
      const totalInvested = p * months;
      const totalInterest = Math.max(0, futureValue - totalInvested);

      if (monthlyDisplay) monthlyDisplay.textContent = formatMoney(p) + ' / mês';
      if (yearsDisplay) {
        const finalAge = 17 + years;
        yearsDisplay.textContent = `${years} Anos (Aos ${finalAge} Anos)`;
      }
      if (rateDisplay) rateDisplay.textContent = `${(annualRate * 100).toFixed(1)}% ao ano`;

      if (totalAccumEl) totalAccumEl.textContent = formatMoney(futureValue);
      if (totalInvestedEl) totalInvestedEl.textContent = formatMoney(totalInvested);
      if (totalInterestEl) totalInterestEl.textContent = formatMoney(totalInterest);

      // Milestone Badges Unlocking
      const milestones = [
        { el: document.querySelector('.m-pill:nth-child(1)'), threshold: 6000 },
        { el: document.querySelector('.m-pill:nth-child(2)'), threshold: 12000 },
        { el: document.querySelector('.m-pill:nth-child(3)'), threshold: 20000 },
        { el: document.querySelector('.m-pill:nth-child(4)'), threshold: 100000 }
      ];

      milestones.forEach(m => {
        if (!m.el) return;
        if (futureValue >= m.threshold) {
          m.el.className = 'm-pill unlocked';
        } else {
          m.el.className = 'm-pill locked';
        }
      });
    }

    [monthlySlider, yearsSlider, rateSlider].forEach(slider => {
      if (slider) {
        slider.addEventListener('input', () => {
          calculateCompound();
          audio.playClick();
        });
      }
    });

    calculateCompound();
  }

  // --------------------------------------------------------------------------
  // 09 // GHOST EXPENSE SCANNER
  // --------------------------------------------------------------------------
  function initGhostScanner() {
    const checkboxes = document.querySelectorAll('#ghostChecklist input[type="checkbox"]');
    const ghostTotalYear = document.getElementById('ghostTotalYear');
    const ghostBadge = document.getElementById('ghostLeakBadge');
    const optimizeBtn = document.getElementById('optimizeGhostBtn');

    function updateGhostTotals() {
      let monthlyLeak = 0;
      checkboxes.forEach(cb => {
        if (cb.checked) {
          monthlyLeak += parseFloat(cb.dataset.cost || 0);
        }
      });

      const yearlyLeak = monthlyLeak * 12;
      if (ghostTotalYear) ghostTotalYear.textContent = formatMoney(yearlyLeak) + ' por ano';
      if (ghostBadge) ghostBadge.textContent = `${formatMoney(yearlyLeak).trim()} / ANO EM MICRO-GASTOS`;
    }

    checkboxes.forEach(cb => {
      cb.addEventListener('change', () => {
        updateGhostTotals();
        audio.playCoin();
      });
    });

    if (optimizeBtn) {
      optimizeBtn.addEventListener('click', () => {
        let monthlyLeak = 0;
        checkboxes.forEach(cb => {
          if (cb.checked) monthlyLeak += parseFloat(cb.dataset.cost || 0);
        });

        // Set monthly deposit in the Time Machine to this saved amount!
        const tmMonthlySlider = document.getElementById('tmMonthlySlider');
        if (tmMonthlySlider) {
          tmMonthlySlider.value = Math.max(30, Math.min(1500, Math.round(monthlyLeak)));
          tmMonthlySlider.dispatchEvent(new Event('input'));
        }

        const tmSection = document.querySelector('.time-machine-section');
        if (tmSection) {
          tmSection.scrollIntoView({ behavior: 'smooth' });
        }
        audio.playFanfare();
      });
    }

    updateGhostTotals();
  }

  // --------------------------------------------------------------------------
  // 10 // DREAM VAULT GOALS TRACKER
  // --------------------------------------------------------------------------
  function renderGoals() {
    const goalsList = document.getElementById('goalsList');
    if (!goalsList) return;
    goalsList.innerHTML = '';

    goals.forEach(goal => {
      const pct = Math.min(100, Math.round((goal.current / goal.target) * 100));
      const isDone = pct >= 100;
      const card = document.createElement('div');
      card.className = `goal-card ${isDone ? 'completed' : ''}`;
      card.dataset.goalId = goal.id;

      card.innerHTML = `
        <div class="goal-header">
          <div class="goal-icon">${goal.emoji}</div>
          <div class="goal-details">
            <h4 class="goal-name">${goal.name}</h4>
            <span class="goal-deadline">Meta: ${formatMoney(goal.target)} &bull; ${isDone ? 'Concluída!' : 'Faltam ' + formatMoney(goal.target - goal.current)}</span>
          </div>
          <div class="goal-pct">${pct}%</div>
        </div>
        <div class="goal-progress-track">
          <div class="goal-progress-bar" style="width: ${pct}%;"></div>
        </div>
        <div class="goal-action-row">
          <span class="goal-cur ${isDone ? 'text-emerald' : ''}">${formatMoney(goal.current)} guardados ${isDone ? '✨' : ''}</span>
          ${isDone ? '<span class="badge-done">DESBLOQUEADO</span>' : `<button class="deposit-mini-btn" data-goal="${goal.id}">+ Guardar R$ 50</button>`}
        </div>
      `;
      goalsList.appendChild(card);
    });

    // Attach deposit button listeners
    document.querySelectorAll('.deposit-mini-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const goalId = e.target.dataset.goal;
        const g = goals.find(item => item.id === goalId);
        if (g) {
          g.current += 50;
          if (g.current >= g.target) {
            audio.playFanfare();
          } else {
            audio.playChaChing();
          }
          saveData();
          renderGoals();
        }
      });
    });
  }

  // --------------------------------------------------------------------------
  // 11 // TRANSACTION LEDGER TABLE & SEARCH
  // --------------------------------------------------------------------------
  let currentFilter = 'all'; // all, income, expense
  let searchQuery = '';

  function renderTransactionTable() {
    const tbody = document.getElementById('transactionTableBody');
    if (!tbody) return;
    tbody.innerHTML = '';

    let filtered = transactions.filter(t => {
      if (currentFilter === 'income' && t.type !== 'income') return false;
      if (currentFilter === 'expense' && t.type !== 'expense') return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        return t.desc.toLowerCase().includes(q) || t.category.toLowerCase().includes(q);
      }
      return true;
    });

    if (filtered.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2rem; color:var(--text-sub);">
            Nenhum lançamento encontrado para os filtros atuais.
          </td>
        </tr>
      `;
      return;
    }

    filtered.forEach(t => {
      const tr = document.createElement('tr');
      const isIncome = t.type === 'income';

      tr.innerHTML = `
        <td><span class="tx-status-dot ${isIncome ? 'income' : 'expense'}"></span></td>
        <td class="tx-desc-cell">${t.desc}</td>
        <td><span class="tx-tag">${t.category}</span></td>
        <td style="font-family:var(--font-mono); font-size:0.75rem;">${t.date}</td>
        <td>${t.method || 'PIX'}</td>
        <td class="text-right ${isIncome ? 'tx-val-income' : 'tx-val-expense'}">
          ${isIncome ? '+' : '-'}${formatMoney(t.amount)}
        </td>
        <td class="text-right">
          <button class="tx-del-btn" data-del="${t.id}" title="Excluir Lançamento">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </td>
      `;
      tbody.appendChild(tr);
    });

    // Delete handlers
    tbody.querySelectorAll('.tx-del-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.del;
        transactions = transactions.filter(item => item.id !== id);
        saveData();
        audio.playDelete();
        updateDashboardMetrics();
        renderTransactionTable();
      });
    });
  }

  // --------------------------------------------------------------------------
  // 12 // MODAL HANDLERS & FORM SUBMISSIONS
  // --------------------------------------------------------------------------
  function initModals() {
    const addTxModal = document.getElementById('addTxModal');
    const openAddBtn = document.getElementById('openAddModalBtn');
    const closeAddBtn = document.getElementById('closeAddModalBtn');
    const addTxForm = document.getElementById('addTxForm');

    const addGoalModal = document.getElementById('addGoalModal');
    const newGoalBtn = document.getElementById('newGoalBtn');
    const closeGoalBtn = document.getElementById('closeGoalModalBtn');
    const addGoalForm = document.getElementById('addGoalForm');

    // Set today's date in Tx datepicker
    const dateInput = document.getElementById('txDate');
    if (dateInput) {
      dateInput.value = new Date().toISOString().split('T')[0];
    }

    // Open & Close Transaction Modal
    function openTxModal() {
      if (addTxModal) addTxModal.classList.add('open');
      audio.playClick();
      const descInput = document.getElementById('txDesc');
      if (descInput) setTimeout(() => descInput.focus(), 100);
    }

    function closeTxModal() {
      if (addTxModal) addTxModal.classList.remove('open');
    }

    if (openAddBtn) openAddBtn.addEventListener('click', openTxModal);
    if (closeAddBtn) closeAddBtn.addEventListener('click', closeTxModal);

    // Keyboard shortcut 'N' for New Transaction
    window.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
      if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        openTxModal();
      }
    });

    // Transaction Type Radio Toggle Styling
    const typeButtons = document.querySelectorAll('.type-btn');
    typeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        typeButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        audio.playClick();
      });
    });

    // Add Transaction Submission
    if (addTxForm) {
      addTxForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const type = document.querySelector('input[name="txType"]:checked').value;
        const desc = document.getElementById('txDesc').value.trim();
        const amount = parseFloat(document.getElementById('txAmount').value);
        const category = document.getElementById('txCategory').value;
        const date = document.getElementById('txDate').value;
        const method = document.getElementById('txMethod').value;

        if (!desc || isNaN(amount) || amount <= 0) return;

        const newTx = {
          id: 'tx-' + Date.now(),
          desc,
          category,
          type,
          amount,
          date,
          method
        };

        transactions.unshift(newTx);
        saveData();

        if (type === 'income') audio.playChaChing();
        else audio.playCoin();

        updateDashboardMetrics();
        renderTransactionTable();
        closeTxModal();
        addTxForm.reset();
        if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];
      });
    }

    // Goal Modal
    if (newGoalBtn) newGoalBtn.addEventListener('click', () => {
      if (addGoalModal) addGoalModal.classList.add('open');
      audio.playClick();
    });

    if (closeGoalBtn) closeGoalBtn.addEventListener('click', () => {
      if (addGoalModal) addGoalModal.classList.remove('open');
    });

    if (addGoalForm) {
      addGoalForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('goalNameInput').value.trim();
        const target = parseFloat(document.getElementById('goalTargetInput').value);
        const current = parseFloat(document.getElementById('goalCurrentInput').value) || 0;
        const emoji = document.getElementById('goalEmojiInput').value || '🎯';

        if (!name || isNaN(target) || target <= 0) return;

        goals.push({
          id: 'goal-' + Date.now(),
          name,
          target,
          current,
          emoji
        });

        saveData();
        renderGoals();
        audio.playFanfare();
        if (addGoalModal) addGoalModal.classList.remove('open');
        addGoalForm.reset();
      });
    }
  }

  // --------------------------------------------------------------------------
  // 13 // CONTROLS (CURRENCY, THEME, AUDIO, SEARCH, EXPORT)
  // --------------------------------------------------------------------------
  function initHeaderControls() {
    // Currency Switcher
    const currButtons = document.querySelectorAll('.pill-btn[data-currency]');
    currButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        currButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentCurrency = btn.dataset.currency;
        audio.playClick();
        updateDashboardMetrics();
        renderTransactionTable();
        renderGoals();
      });
    });

    // Theme Dropdown
    const themeBtn = document.getElementById('themeDropdownBtn');
    const themeMenu = document.getElementById('themeMenu');
    const themeItems = document.querySelectorAll('.menu-item[data-theme]');

    if (themeBtn && themeMenu) {
      themeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        themeMenu.classList.toggle('open');
        audio.playClick();
      });

      document.addEventListener('click', () => {
        themeMenu.classList.remove('open');
      });

      themeItems.forEach(item => {
        item.addEventListener('click', () => {
          themeItems.forEach(i => i.classList.remove('active'));
          item.classList.add('active');
          const t = item.dataset.theme;
          document.body.className = t;
          audio.playClick();
        });
      });
    }

    // Audio SFX Toggle
    const audioBtn = document.getElementById('audioToggleBtn');
    const soundToast = document.getElementById('soundToast');

    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isMuted = audio.toggleMute();
        audioBtn.style.opacity = isMuted ? '0.45' : '1';
        audioBtn.style.color = isMuted ? 'var(--text-sub)' : 'var(--primary)';

        if (!isMuted) {
          audio.playCoin();
          if (soundToast) {
            soundToast.classList.add('show');
            setTimeout(() => soundToast.classList.remove('show'), 2500);
          }
        }
      });
    }

    // Search filter
    const searchInput = document.getElementById('transactionSearchInput');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.trim();
        renderTransactionTable();
      });
    }

    // Type filter pills (All / Income / Expense)
    const filterPills = document.querySelectorAll('.filter-pill[data-filter]');
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        filterPills.forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        currentFilter = pill.dataset.filter;
        audio.playClick();
        renderTransactionTable();
      });
    });

    // Export Data (JSON & CSV prompt)
    const exportBtn = document.getElementById('exportDataBtn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        const jsonStr = JSON.stringify(transactions, null, 2);
        const blob = new Blob([jsonStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `vault-x-extrato-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        audio.playFanfare();
      });
    }

    // Reset Data
    const resetBtn = document.getElementById('resetDataBtn');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Deseja restaurar os dados de demonstração padrão?')) {
          transactions = [...DEFAULT_TRANSACTIONS];
          goals = [...DEFAULT_GOALS];
          saveData();
          audio.playDelete();
          updateDashboardMetrics();
          renderTransactionTable();
          renderGoals();
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // DOM READY INITIALIZATION
  // --------------------------------------------------------------------------
  window.addEventListener('DOMContentLoaded', () => {
    loadData();
    initVirtualCard();
    initAmbientCanvas();
    updateDashboardMetrics();
    renderGoals();
    renderTransactionTable();
    initTimeMachine();
    initGhostScanner();
    initModals();
    initHeaderControls();
  });
})();

