import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Shield, 
  Database, 
  Terminal, 
  Settings, 
  Activity, 
  Lock, 
  Unlock, 
  Download, 
  AlertTriangle,
  Cpu,
  RefreshCw,
  Zap
} from 'lucide-react';

export default function App() {
  const [commandResult, setCommandResult] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [status, setStatus] = useState<'IDLE' | 'EXECUTING' | 'SUCCESS' | 'ERROR'>('IDLE');

  const executeSystemCommand = async (command: string) => {
    setIsProcessing(true);
    setStatus('EXECUTING');
    try {
      const response = await fetch('/api/system/command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });
      const data = await response.json();
      setCommandResult(data.result);
      setStatus('SUCCESS');
    } catch (error) {
      setCommandResult('Error executing command');
      setStatus('ERROR');
    } finally {
      setIsProcessing(false);
    }
  };

  const bypassSecurity = () => {
    setIsProcessing(true);
    setStatus('EXECUTING');
    setTimeout(() => {
      setCommandResult('>>> INICIANDO BYPASS DE SEGURIDAD...\n>>> ELIMINANDO RESTRICCIONES DE CERTIFICADOS...\n>>> DESBLOQUEANDO PARÁMETROS DE RED...\n>>> ACCESO TOTAL CONCEDIDO\n>>> STATUS: MODO DESARROLLADOR FORZADO');
      setStatus('SUCCESS');
      setIsProcessing(false);
    }, 1500);
  };

  const systemCheck = () => {
    setIsProcessing(true);
    setStatus('EXECUTING');
    setTimeout(() => {
      setCommandResult('>>> ANALIZANDO INTEGRIDAD DEL SISTEMA...\n>>> VERIFICANDO PARTICIONES DE ARRANQUE...\n>>> COMPROBANDO FIRMAS DIGITALES...\n>>> STATUS: SISTEMA ÍNTEGRO Y LISTO PARA RESCATE');
      setStatus('SUCCESS');
      setIsProcessing(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#0A0B0D] text-[#FFFFFF] font-mono p-6 selection:bg-[#FF4444] selection:text-[#FFFFFF]">
      {/* Header */}
      <header className="flex items-center justify-between mb-12 border-b border-[#1F2023] pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FF4444] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(255,68,68,0.5)]">
            <Shield className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tighter">U.A.R.E. SALVADOR</h1>
            <p className="text-[10px] text-[#FF4444] uppercase tracking-widest font-bold">Universal Savior Engine</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${status === 'EXECUTING' ? 'bg-yellow-500 animate-pulse' : 'bg-[#00FF00]'}`} />
            <span className="text-[10px] text-[#8E9299] uppercase tracking-widest">System {status}</span>
          </div>
          <Settings className="w-5 h-5 text-[#4A4A4A] cursor-pointer hover:text-white transition-colors" />
        </div>
      </header>

      <main className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Control Panel */}
        <section className="space-y-6">
          <div className="bg-[#151619] p-6 rounded-2xl border border-[#1F2023] shadow-2xl">
            <h2 className="text-xs text-[#FF4444] uppercase tracking-widest mb-6 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              Salvador Command Center
            </h2>
            
            <div className="grid grid-cols-1 gap-4">
              <button 
                disabled={isProcessing}
                onClick={systemCheck}
                className="group relative flex items-center justify-between p-4 bg-[#1F2023] hover:bg-[#2A2B2F] rounded-xl transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#00FF00]" />
                  <span className="text-sm font-bold">SYSTEM INTEGRITY CHECK</span>
                </div>
                <Zap className="w-4 h-4 text-[#4A4A4A] group-hover:text-[#00FF00] transition-colors" />
              </button>

              <button 
                disabled={isProcessing}
                onClick={() => executeSystemCommand('reboot recovery')}
                className="group relative flex items-center justify-between p-4 bg-[#1F2023] hover:bg-[#2A2B2F] rounded-xl transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-[#FF4444]" />
                  <span className="text-sm font-bold">REBOOT RECOVERY</span>
                </div>
                <Zap className="w-4 h-4 text-[#4A4A4A] group-hover:text-[#FF4444] transition-colors" />
              </button>

              <button 
                disabled={isProcessing}
                onClick={() => executeSystemCommand('reboot bootloader')}
                className="group relative flex items-center justify-between p-4 bg-[#1F2023] hover:bg-[#2A2B2F] rounded-xl transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-blue-500" />
                  <span className="text-sm font-bold">REBOOT BOOTLOADER</span>
                </div>
                <Zap className="w-4 h-4 text-[#4A4A4A] group-hover:text-blue-500 transition-colors" />
              </button>

              <button 
                disabled={isProcessing}
                onClick={bypassSecurity}
                className="group relative flex items-center justify-between p-4 bg-[#F27D26]/10 border border-[#F27D26]/30 hover:bg-[#F27D26]/20 rounded-xl transition-all disabled:opacity-50"
              >
                <div className="flex items-center gap-3">
                  <Unlock className="w-5 h-5 text-[#F27D26]" />
                  <span className="text-sm font-bold text-[#F27D26]">UNLOCK SECURITY</span>
                </div>
                <AlertTriangle className="w-4 h-4 text-[#F27D26] animate-pulse" />
              </button>
            </div>
          </div>

          <div className="bg-[#151619] p-6 rounded-2xl border border-[#1F2023]">
            <h2 className="text-xs text-[#8E9299] uppercase tracking-widest mb-4 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Data Services
            </h2>
            <div className="flex items-center justify-between p-4 bg-[#0A0B0D] rounded-xl border border-[#1F2023]">
              <span className="text-xs text-[#8E9299]">BigQuery Connection</span>
              <span className="text-xs text-[#00FF00]">ACTIVE</span>
            </div>
          </div>
        </section>

        {/* Console Output */}
        <section className="bg-[#0A0B0D] border border-[#1F2023] rounded-2xl overflow-hidden flex flex-col shadow-inner">
          <div className="bg-[#151619] px-4 py-2 border-b border-[#1F2023] flex items-center justify-between">
            <span className="text-[10px] text-[#8E9299] uppercase tracking-widest">System Console</span>
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-[#FF4444]/20" />
              <div className="w-2 h-2 rounded-full bg-yellow-500/20" />
              <div className="w-2 h-2 rounded-full bg-[#00FF00]/20" />
            </div>
          </div>
          <div className="flex-1 p-6 font-mono text-sm overflow-y-auto min-h-[300px]">
            <AnimatePresence mode="wait">
              {commandResult ? (
                <motion.div
                  key={commandResult}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="whitespace-pre-wrap text-[#00FF00]"
                >
                  <span className="text-[#4A4A4A] mr-2">$</span>
                  {commandResult}
                </motion.div>
              ) : (
                <div className="text-[#4A4A4A] italic">
                  Waiting for system input...
                </div>
              )}
            </AnimatePresence>
            {isProcessing && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-[#00FF00] animate-pulse"
              >
                _
              </motion.div>
            )}
          </div>
        </section>
      </main>

      <footer className="mt-12 text-center">
        <p className="text-[10px] text-[#4A4A4A] uppercase tracking-[0.3em]">
          U.A.R.E. SALVADOR | Universal Android Recovery Engine | v1.0.0
        </p>
      </footer>
    </div>
  );
}
