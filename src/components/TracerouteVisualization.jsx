import React, { useState } from 'react';
import { Cloud, Network, Server, MapPin, Shield, ChevronRight, ChevronLeft, RotateCcw, Play, Youtube } from 'lucide-react';

const TracerouteVisualization = () => {
  const [currentHop, setCurrentHop] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const hops = [
    {
      ip: '172.25.90.1',
      name: 'Source Network',
      location: 'Seattle, WA, USA',
      type: 'local',
      ms: 0,
      detail: 'Your local machine - Starting point of the trace'
    },
    {
      ip: '172.25.80.1',
      name: 'Internal Router',
      location: 'Seattle, WA, USA',
      type: 'local',
      ms: 1,
      detail: 'First hop - Internal network gateway router'
    },
    {
      ip: '192.168.86.1',
      name: 'Gateway Router',
      location: 'Seattle, WA, USA',
      type: 'isp',
      ms: 2,
      detail: 'ISP entry point - Transition from private to public network'
    },
    {
      ip: '50.34.32.1',
      name: 'ISP Core Router',
      location: 'Portland, OR, USA',
      type: 'backbone',
      ms: 3,
      detail: 'Regional ISP backbone router'
    },
    {
      ip: '64.52.96.12',
      name: 'Internet Exchange',
      location: 'Chicago, IL, USA',
      type: 'exchange',
      ms: 4,
      detail: 'Major US Internet Exchange Point (IXP)'
    },
    {
      ip: '137.83.80.40',
      name: 'Transit Router',
      location: 'New York, NY, USA',
      type: 'backbone',
      ms: 5,
      detail: 'Transatlantic connection point'
    },
    {
      ip: '0.0.0.0',
      name: 'Hidden Hop',
      location: 'Atlantic Crossing',
      type: 'hidden',
      ms: 6,
      detail: 'Hidden or filtered hop - Transatlantic submarine cable'
    },
    {
      ip: '157.52.127.216',
      name: 'BBC Edge Router',
      location: 'London, UK',
      type: 'cdn',
      ms: 7,
      detail: 'BBC network edge router'
    },
    {
      ip: '151.101.192.81',
      name: 'BBC Server',
      location: 'London, UK',
      type: 'destination',
      ms: 8,
      detail: 'Final destination - BBC website server (bbc.co.uk)'
    }
  ];

  // Rest of the component code remains the same...
  const getIcon = (type) => {
    switch (type) {
      case 'local':
        return <Network className="w-8 h-8" />;
      case 'isp':
        return <Cloud className="w-8 h-8" />;
      case 'backbone':
        return <Network className="w-8 h-8" />;
      case 'exchange':
        return <Network className="w-8 h-8" />;
      case 'hidden':
        return <Shield className="w-8 h-8" />;
      case 'cdn':
        return <Cloud className="w-8 h-8" />;
      case 'destination':
        return <Server className="w-8 h-8" />;
      default:
        return <Network className="w-8 h-8" />;
    }
  };

  const nextHop = () => {
    if (currentHop < hops.length - 1) {
      setCurrentHop(prev => prev + 1);
    }
  };

  const previousHop = () => {
    if (currentHop > 0) {
      setCurrentHop(prev => prev - 1);
    }
  };

  const resetTrace = () => {
    setCurrentHop(0);
    setIsAnimating(false);
  };

  const autoPlay = () => {
    setIsAnimating(true);
    const interval = setInterval(() => {
      setCurrentHop(prev => {
        if (prev >= hops.length - 1) {
          setIsAnimating(false);
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 1000);
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg shadow-lg">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-2xl font-bold text-gray-800">BBC Website Traceroute</h2>
          <div className="flex items-center gap-2 text-gray-600">
            <Youtube className="w-5 h-5 text-red-600" />
            <a href="https://youtube.com/@itsamuraiteacher" target="_blank" rel="noopener noreferrer" 
               className="text-sm hover:text-blue-600 transition-colors">
              IT Samurai Teacher
            </a>
          </div>
        </div>
        <div className="text-sm text-gray-600 mb-4">Created by Shihab Doole</div>
        
        <div className="flex gap-2 mb-4">
          <button
            onClick={previousHop}
            disabled={currentHop === 0}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>
          <button
            onClick={nextHop}
            disabled={currentHop === hops.length - 1}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
          <button
            onClick={resetTrace}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Reset
          </button>
          <button
            onClick={autoPlay}
            disabled={isAnimating || currentHop === hops.length - 1}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Play className="w-4 h-4" /> Auto Play
          </button>
        </div>
        <div className="text-sm text-gray-600">
          Hop: {currentHop + 1} of {hops.length}
        </div>
      </div>

      <div className="space-y-4">
        {hops.map((hop, index) => (
          <div key={hop.ip} className="relative">
            <div className={`transition-all duration-300 p-4 rounded-lg border-2
              ${hop.type === 'hidden' ? 'border-orange-300 bg-orange-50' :
                index === currentHop ? 'border-yellow-400 bg-yellow-50' : 
                index < currentHop ? 'border-green-500 bg-green-50' : 'border-gray-200 bg-white'}`}>
              <div className="flex items-start gap-4">
                <div className={`${index <= currentHop ? 
                  hop.type === 'hidden' ? 'text-orange-500' : 'text-green-500' 
                  : 'text-gray-400'}`}>
                  {getIcon(hop.type)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-lg">{hop.name}</h3>
                    <MapPin className="w-4 h-4 text-red-500" />
                    <span className="text-sm text-gray-600">{hop.location}</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-1">IP: {hop.ip}</div>
                  <div className="text-sm text-gray-500 mt-1">{hop.detail}</div>
                  {index <= currentHop && (
                    <div className="text-sm text-green-600 mt-1">Response time: {hop.ms}ms</div>
                  )}
                </div>
              </div>
            </div>
            {index < hops.length - 1 && (
              <div className="absolute left-10 h-6 w-px bg-gray-300 -bottom-4"></div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <div>© 2024 IT Samurai Teacher</div>
          <div className="flex items-center gap-2">
            <span>Created by Shihab Doole</span>
            <a href="https://youtube.com/@itsamuraiteacher" 
               target="_blank" 
               rel="noopener noreferrer"
               className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors">
              <Youtube className="w-4 h-4" />
              Subscribe
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TracerouteVisualization;