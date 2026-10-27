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
      const monthlyRate = Math.pow(1 + annualRate, 1 / 12) - 1;

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
  // 13 // IMPORT BANK STATEMENT (Banco Inter PDF)
  // Isolated feature: existing dashboard logic and visual components unchanged.
  // --------------------------------------------------------------------------
  function initStatementImport() {
    const chooseBtn = document.getElementById('importStatementBtn');
    const fileInput = document.getElementById('statementPdfInput');
    const modal = document.getElementById('statementImportModal');
    const preview = document.getElementById('statementImportPreview');
    const summary = document.getElementById('statementImportSummary');
    const message = document.getElementById('statementImportMessage');
    const confirmBtn = document.getElementById('confirmStatementImportBtn');
    const closeBtn = document.getElementById('closeStatementImportBtn');
    const cancelBtn = document.getElementById('cancelStatementImportBtn');
    if (!chooseBtn || !fileInput || !modal || !preview || !confirmBtn) return;

    let draft = [];
    let pdfLibraryPromise = null;
    const monthMap = {
      janeiro: 1, fevereiro: 2, marco: 3, abril: 4, maio: 5, junho: 6,
      julho: 7, agosto: 8, setembro: 9, outubro: 10, novembro: 11, dezembro: 12
    };
    const moneyRegex = /(-?)\s*R\$\s*([\d.]+,\d{2})/i;
    const categoryOptions = () => Array.from(document.querySelectorAll('#txCategory option')).map(o => o.value);
    const normalize = value => String(value || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
    const toCents = value => {
      let raw = String(value).trim().replace(/R\$/gi, '').replace(/\s/g, '').replace(/[^\d,.-]/g, '');
      if (raw.includes(',')) raw = raw.replace(/\./g, '').replace(',', '.');
      const number = Number(raw);
      return Number.isFinite(number) ? Math.round(Math.abs(number) * 100) : 0;
    };
    const moneyTextToCents = text => {
      const match = String(text || '').match(moneyRegex);
      if (!match) return null;
      return { cents: toCents(match[2]), negative: match[1] === '-' || /^\s*-/.test(text) };
    };
    const dateKey = date => {
      const [y,m,d] = String(date || '').split('-');
      return y && m && d ? `${y}-${m}-${d}` : '';
    };
    const labelType = description => {
      const desc = normalize(description);
      if (desc.startsWith('salario recebido') || desc.startsWith('pix recebido') || desc.startsWith('resgate')) return 'income';
      if (desc.startsWith('pix enviado') || desc.startsWith('compra no debito') || desc.startsWith('aplicacao')) return 'expense';
      return null;
    };
    const suggestCategory = (description, type) => {
      const desc = normalize(description);
      const available = categoryOptions();
      if (/\bresgate\b|\baplicacao\b|\bcdb\b/.test(desc)) return 'Investimentos';
      if (/salario recebido|folha de pagamento/.test(desc)) return 'Salário/Mesada';
      if (/ifood|outback|restaurante|conveniencia|conveniencia|nice araujo|salgad|lanch|bar|barbearia|hopi hari|parques|eventos entretenimento/.test(desc)) return 'Lanches/Rolê';
      if (/uber|99 app|combustivel|posto|onibus|metro|transporte|pedagio/.test(desc)) return 'Transporte';
      if (/steam|game|games|skin|playstation|xbox/.test(desc)) return 'Games/Skins';
      if (/spotify|netflix|prime video|assinatura|streaming/.test(desc)) return 'Assinaturas';
      if (/curso|escola|livro|educacao|faculdade/.test(desc)) return 'Estudos/Tech';
      if (/roupa|tenis|vestuario|moda/.test(desc)) return 'Moda/Estilo';
      if (type === 'income') return available.includes('Outros') ? 'Outros' : available[0];
      return available.includes('Outros') ? 'Outros' : available[0];
    };
    const signature = item => `${item.date}|${item.type}|${item.amount}|${normalize(item.desc)}`;
    const duplicateOfExisting = item => transactions.some(existing => {
      if (existing.importFingerprint && existing.importFingerprint === signature(item)) return true;
      if (existing.date !== item.date || existing.type !== item.type || Math.round(Number(existing.amount) * 100) !== item.amount) return false;
      const a = normalize(existing.desc), b = normalize(item.desc);
      return !!a && !!b && (a === b || a.includes(b) || b.includes(a));
    });
    const showModal = () => { modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false'); };
    const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };

    function loadPdfJs() {
      if (window.pdfjsLib) return Promise.resolve(window.pdfjsLib);
      if (pdfLibraryPromise) return pdfLibraryPromise;
      pdfLibraryPromise = new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
        script.async = true;
        script.onload = () => window.pdfjsLib ? resolve(window.pdfjsLib) : reject(new Error('O leitor de PDF não iniciou corretamente.'));
        script.onerror = () => reject(new Error('Não consegui carregar o leitor de PDF. Confira sua conexão com a internet.'));
        document.head.appendChild(script);
      });
      return pdfLibraryPromise;
    }

    async function extractPdfRows(pdfjs, file) {
      const pdf = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
      const rows = [];
      for (let pageNo = 1; pageNo <= pdf.numPages; pageNo++) {
        const page = await pdf.getPage(pageNo);
        const items = (await page.getTextContent()).items.filter(item => item.str && item.str.trim());
        const pageRows = [];
        for (const item of items) {
          const x = Number(item.transform?.[4] || 0);
          const y = Number(item.transform?.[5] || 0);
          let row = pageRows.find(candidate => Math.abs(candidate.y - y) <= 1.7);
          if (!row) { row = { y, items: [] }; pageRows.push(row); }
          row.items.push({ x, text: item.str.trim() });
        }
        pageRows.sort((a,b) => b.y - a.y);
        for (const row of pageRows) {
          row.items.sort((a,b) => a.x - b.x);
          row.leftText = row.items.filter(item => item.x < 400).map(item => item.text).join(' ').replace(/\s+/g,' ').trim();
          // Banco Inter positions the transaction value around x=425-454 and the running balance after x=520.
          row.amountText = row.items.filter(item => item.x >= 400 && item.x < 470).map(item => item.text).join(' ').replace(/\s+/g,' ').trim();
          rows.push(row);
        }
      }
      return rows;
    }

    function parseInterRows(rows) {
      const movements = [];
      let currentDate = '';
      let pendingContinuation = null;
      const dateRx = /\b(\d{1,2})\s+de\s+([a-zçãé]+)\s+de\s+(\d{4})\b/i;
      const knownLabels = ['pix enviado', 'pix recebido', 'resgate', 'aplicacao', 'salario recebido', 'compra no debito'];
      for (const row of rows) {
        const left = row.leftText || '';
        const normalizedLeft = normalize(left);
        const dateMatch = normalizedLeft.match(dateRx);
        if (dateMatch) {
          const month = monthMap[dateMatch[2]];
          if (month) currentDate = `${dateMatch[3]}-${String(month).padStart(2,'0')}-${String(Number(dateMatch[1])).padStart(2,'0')}`;
          pendingContinuation = null;
          continue;
        }
        const start = knownLabels.find(label => normalizedLeft.startsWith(label));
        if (start) {
          pendingContinuation = null;
          const parsedAmount = moneyTextToCents(row.amountText);
          if (!currentDate || !parsedAmount || parsedAmount.cents <= 0) continue;
          const type = labelType(left);
          if (!type) continue;
          const labelPattern = /^(Pix enviado|Pix recebido|Resgate|Aplicação|Aplicacao|Salário recebido(?:\s*-\s*Portabilidade)?|Salario recebido(?:\s*-\s*Portabilidade)?|Compra no débito|Compra no debito)\s*:\s*/i;
          let desc = left.replace(labelPattern, '').trim().replace(/^['"“”]+|['"“”]+$/g, '').trim();
          const fullDesc = `${left.split(':')[0].trim()}: ${desc}`.trim();
          const item = {
            date: currentDate,
            type,
            amount: parsedAmount.cents,
            desc: fullDesc,
            category: suggestCategory(fullDesc, type),
            method: /pix/i.test(left) ? 'PIX' : /compra no debito/i.test(normalizedLeft) ? 'Cartão de Débito' : /aplicacao/i.test(normalizedLeft) ? 'Inter • Aplicação CDB' : /resgate/i.test(normalizedLeft) ? 'Inter • Resgate CDB' : 'Inter',
            review: false,
            selected: true,
            duplicate: false
          };
          item.importFingerprint = signature(item);
          if (!movements.some(existing => signature(existing) === signature(item))) movements.push(item);
          const quotes = (left.match(/"/g) || []).length + (left.match(/“|”/g) || []).length;
          if (quotes % 2 === 1) pendingContinuation = item;
          continue;
        }
        // Some long merchant names wrap onto a second baseline; append only if the quote was left open.
        if (pendingContinuation && left && !row.amountText && !/fale com a gente|sac:|ouvidoria|deficiencia de fala/i.test(normalizedLeft)) {
          const quotes = (left.match(/"/g) || []).length + (left.match(/“|”/g) || []).length;
          pendingContinuation.desc += ` ${left}`;
          pendingContinuation.importFingerprint = signature(pendingContinuation);
          if (quotes % 2 === 1) pendingContinuation = null;
          continue;
        }
        pendingContinuation = null;
      }
      return movements;
    }

    function renderPreview() {
      const duplicateCount = draft.filter(item => item.duplicate).length;
      const reviewCount = draft.filter(item => item.review).length;
      const incomeCount = draft.filter(item => item.type === 'income').length;
      const expenseCount = draft.filter(item => item.type === 'expense').length;
      summary.innerHTML = `<span>${draft.length} movimentação(ões)</span><span>${incomeCount} entradas</span><span>${expenseCount} saídas</span><span>${duplicateCount} possíveis duplicatas</span>`;
      message.textContent = reviewCount ? `${reviewCount} item(ns) precisam de revisão manual.` : 'Confira descrições, datas, valores e categorias antes de importar.';
      message.classList.toggle('warning', duplicateCount > 0 || reviewCount > 0);
      const categories = categoryOptions();
      preview.innerHTML = `<table class="statement-preview-table"><thead><tr><th>IMPORTAR</th><th>DATA</th><th>DESCRIÇÃO</th><th>VALOR</th><th>TIPO</th><th>CATEGORIA</th></tr></thead><tbody>${draft.map((item,index) => {
        const categoryList = [...new Set([...categories, item.category])];
        return `<tr class="${item.duplicate ? 'is-duplicate' : ''}"><td><input type="checkbox" data-st-include="${index}" ${item.selected && !item.duplicate ? 'checked' : ''} aria-label="Importar movimentação ${index+1}"></td><td><input type="date" data-st-date="${index}" value="${escapeHTML(item.date)}" aria-label="Data ${index+1}"></td><td class="st-description"><input type="text" data-st-desc="${index}" value="${escapeHTML(item.desc)}" aria-label="Descrição ${index+1}">${item.duplicate ? '<small class="st-duplicate-label">Possível duplicata — desmarcada</small>' : ''}${item.review ? '<small class="st-review-label">Confira este item</small>' : ''}</td><td class="st-amount"><input type="number" min="0.01" step="0.01" data-st-amount="${index}" value="${(item.amount/100).toFixed(2)}" aria-label="Valor ${index+1}"></td><td><select data-st-type="${index}" aria-label="Tipo ${index+1}"><option value="income" ${item.type==='income'?'selected':''}>Entrada</option><option value="expense" ${item.type==='expense'?'selected':''}>Saída</option></select></td><td><select data-st-category="${index}" aria-label="Categoria ${index+1}">${categoryList.map(category=>`<option value="${escapeHTML(category)}" ${item.category===category?'selected':''}>${escapeHTML(category)}</option>`).join('')}</select></td></tr>`;
      }).join('')}</tbody></table>`;
      confirmBtn.disabled = !draft.some(item => item.selected && !item.duplicate);
      showModal();
    }

    function syncPreviewValues() {
      draft.forEach((item,index) => {
        const checkbox = preview.querySelector(`[data-st-include="${index}"]`);
        const date = preview.querySelector(`[data-st-date="${index}"]`);
        const desc = preview.querySelector(`[data-st-desc="${index}"]`);
        const amount = preview.querySelector(`[data-st-amount="${index}"]`);
        const type = preview.querySelector(`[data-st-type="${index}"]`);
        const category = preview.querySelector(`[data-st-category="${index}"]`);
        item.selected = !!checkbox?.checked;
        if (date) item.date = date.value;
        if (desc) item.desc = desc.value.trim().slice(0,180);
        if (amount && Number(amount.value) > 0) item.amount = Math.round(Number(amount.value) * 100);
        if (type) item.type = type.value;
        if (category) item.category = category.value;
        item.importFingerprint = signature(item);
      });
    }

    async function handlePdf(file) {
      if (!file) return;
      if (file.size > 20 * 1024 * 1024) { alert('O PDF tem mais de 20 MB. Exporte um período menor.'); return; }
      chooseBtn.disabled = true;
      try {
        message.textContent = 'Carregando o leitor de PDF…';
        showModal();
        const pdfjs = await loadPdfJs();
        pdfjs.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        const rows = await extractPdfRows(pdfjs, file);
        draft = parseInterRows(rows);
        if (!draft.length) throw new Error('Não encontrei movimentações reconhecíveis neste PDF. Confira se é o extrato de conta corrente do Inter com texto selecionável.');
        draft.forEach(item => { item.duplicate = duplicateOfExisting(item); if (item.duplicate) item.selected = false; });
        const fingerprints = new Set();
        draft = draft.filter(item => { const key = signature(item); if (fingerprints.has(key)) return false; fingerprints.add(key); return true; });
        renderPreview();
        audio.playClick();
      } catch (error) {
        preview.innerHTML = '';
        summary.innerHTML = '';
        message.textContent = error?.message || 'Não foi possível ler esse PDF.';
        message.classList.add('warning');
        confirmBtn.disabled = true;
        showModal();
      } finally {
        chooseBtn.disabled = false;
        fileInput.value = '';
      }
    }

    chooseBtn.addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', event => handlePdf(event.target.files?.[0]));
    closeBtn?.addEventListener('click', () => { closeModal(); draft = []; });
    cancelBtn?.addEventListener('click', () => { closeModal(); draft = []; audio.playClick(); });
    modal.addEventListener('click', event => { if (event.target === modal) { closeModal(); draft = []; } });
    preview.addEventListener('change', event => {
      if (event.target.matches('[data-st-include]')) {
        const index = Number(event.target.dataset.stInclude);
        if (draft[index]) draft[index].selected = event.target.checked;
        confirmBtn.disabled = !draft.some(item => item.selected);
      }
    });
    confirmBtn.addEventListener('click', () => {
      syncPreviewValues();
      const selected = draft.filter(item => item.selected);
      if (!selected.length) { message.textContent = 'Marque pelo menos uma movimentação para importar.'; return; }
      if (selected.some(item => !item.date || !item.desc || !Number.isFinite(item.amount) || item.amount <= 0)) {
        message.textContent = 'Corrija a data, descrição e valor das movimentações selecionadas.';
        message.classList.add('warning');
        return;
      }
      const duplicates = selected.filter(duplicateOfExisting);
      if (duplicates.length && !confirm(`${duplicates.length} movimentação(ões) selecionada(s) parecem já existir. Deseja importar mesmo assim?`)) return;
      const ordered = [...selected].sort((a,b) => a.date.localeCompare(b.date));
      ordered.forEach(item => transactions.unshift({
        id: `inter-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
        desc: item.desc,
        category: item.category,
        type: item.type,
        amount: item.amount / 100,
        date: dateKey(item.date),
        method: item.method || 'Banco Inter',
        importFingerprint: signature(item),
        importSource: 'Banco Inter PDF'
      }));
      saveData();
      updateDashboardMetrics();
      renderTransactionTable();
      renderCategoryChart();
      renderCashflowWave();
      closeModal();
      draft = [];
      audio.playFanfare();
      alert(`${selected.length} movimentação(ões) importada(s) para o histórico.`);
    });
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
    initStatementImport();
  });
})();

