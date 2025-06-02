// components/sections/project-sandboxes.tsx
'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Shield, Wifi, Activity, Play, Pause, RotateCcw, Github, ExternalLink, Gamepad2 } from 'lucide-react';

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

// Cloudscape Jumper Game Demo
function CloudscapeJumperDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'idle' | 'playing' | 'gameOver'>('idle');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const gameLoopRef = useRef<number>();

  // Game objects
  const player = useRef({ x: 50, y: 200, width: 20, height: 20, velocityY: 0, isJumping: false });
  const clouds = useRef<Array<{ x: number; y: number; width: number; height: number }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize clouds
    clouds.current = [
      { x: 300, y: 250, width: 80, height: 20 },
      { x: 500, y: 180, width: 80, height: 20 },
      { x: 700, y: 220, width: 80, height: 20 },
    ];

    const gameLoop = () => {
      if (gameState !== 'playing') return;

      // Clear canvas
      ctx.fillStyle = '#87CEEB';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update player physics
      const p = player.current;
      p.velocityY += 0.8; // gravity
      p.y += p.velocityY;

      // Ground collision
      if (p.y > canvas.height - p.height - 10) {
        p.y = canvas.height - p.height - 10;
        p.velocityY = 0;
        p.isJumping = false;
      }

      // Cloud collisions
      clouds.current.forEach(cloud => {
        if (p.x < cloud.x + cloud.width &&
            p.x + p.width > cloud.x &&
            p.y < cloud.y + cloud.height &&
            p.y + p.height > cloud.y &&
            p.velocityY > 0) {
          p.y = cloud.y - p.height;
          p.velocityY = 0;
          p.isJumping = false;
        }
      });

      // Move clouds left
      clouds.current.forEach(cloud => {
        cloud.x -= 2;
      });

      // Add new clouds and remove old ones
      if (clouds.current[clouds.current.length - 1].x < canvas.width - 200) {
        clouds.current.push({
          x: canvas.width,
          y: Math.random() * 100 + 150,
          width: 80,
          height: 20
        });
      }
      clouds.current = clouds.current.filter(cloud => cloud.x > -cloud.width);

      // Game over check
      if (p.y > canvas.height) {
        setGameState('gameOver');
        if (score > highScore) setHighScore(score);
        return;
      }

      // Draw ground
      ctx.fillStyle = '#8B4513';
      ctx.fillRect(0, canvas.height - 10, canvas.width, 10);

      // Draw clouds
      ctx.fillStyle = '#FFFFFF';
      clouds.current.forEach(cloud => {
        ctx.fillRect(cloud.x, cloud.y, cloud.width, cloud.height);
        // Add cloud details
        ctx.beginPath();
        ctx.arc(cloud.x + 20, cloud.y, 15, 0, Math.PI * 2);
        ctx.arc(cloud.x + 40, cloud.y, 20, 0, Math.PI * 2);
        ctx.arc(cloud.x + 60, cloud.y, 15, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw player
      ctx.fillStyle = '#FF6B6B';
      ctx.fillRect(p.x, p.y, p.width, p.height);

      // Update score
      setScore(prev => prev + 1);

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    if (gameState === 'playing') {
      gameLoopRef.current = requestAnimationFrame(gameLoop);
    }

    return () => {
      if (gameLoopRef.current) {
        cancelAnimationFrame(gameLoopRef.current);
      }
    };
  }, [gameState, score, highScore]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    player.current = { x: 50, y: 200, width: 20, height: 20, velocityY: 0, isJumping: false };
  };

  const jump = () => {
    if (gameState === 'playing' && !player.current.isJumping) {
      player.current.velocityY = -15;
      player.current.isJumping = true;
    }
  };

  const resetGame = () => {
    setGameState('idle');
    setScore(0);
  };

  return (
    <div className="space-y-4">
      <div className="text-center">
        <h4 className="font-semibold mb-2">Cloudscape Jumper</h4>
        <p className="text-sm text-muted">Jump between clouds and avoid falling! Click Jump or press Spacebar.</p>
      </div>

      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          width={600}
          height={300}
          className="border border-border rounded-lg bg-sky-200"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>

      <div className="flex justify-center items-center gap-4">
        <div className="text-sm">
          <span className="font-semibold">Score: </span>{score}
        </div>
        <div className="text-sm">
          <span className="font-semibold">High Score: </span>{highScore}
        </div>
      </div>

      <div className="flex justify-center gap-2">
        {gameState === 'idle' && (
          <Button onClick={startGame}>
            <Play className="w-4 h-4 mr-2" />
            Start Game
          </Button>
        )}
        {gameState === 'playing' && (
          <Button onClick={jump}>
            <Gamepad2 className="w-4 h-4 mr-2" />
            Jump!
          </Button>
        )}
        {gameState === 'gameOver' && (
          <>
            <Button onClick={startGame}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Play Again
            </Button>
            <Button onClick={resetGame} variant="outline">
              Reset
            </Button>
          </>
        )}
      </div>

      {gameState === 'gameOver' && (
        <div className="text-center p-4 bg-surface border border-border rounded-lg">
          <h4 className="font-bold text-lg mb-2">Game Over!</h4>
          <p className="text-muted">Final Score: {score}</p>
          {score === highScore && score > 0 && (
            <p className="text-primary font-semibold">🎉 New High Score!</p>
          )}
        </div>
      )}

      <div className="text-sm text-muted">
        <p><strong>Game Controls:</strong> Click "Jump!" button or press Spacebar to jump between clouds!</p>
      </div>
    </div>
  );
}

// GitHub Projects Card
function GitHubProjectsCard() {
  return (
    <Card className="max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Github className="w-6 h-6" />
          Explore More Projects
        </CardTitle>
        <CardDescription>
          Check out my complete portfolio of projects, contributions, and code on GitHub
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-between p-6 bg-surface rounded-lg">
          <div>
            <h4 className="font-semibold text-lg mb-2">GitHub Repository</h4>
            <p className="text-muted text-sm mb-4">
              Discover more projects including web applications, machine learning models, 
              cybersecurity tools, and open-source contributions.
            </p>
            <div className="flex flex-wrap gap-2">
              <Badge variant="outline">Python</Badge>
              <Badge variant="outline">JavaScript</Badge>
              <Badge variant="outline">Docker</Badge>
              <Badge variant="outline">Machine Learning</Badge>
              <Badge variant="outline">Cybersecurity</Badge>
            </div>
          </div>
          <Button 
            onClick={() => window.open('https://github.com/Tharunya07', '_blank')}
            className="whitespace-nowrap"
          >
            <ExternalLink className="w-4 h-4 mr-2" />
            View on GitHub
          </Button>
        </div>
      </CardContent>
    </Card>
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
      id: 'cloudscape-jumper',
      title: 'Cloudscape Jumper',
      description: 'Fun cloud-jumping game built with HTML5 Canvas',
      icon: <Gamepad2 className="w-5 h-5" />,
      component: <CloudscapeJumperDemo />
    }
  ];

  // Keyboard controls for the game
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && activeDemo === 'cloudscape-jumper') {
        e.preventDefault();
        // Trigger jump - this would need to be connected to the game component
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeDemo]);

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

        {/* GitHub Projects Card */}
        <GitHubProjectsCard />
      </div>
    </section>
  );
}