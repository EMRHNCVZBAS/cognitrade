'use client'

import { useState, useEffect } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

type MarketTab = 'bist' | 'kripto' | 'fon'
type TransactionType = 'gelir' | 'gider'

interface Asset {
  symbol: string
  name: string
  price: number
  change: number
  changePercent: number
  quantity: number
  type: MarketTab
  currency: string
}

interface Transaction {
  id: string
  type: TransactionType
  category: string
  amount: number
  description: string
  date: string
}

// ─── Mock Data ────────────────────────────────────────────────────────────────

const initialAssets: Asset[] = [
  // BIST Hisseleri
  { symbol: 'THYAO', name: 'Türk Hava Yolları', price: 328.50, change: 8.20, changePercent: 2.56, quantity: 100, type: 'bist', currency: '₺' },
  { symbol: 'BIMAS', name: 'BIM Birleşik Mağazalar', price: 445.75, change: -5.25, changePercent: -1.16, quantity: 50, type: 'bist', currency: '₺' },
  { symbol: 'EREGL', name: 'Ereğli Demir Çelik', price: 52.80, change: 1.40, changePercent: 2.72, quantity: 200, type: 'bist', currency: '₺' },
  { symbol: 'ASELS', name: 'Aselsan', price: 87.30, change: -2.10, changePercent: -2.35, quantity: 75, type: 'bist', currency: '₺' },
  { symbol: 'SASA', name: 'SASA Polyester', price: 98.45, change: 3.65, changePercent: 3.85, quantity: 150, type: 'bist', currency: '₺' },
  { symbol: 'AKBNK', name: 'Akbank', price: 67.20, change: 0.80, changePercent: 1.20, quantity: 300, type: 'bist', currency: '₺' },
  { symbol: 'GARAN', name: 'Garanti BBVA', price: 89.50, change: -1.50, changePercent: -1.65, quantity: 200, type: 'bist', currency: '₺' },
  { symbol: 'KCHOL', name: 'Koç Holding', price: 212.40, change: 4.40, changePercent: 2.12, quantity: 60, type: 'bist', currency: '₺' },
  // Kripto Paralar
  { symbol: 'BTC', name: 'Bitcoin', price: 67842.50, change: 1245.30, changePercent: 1.87, quantity: 0.5, type: 'kripto', currency: '$' },
  { symbol: 'ETH', name: 'Ethereum', price: 3542.80, change: -87.20, changePercent: -2.40, quantity: 2.5, type: 'kripto', currency: '$' },
  { symbol: 'BNB', name: 'Binance Coin', price: 587.40, change: 12.60, changePercent: 2.19, quantity: 10, type: 'kripto', currency: '$' },
  { symbol: 'SOL', name: 'Solana', price: 178.90, change: 5.30, changePercent: 3.05, quantity: 25, type: 'kripto', currency: '$' },
  { symbol: 'AVAX', name: 'Avalanche', price: 42.75, change: -1.25, changePercent: -2.84, quantity: 50, type: 'kripto', currency: '$' },
  { symbol: 'XRP', name: 'Ripple', price: 0.685, change: 0.025, changePercent: 3.79, quantity: 5000, type: 'kripto', currency: '$' },
  // Yatırım Fonları
  { symbol: 'AGF', name: 'Ata Gayrimenkul Fonu', price: 1.2456, change: 0.0234, changePercent: 1.92, quantity: 10000, type: 'fon', currency: '₺' },
  { symbol: 'AKT', name: 'Ak Portföy Hisse Fonu', price: 2.3789, change: -0.0145, changePercent: -0.61, quantity: 5000, type: 'fon', currency: '₺' },
  { symbol: 'GBF', name: 'Garanti Borçlanma Fonu', price: 3.1234, change: 0.0567, changePercent: 1.85, quantity: 3000, type: 'fon', currency: '₺' },
  { symbol: 'YBF', name: 'Yapı Kredi Dengeli Fonu', price: 1.8923, change: 0.0234, changePercent: 1.25, quantity: 8000, type: 'fon', currency: '₺' },
  { symbol: 'TFF', name: 'TF Varlık Kiralama Fonu', price: 1.0567, change: -0.0023, changePercent: -0.22, quantity: 15000, type: 'fon', currency: '₺' },
]

const INCOME_CATEGORIES = ['Maaş', 'Freelance', 'Kira Geliri', 'Temettü', 'Faiz', 'Diğer']
const EXPENSE_CATEGORIES = ['Market', 'Fatura', 'Ulaşım', 'Sağlık', 'Eğlence', 'Yatırım', 'Diğer']
const USD_TRY = 32.5

// ─── Helpers ─────────────────────────────────────────────────────────────────

function fmt(n: number, d = 2): string {
  return n.toLocaleString('tr-TR', { minimumFractionDigits: d, maximumFractionDigits: d })
}

// ─── Sparkline ───────────────────────────────────────────────────────────────

function Sparkline({ positive }: { positive: boolean }) {
  const pts = positive
    ? '0,20 5,15 10,18 15,10 20,12 25,5 30,8 35,3 40,6 45,2'
    : '0,3 5,8 10,5 15,12 20,10 25,15 30,12 35,18 40,15 45,20'
  return (
    <svg width="46" height="22" viewBox="0 0 46 22" className="opacity-70">
      <polyline
        points={pts}
        fill="none"
        stroke={positive ? '#10b981' : '#ef4444'}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

// ─── Summary Card ─────────────────────────────────────────────────────────────

function SummaryCard({
  title, value, sub, colorClass, icon,
}: {
  title: string; value: string; sub: string; colorClass: string; icon: string
}) {
  return (
    <div className={`rounded-xl p-4 border ${colorClass}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-400">{title}</span>
        <span className="text-lg">{icon}</span>
      </div>
      <div className="text-lg font-bold text-white">{value}</div>
      <div className="text-xs text-gray-500 mt-1">{sub}</div>
    </div>
  )
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const [assets, setAssets] = useState<Asset[]>(initialAssets)
  const [activeTab, setActiveTab] = useState<MarketTab>('bist')
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', type: 'gelir', category: 'Maaş', amount: 15000, description: 'Mart Maaşı', date: '2026-03-01' },
    { id: '2', type: 'gider', category: 'Market', amount: 2500, description: 'Aylık Market', date: '2026-03-05' },
    { id: '3', type: 'gelir', category: 'Temettü', amount: 3200, description: 'THYAO Temettü', date: '2026-03-10' },
    { id: '4', type: 'gider', category: 'Fatura', amount: 850, description: 'Elektrik/Su/Gaz', date: '2026-03-12' },
    { id: '5', type: 'gider', category: 'Ulaşım', amount: 600, description: 'Akaryakıt', date: '2026-03-15' },
    { id: '6', type: 'gelir', category: 'Faiz', amount: 1800, description: 'Mevduat Faizi', date: '2026-03-20' },
  ])

  const [form, setForm] = useState({
    type: 'gelir' as TransactionType,
    category: 'Maaş',
    amount: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
  })
  const [showForm, setShowForm] = useState(false)
  const [lastUpdated, setLastUpdated] = useState(new Date())

  // ── Simulated live price updates ──────────────────────────────────────────
  useEffect(() => {
    const interval = setInterval(() => {
      setAssets(prev =>
        prev.map(asset => {
          const vol = asset.type === 'kripto' ? 0.003 : asset.type === 'bist' ? 0.002 : 0.001
          const delta = asset.price * (Math.random() * vol * 2 - vol)
          const newPrice = Math.max(asset.price + delta, 0.001)
          const newChange = asset.change + delta
          const base = newPrice - newChange
          const newPct = base > 0 ? (newChange / base) * 100 : 0
          return { ...asset, price: newPrice, change: newChange, changePercent: newPct }
        })
      )
      setLastUpdated(new Date())
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  // ── Derived values ────────────────────────────────────────────────────────
  const toTRY = (a: Asset) =>
    a.currency === '$' ? a.price * a.quantity * USD_TRY : a.price * a.quantity

  const bistValue   = assets.filter(a => a.type === 'bist').reduce((s, a) => s + toTRY(a), 0)
  const cryptoValue = assets.filter(a => a.type === 'kripto').reduce((s, a) => s + toTRY(a), 0)
  const fonValue    = assets.filter(a => a.type === 'fon').reduce((s, a) => s + toTRY(a), 0)
  const portfolioValue = bistValue + cryptoValue + fonValue

  const totalIncome  = transactions.filter(t => t.type === 'gelir').reduce((s, t) => s + t.amount, 0)
  const totalExpense = transactions.filter(t => t.type === 'gider').reduce((s, t) => s + t.amount, 0)
  const netBalance   = totalIncome - totalExpense

  const filteredAssets = assets.filter(a => a.type === activeTab)

  // ── Add transaction ───────────────────────────────────────────────────────
  function addTransaction() {
    if (!form.amount || !form.description) return
    const t: Transaction = {
      id: Date.now().toString(),
      type: form.type,
      category: form.category,
      amount: parseFloat(form.amount),
      description: form.description,
      date: form.date,
    }
    setTransactions(prev => [t, ...prev])
    setForm({ type: 'gelir', category: 'Maaş', amount: '', description: '', date: new Date().toISOString().split('T')[0] })
    setShowForm(false)
  }

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-950 text-white" style={{ fontFamily: 'var(--font-geist-sans, system-ui, sans-serif)' }}>

      {/* ── Header ── */}
      <header className="bg-gray-900 border-b border-gray-800 px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold">
            <span className="text-emerald-400">COGNI</span>TRADE
          </span>
          <span className="text-gray-600 text-xs hidden sm:block">Yatırım &amp; Bütçe Takibi</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-400">
          <span className="hidden md:block text-xs">
            Güncellendi: {lastUpdated.toLocaleTimeString('tr-TR')}
          </span>
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-emerald-400 text-xs font-medium">Canlı</span>
          </div>
        </div>
      </header>

      <div className="max-w-screen-2xl mx-auto p-3 md:p-4">

        {/* ── Summary Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
          <SummaryCard
            title="Toplam Portföy"
            value={`₺${fmt(portfolioValue)}`}
            sub="Tüm yatırımlar"
            colorClass="bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
            icon="📈"
          />
          <SummaryCard
            title="BIST Değeri"
            value={`₺${fmt(bistValue)}`}
            sub={`${assets.filter(a => a.type === 'bist').length} hisse`}
            colorClass="bg-cyan-500/10 border-cyan-500/20 text-cyan-400"
            icon="🏛️"
          />
          <SummaryCard
            title="Kripto Değeri"
            value={`₺${fmt(cryptoValue)}`}
            sub={`$1 = ₺${USD_TRY}`}
            colorClass="bg-orange-500/10 border-orange-500/20 text-orange-400"
            icon="₿"
          />
          <SummaryCard
            title="Fon Değeri"
            value={`₺${fmt(fonValue)}`}
            sub={`${assets.filter(a => a.type === 'fon').length} fon`}
            colorClass="bg-purple-500/10 border-purple-500/20 text-purple-400"
            icon="📊"
          />
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">

          {/* ── Market Panel (2/3) ── */}
          <div className="xl:col-span-2 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex flex-col">

            {/* Tabs */}
            <div className="flex border-b border-gray-800 shrink-0">
              {(['bist', 'kripto', 'fon'] as MarketTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm font-semibold transition-colors ${
                    activeTab === tab
                      ? 'bg-gray-800 text-white border-b-2 border-emerald-400'
                      : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800/40'
                  }`}
                >
                  {tab === 'bist' ? 'BIST' : tab === 'kripto' ? 'Kripto' : 'Fon'}
                </button>
              ))}
            </div>

            {/* Table */}
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs border-b border-gray-800">
                    <th className="text-left py-2.5 px-4 font-medium">Sembol / İsim</th>
                    <th className="text-right py-2.5 px-3 font-medium">Fiyat</th>
                    <th className="text-right py-2.5 px-3 font-medium">Değişim</th>
                    <th className="text-right py-2.5 px-3 font-medium hidden md:table-cell">Miktar</th>
                    <th className="text-right py-2.5 px-3 font-medium hidden md:table-cell">Değer (₺)</th>
                    <th className="text-right py-2.5 px-3 font-medium hidden lg:table-cell">Grafik</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map(asset => {
                    const pos = asset.changePercent >= 0
                    const value = toTRY(asset)
                    const priceDecimals = asset.price < 10 ? 4 : 2
                    return (
                      <tr
                        key={asset.symbol}
                        className="border-b border-gray-800/50 hover:bg-gray-800/40 transition-colors"
                      >
                        <td className="py-3 px-4">
                          <div className="font-bold text-white">{asset.symbol}</div>
                          <div className="text-gray-500 text-xs truncate max-w-[160px]">{asset.name}</div>
                        </td>
                        <td className="py-3 px-3 text-right font-mono">
                          <span className="text-white">
                            {asset.currency}{fmt(asset.price, priceDecimals)}
                          </span>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <span className={`font-semibold text-sm ${pos ? 'text-emerald-400' : 'text-red-400'}`}>
                            {pos ? '+' : ''}{fmt(asset.changePercent, 2)}%
                          </span>
                          <div className={`text-xs ${pos ? 'text-emerald-600' : 'text-red-600'}`}>
                            {pos ? '+' : ''}{asset.currency}{fmt(Math.abs(asset.change), priceDecimals)}
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right text-gray-400 hidden md:table-cell font-mono">
                          {fmt(asset.quantity, asset.quantity < 10 ? 3 : 0)}
                        </td>
                        <td className="py-3 px-3 text-right hidden md:table-cell">
                          <span className="text-white font-medium">₺{fmt(value)}</span>
                        </td>
                        <td className="py-3 px-3 text-right hidden lg:table-cell">
                          <Sparkline positive={pos} />
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>

            {/* Portfolio breakdown bar */}
            <div className="p-3 border-t border-gray-800 shrink-0">
              <div className="text-xs text-gray-500 mb-2">Portföy Dağılımı</div>
              <div className="flex h-2 rounded-full overflow-hidden gap-0.5">
                <div
                  className="bg-cyan-500 transition-all duration-700"
                  style={{ width: `${(bistValue / portfolioValue) * 100}%` }}
                  title={`BIST: ₺${fmt(bistValue)}`}
                />
                <div
                  className="bg-orange-500 transition-all duration-700"
                  style={{ width: `${(cryptoValue / portfolioValue) * 100}%` }}
                  title={`Kripto: ₺${fmt(cryptoValue)}`}
                />
                <div
                  className="bg-purple-500 transition-all duration-700"
                  style={{ width: `${(fonValue / portfolioValue) * 100}%` }}
                  title={`Fon: ₺${fmt(fonValue)}`}
                />
              </div>
              <div className="flex gap-4 mt-2 text-xs text-gray-500">
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyan-500 inline-block" />BIST {((bistValue / portfolioValue) * 100).toFixed(1)}%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-orange-500 inline-block" />Kripto {((cryptoValue / portfolioValue) * 100).toFixed(1)}%</span>
                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500 inline-block" />Fon {((fonValue / portfolioValue) * 100).toFixed(1)}%</span>
              </div>
            </div>
          </div>

          {/* ── Finance Panel (1/3) ── */}
          <div className="flex flex-col gap-4">

            {/* Gelir/Gider Özeti */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 p-4">
              <h3 className="text-sm font-semibold text-gray-400 mb-3">Gelir / Gider Özeti</h3>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="bg-emerald-500/10 rounded-lg p-3 text-center border border-emerald-500/20">
                  <div className="text-xs text-emerald-400 mb-1">Gelir</div>
                  <div className="text-sm font-bold text-emerald-400">₺{fmt(totalIncome)}</div>
                </div>
                <div className="bg-red-500/10 rounded-lg p-3 text-center border border-red-500/20">
                  <div className="text-xs text-red-400 mb-1">Gider</div>
                  <div className="text-sm font-bold text-red-400">₺{fmt(totalExpense)}</div>
                </div>
                <div className={`rounded-lg p-3 text-center border ${netBalance >= 0 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                  <div className={`text-xs mb-1 ${netBalance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>Net</div>
                  <div className={`text-sm font-bold ${netBalance >= 0 ? 'text-blue-400' : 'text-red-400'}`}>
                    ₺{fmt(netBalance)}
                  </div>
                </div>
              </div>

              {/* Progress bars */}
              <div className="space-y-2.5">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Gelir</span><span>₺{fmt(totalIncome)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full w-full" />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Gider</span><span>₺{fmt(totalExpense)}</span>
                  </div>
                  <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all"
                      style={{ width: `${Math.min((totalExpense / totalIncome) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <div className="text-xs text-gray-600 text-right">
                  Tasarruf oranı: %{fmt(((totalIncome - totalExpense) / totalIncome) * 100, 1)}
                </div>
              </div>
            </div>

            {/* Son İşlemler */}
            <div className="bg-gray-900 rounded-xl border border-gray-800 flex-1 flex flex-col min-h-0">
              <div className="flex items-center justify-between p-4 border-b border-gray-800 shrink-0">
                <h3 className="text-sm font-semibold text-gray-400">Son İşlemler</h3>
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="text-xs bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-lg transition-colors font-medium"
                >
                  + Ekle
                </button>
              </div>

              {/* Add form */}
              {showForm && (
                <div className="p-4 border-b border-gray-800 bg-gray-800/50 shrink-0">
                  <div className="grid grid-cols-2 gap-2 mb-2">
                    <select
                      value={form.type}
                      onChange={e => setForm(prev => ({
                        ...prev,
                        type: e.target.value as TransactionType,
                        category: e.target.value === 'gelir' ? 'Maaş' : 'Market',
                      }))}
                      className="bg-gray-700 text-white text-xs rounded-lg px-2 py-2 border border-gray-600 outline-none"
                    >
                      <option value="gelir">Gelir</option>
                      <option value="gider">Gider</option>
                    </select>
                    <select
                      value={form.category}
                      onChange={e => setForm(prev => ({ ...prev, category: e.target.value }))}
                      className="bg-gray-700 text-white text-xs rounded-lg px-2 py-2 border border-gray-600 outline-none"
                    >
                      {(form.type === 'gelir' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES).map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    type="number"
                    placeholder="Tutar (₺)"
                    value={form.amount}
                    onChange={e => setForm(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2 mb-2 border border-gray-600 placeholder-gray-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Açıklama"
                    value={form.description}
                    onChange={e => setForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2 mb-2 border border-gray-600 placeholder-gray-500 outline-none"
                  />
                  <input
                    type="date"
                    value={form.date}
                    onChange={e => setForm(prev => ({ ...prev, date: e.target.value }))}
                    className="w-full bg-gray-700 text-white text-xs rounded-lg px-3 py-2 mb-2 border border-gray-600 outline-none"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={addTransaction}
                      className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs py-2 rounded-lg transition-colors font-medium"
                    >
                      Kaydet
                    </button>
                    <button
                      onClick={() => setShowForm(false)}
                      className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-xs py-2 rounded-lg transition-colors"
                    >
                      İptal
                    </button>
                  </div>
                </div>
              )}

              {/* Transaction list */}
              <div className="overflow-y-auto flex-1" style={{ maxHeight: '340px' }}>
                {transactions.map(t => (
                  <div
                    key={t.id}
                    className="flex items-center justify-between px-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold ${
                        t.type === 'gelir' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'
                      }`}>
                        {t.type === 'gelir' ? '↑' : '↓'}
                      </div>
                      <div>
                        <div className="text-xs font-medium text-white">{t.description}</div>
                        <div className="text-xs text-gray-500">{t.category} · {t.date}</div>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${t.type === 'gelir' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {t.type === 'gelir' ? '+' : '-'}₺{fmt(t.amount)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 text-center text-gray-700 text-xs">
          CogniTrade © 2026 · Veriler demo amaçlıdır, gerçek yatırım tavsiyesi değildir.
        </div>
      </div>
    </div>
  )
}
