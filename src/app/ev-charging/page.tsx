'use client';

import { useState } from 'react';
import {
  HelpCircle,
  ChevronRight,
  Search,
  SlidersHorizontal,
  Map,
  Newspaper,
  Zap,
  MapPin,
  List,
} from 'lucide-react';

const chargingStations = [
  { id: 1, name: 'Blk 18 Everton Rd', address: 'Everton Road, Singapore 081018', available: 3, total: 5, distance: '0.2 km', types: ['AC 22'] },
  { id: 2, name: 'VivoCity', address: '1 HarbourFront Walk, Singapore 098585', available: 8, total: 12, distance: '1.5 km', types: ['AC 22', 'DC 50'] },
  { id: 3, name: 'Tanjong Pagar Plaza', address: '1 Tanjong Pagar Plaza, Singapore 082001', available: 2, total: 4, distance: '0.8 km', types: ['AC 22'] },
  { id: 4, name: 'Icon Village', address: '12 Gopeng Street, Singapore 078877', available: 5, total: 6, distance: '1.1 km', types: ['DC 50'] },
  { id: 5, name: 'Mapletree Business City', address: '20 Pasir Panjang Rd, Singapore 117439', available: 0, total: 8, distance: '3.2 km', types: ['AC 22', 'DC 50'] },
  { id: 6, name: 'HarbourFront Centre', address: '1 Maritime Square, Singapore 099253', available: 4, total: 10, distance: '1.7 km', types: ['AC 22'] },
];

export default function EVChargingPage() {
  const [view, setView] = useState<'list' | 'map'>('list');
  const [search, setSearch] = useState('');

  const filtered = chargingStations.filter(
    (s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gradient-ev relative overflow-hidden">
      {/* Header */}
      <div className="bg-sp-teal px-4 pt-12 pb-4 relative z-10">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">EV Charging</h1>
          <button className="flex items-center gap-1 text-white text-sm">
            <HelpCircle size={18} />
            Help
          </button>
        </div>
      </div>

      {/* Promo Banner */}
      <div className="mx-4 mt-4 rounded-3xl bg-gradient-to-r from-sp-teal to-sp-teal-dark p-4 relative z-10" style={{ backdropFilter: 'blur(10px)' }}>
        <p className="text-white text-sm font-medium leading-snug">
          8% off EV charging at selected CapitaLand properties till 3 Apr
        </p>
        <button className="mt-2 text-white text-xs font-semibold flex items-center gap-1">
          Find out more <ChevronRight size={14} />
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between px-4 mt-4 relative z-10">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 glass rounded-full px-3 py-1.5">
            <div className="w-6 h-6 rounded-full bg-sp-green flex items-center justify-center">
              <Zap size={14} className="text-white" />
            </div>
            <span className="text-sm font-bold text-sp-dark">0</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">bolt pts</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setView('map')}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${view === 'map' ? 'bg-sp-teal text-white' : 'glass text-sp-dark'}`}
          >
            <Map size={16} />
            Map
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-full glass text-sp-dark text-sm font-medium">
            <Newspaper size={16} />
            News
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="px-4 mt-4 relative z-10">
        <div className="flex items-center gap-2 glass rounded-2xl px-4 py-3">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search Location"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 text-sm text-sp-dark placeholder-gray-400 dark:placeholder-gray-500 outline-none bg-transparent"
          />
          <button className="text-gray-400">
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="px-4 mt-4 relative z-10">
        <div className="flex items-center glass rounded-2xl p-1">
          <button
            onClick={() => setView('list')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium ${view === 'list' ? 'bg-sp-teal text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <List size={16} />
            List
          </button>
          <button
            onClick={() => setView('map')}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-sm font-medium ${view === 'map' ? 'bg-sp-teal text-white' : 'text-gray-500 dark:text-gray-400'}`}
          >
            <Map size={16} />
            Map
          </button>
        </div>
      </div>

      {view === 'map' ? (
        <div className="mx-4 mt-4 rounded-3xl glass h-80 flex items-center justify-center relative z-10">
          <div className="text-center text-gray-500 dark:text-gray-400">
            <Map size={48} className="mx-auto mb-2 opacity-50" />
            <p className="text-sm">Map View</p>
          </div>
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between px-4 mt-4 mb-2 relative z-10">
            <span className="text-sm font-semibold text-sp-dark">Charging points</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">Available / Total</span>
          </div>

          <div className="px-4 space-y-3 pb-6 relative z-10">
            {filtered.map((station) => (
              <div key={station.id} className="glass-subtle rounded-2xl p-4 card-hover">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} className="text-sp-teal shrink-0" />
                      <h3 className="text-sm font-bold text-sp-dark">{station.name}</h3>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 ml-6">{station.address}</p>
                    <div className="flex items-center gap-2 mt-2 ml-6">
                      {station.types.map((type) => (
                        <span key={type} className={`text-xs font-medium px-2 py-0.5 rounded-full ${type.startsWith('DC') ? 'bg-sp-orange/10 text-sp-orange' : 'bg-sp-teal/10 text-sp-teal'}`}>
                          {type}
                        </span>
                      ))}
                      <span className="text-xs text-gray-400">{station.distance}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`text-lg font-bold ${station.available > 0 ? 'text-sp-green' : 'text-sp-red'}`}>{station.available}</span>
                    <span className="text-lg text-gray-400">/{station.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
