// components/sections/project-sandboxes.tsx
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Shield, Wifi, Activity, Play, Pause, RotateCcw } from 'lucide-react';

// CipherYou File Encryption Demo
function CipherYouDemo() {
  const [inputText, setInputText] = useState('');
  const [password, setPassword] = useState('');
  const [encryptedText, setEncryptedText] = useState('');
  const [isEncrypted, setIsEncrypted] = useState(false);

  const handleEncrypt = () => {
    if (!inputText || !password) return;
    // Simple Base64 encoding for demo (not real encryption)
    const encoded = btoa(inputText + ':' + password);
    setEncryptedText(encoded);
    setIsEncrypted(true);
  };

  const handleDecrypt = () => {
    if (!encryptedText || !password) return;
    try {
      const decoded = atob(encryptedText);
      const [originalText, originalPassword] = decoded.split(':');
      if (originalPassword === password) {
        setInputText(originalText);
        setIsEncrypted(false);
      } else {
        alert('Incorrect password!');
      }
    } catch {
      alert('Invalid encrypted text!');
    }
  };

  const handleReset = () => {
    setInputText('');
    setPassword('');
    setEncryptedText('');
    setIsEncrypted(false);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Text to Encrypt/Decrypt</label>
          <Textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter your secret message..."
            className="h-20"
            disabled={isEncrypted}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter encryption password..."
          />
        </div>
        {encryptedText && (
          <div>
            <label className="block text-sm font-medium mb-2">Encrypted Output</label>
            <Textarea
              value={encryptedText}
              onChange={(e) => setEncryptedText(e.target.value)}
              className="h-20 font-mono text-sm"
              placeholder="Encrypted text will appear here..."
            />
          </div>
        )}
      </div>
      <div className="flex gap-2">
        <Button onClick={handleEncrypt} disabled={!inputText || !password || isEncrypted}>
          <Lock className="w-4 h-4 mr-2" />
          Encrypt
        </Button>
        <Button onClick={handleDecrypt} disabled={!encryptedText || !password || !isEncrypted} variant="outline">
          <Unlock className="w-4 h-4 mr-2" />
          Decrypt
        </Button>
        <Button onClick={handleReset} variant="ghost">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>
      <div className="text-sm text-muted">
        <p><strong>Note:</strong> This is a demo using Base64 encoding. Real CipherYou uses AES-256 encryption.</p>
      </div>
    </div>
  );
}

// Wiresnitch Network Monitor Demo
function WiresnitchDemo() {
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [packets, setPackets] = useState<Array<{id: number, source: string, dest: string, protocol: string, size: number, status: 'safe' | 'suspicious' | 'blocked'}>>([]);
  const [packetId, setPacketId] = useState(0);

  const protocols = ['HTTP', 'HTTPS', 'TCP', 'UDP', 'SSH', 'FTP'];
  const sources = ['192.168.1.10', '10.0.0.5', '172.16.0.1', '203.0.113.1'];
  const destinations = ['google.com', 'github.com', 'suspicious-site.evil', 'cdn.jsdelivr.net'];

  const generatePacket = () => {
    const source = sources[Math.floor(Math.random() * sources.length)];
    const dest = destinations[Math.floor(Math.random() * destinations.length)];
    const protocol = protocols[Math.floor(Math.random() * protocols.length)];
    const size = Math.floor(Math.random() * 1500) + 64;
    
    let status: 'safe' | 'suspicious' | 'blocked' = 'safe';
    if (dest.includes('suspicious') || protocol === 'FTP') {
      status = Math.random() > 0.5 ? 'suspicious' : 'blocked';
    }

    return {
      id: packetId,
      source,
      dest,
      protocol,
      size,
      status
    };
  };

  const startMonitoring = () => {
    setIsMonitoring(true);
    const interval = setInterval(() => {
      if (packets.length >= 10) {
        setPackets(prev => [...prev.slice(1), generatePacket()]);
      } else {
        setPackets(prev => [...prev, generatePacket()]);
      }
      setPacketId(prev => prev + 1);
    }, 800);

    setTimeout(() => {
      clearInterval(interval);
      setIsMonitoring(false);
    }, 8000);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    setPackets([]);
    setPacketId(0);
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2 items-center">
        <Button 
          onClick={startMonitoring} 
          disabled={isMonitoring}
          className="bg-green-600 hover:bg-green-700"
        >
          <Play className="w-4 h-4 mr-2" />
          Start Monitoring
        </Button>
        <Button onClick={stopMonitoring} variant="outline">
          <Pause className="w-4 h-4 mr-2" />
          Stop
        </Button>
        <div className="flex items-center gap-2 ml-4">
          <Activity className={`w-4 h-4 ${isMonitoring ? 'text-green-500 animate-pulse' : 'text-gray-400'}`} />
          <span className="text-sm">{isMonitoring ? 'Active' : 'Inactive'}</span>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-lg p-4 h-64 overflow-y-auto">
        <div className="font-mono text-xs space-y-1">
          {packets.length === 0 ? (
            <div className="text-muted text-center py-8">
              <Wifi className="w-8 h-8 mx-auto mb-2 opacity-50" />
              No packets captured. Start monitoring to see network traffic.
            </div>
          ) : (
            packets.map((packet) => (
              <div 
                key={packet.id} 
                className={`flex justify-between items-center p-2 rounded border-l-4 ${
                  packet.status === 'safe' ? 'border-l-green-500 bg-green-50 dark:bg-green-900/20' :
                  packet.status === 'suspicious' ? 'border-l-yellow-500 bg-yellow-50 dark:bg-yellow-900/20' :
                  'border-l-red-500 bg-red-50 dark:bg-red-900/20'
                }`}
              >
                <div className="flex gap-4 text-xs">
                  <span className="w-24 truncate">{packet.source}</span>
                  <span>→</span>
                  <span className="w-32 truncate">{packet.dest}</span>
                  <Badge variant="outline" className="text-xs">{packet.protocol}</Badge>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <span>{packet.size}B</span>
                  <Badge 
                    variant={packet.status === 'safe' ? 'primary' : packet.status === 'suspicious' ? 'secondary' : 'outline'}
                    className="text-xs"
                  >
                    {packet.status}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="text-sm text-muted">
        <p><strong>Demo:</strong> Simulated network traffic with basic threat detection. Real Wiresnitch analyzes actual packets.</p>
      </div>
    </div>
  );
}

// Raspberry Pi GPIO Simulator
function RaspberryPiDemo() {
  const [pinStates, setPinStates] = useState<{[key: number]: boolean}>({});
  const [selectedPin, setSelectedPin] = useState<number | null>(null);

  const gpioPins = [
    { pin: 2, name: 'SDA1' }, { pin: 3, name: 'SCL1' }, { pin: 4, name: 'GPIO4' },
    { pin: 5, name: 'GPIO5' }, { pin: 6, name: 'GND' }, { pin: 7, name: 'GPIO7' },
    { pin: 8, name: 'TXD' }, { pin: 9, name: 'GND' }, { pin: 10, name: 'RXD' },
    { pin: 11, name: 'GPIO11' }, { pin: 12, name: 'GPIO12' }, { pin: 13, name: 'GPIO13' },
    { pin: 14, name: 'GND' }, { pin: 15, name: 'GPIO15' }, { pin: 16, name: 'GPIO16' },
    { pin: 17, name: '3V3' }, { pin: 18, name: 'GPIO18' }, { pin: 19, name: 'GPIO19' },
    { pin: 20, name: 'GND' }, { pin: 21, name: 'GPIO21' }, { pin: 22, name: 'GPIO22' },
    { pin: 23, name: 'GPIO23' }, { pin: 24, name: 'GPIO24' }, { pin: 25, name: 'GND' },
    { pin: 26, name: 'GPIO26' }
  ];

  const togglePin = (pin: number) => {
    if (pin === 6 || pin === 9 || pin === 14 || pin === 20 || pin === 25 || pin === 17) return; // Ground/Power pins
    setPinStates(prev => ({ ...prev, [pin]: !prev[pin] }));
  };

  const isPowerPin = (pin: number) => pin === 17;
  const isGroundPin = (pin: number) => [6, 9, 14, 20, 25].includes(pin);
  const isGPIOPin = (pin: number) => !isPowerPin(pin) && !isGroundPin(pin);

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-semibold mb-2">Raspberry Pi 4 GPIO Simulator</h4>
        <p className="text-sm text-muted">Click GPIO pins to toggle HIGH/LOW states</p>
      </div>

      <div className="flex justify-center">
        <div className="grid grid-cols-2 gap-1 p-4 bg-green-100 dark:bg-green-900/20 rounded-lg border-2 border-green-300">
          {gpioPins.map((pin, index) => {
            const isActive = pinStates[pin.pin];
            const canToggle = isGPIOPin(pin.pin);
            
            return (
              <button
                key={pin.pin}
                onClick={() => canToggle && togglePin(pin.pin)}
                onMouseEnter={() => setSelectedPin(pin.pin)}
                onMouseLeave={() => setSelectedPin(null)}
                disabled={!canToggle}
                className={`
                  w-8 h-8 rounded-full border-2 text-xs font-bold flex items-center justify-center transition-all
                  ${isPowerPin(pin.pin) ? 'bg-red-500 border-red-600 text-white cursor-not-allowed' :
                    isGroundPin(pin.pin) ? 'bg-black border-gray-600 text-white cursor-not-allowed' :
                    isActive ? 'bg-yellow-400 border-yellow-500 text-black shadow-lg cursor-pointer' :
                    'bg-gray-200 dark:bg-gray-700 border-gray-400 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-600'
                  }
                  ${selectedPin === pin.pin ? 'ring-2 ring-blue-400' : ''}
                `}
                title={`Pin ${pin.pin}: ${pin.name} ${isActive ? '(HIGH)' : '(LOW)'}`}
              >
                {pin.pin}
              </button>
            );
          })}
        </div>
      </div>

      {selectedPin && (
        <div className="text-center p-3 bg-surface border border-border rounded-lg">
          <p className="font-semibold">Pin {selectedPin}: {gpioPins.find(p => p.pin === selectedPin)?.name}</p>
          <p className="text-sm text-muted">
            {isPowerPin(selectedPin) ? '3.3V Power Supply' :
             isGroundPin(selectedPin) ? 'Ground Pin' :
             `GPIO Pin - State: ${pinStates[selectedPin] ? 'HIGH (3.3V)' : 'LOW (0V)'}`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <span>Power (3.3V)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-black rounded-full"></div>
          <span>Ground</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <span>GPIO High</span>
        </div>
      </div>

      <div className="text-sm text-muted">
        <p><strong>Simulator:</strong> Interactive GPIO pin visualization. Real Pi controls physical hardware!</p>
      </div>
    </div>
  );
}

export function ProjectSandboxes() {
  const [activeDemo, setActiveDemo] = useState<string>('cipheryou');

  const demos = [
    {
      id: 'cipheryou',
      title: 'CipherYou',
      description: 'File encryption tool with AES-256 security',
      icon: <Shield className="w-5 h-5" />,
      component: <CipherYouDemo />
    },
    {
      id: 'wiresnitch',
      title: 'Wiresnitch',
      description: 'Real-time network security monitor',
      icon: <Wifi className="w-5 h-5" />,
      component: <WiresnitchDemo />
    },
    {
      id: 'raspberry-pi',
      title: 'Raspberry Pi GPIO',
      description: 'Interactive GPIO pin simulator',
      icon: <Activity className="w-5 h-5" />,
      component: <RaspberryPiDemo />
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 text-primary">Project Sandboxes</h2>
          <p className="text-xl text-muted max-w-2xl mx-auto">
            Interactive demos of my projects. Try them out and see the code in action!
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {demos.map((demo) => (
            <Button
              key={demo.id}
              onClick={() => setActiveDemo(demo.id)}
              variant={activeDemo === demo.id ? 'primary' : 'outline'}
              className="flex items-center gap-2"
            >
              {demo.icon}
              {demo.title}
            </Button>
          ))}
        </div>

        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {demos.find(d => d.id === activeDemo)?.icon}
              {demos.find(d => d.id === activeDemo)?.title}
            </CardTitle>
            <CardDescription>
              {demos.find(d => d.id === activeDemo)?.description}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {demos.find(d => d.id === activeDemo)?.component}
          </CardContent>
        </Card>
      </div>
    </section>
  );
}