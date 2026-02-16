import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Plus, Trash2, Calculator, CheckCircle, Construction } from "lucide-react";

// 1. Define Types for strict Type-Safety
interface JobItem {
  id: number;
  name: string;
  qty: number;
}

interface RateInfo {
  rate: number;
  unit: string;
}

// 2. The "Price Book" based on your document
const JOB_RATES: Record<string, RateInfo> = {
  "Excavations (strip + pad)": { rate: 220, unit: "m³" },
  "Concrete – Footings (25 MPa)": { rate: 1650, unit: "m³" },
  "Concrete – Slab (25 MPa)": { rate: 1650, unit: "m³" },
  "Reinforcement Steel (Y10/Y12)": { rate: 18500, unit: "t" },
  "Brickwork (230 mm walls)": { rate: 2400, unit: "m³" },
  "Plaster (Internal)": { rate: 85, unit: "m²" },
  "Plaster (External)": { rate: 95, unit: "m²" },
  "Damp Proof Membrane (DPM)": { rate: 45, unit: "m²" },
  "Boundary Wall Brickwork": { rate: 2400, unit: "m³" },
  "Boundary Wall Plaster": { rate: 95, unit: "m²" },
};

const ContactSection = () => {
  // 3. State Management
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [selectedJobs, setSelectedJobs] = useState<JobItem[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // 4. Helper Functions
  const addJobRow = () => {
    const firstJobName = Object.keys(JOB_RATES)[0];
    setSelectedJobs([...selectedJobs, { id: Date.now(), name: firstJobName, qty: 0 }]);
  };

  const removeJobRow = (id: number) => {
    setSelectedJobs(selectedJobs.filter(job => job.id !== id));
  };

  // Type-safe update function (Fixed the 'any' error)
  const updateJob = (id: number, field: keyof JobItem, value: string | number) => {
    setSelectedJobs(prev =>
      prev.map(job => (job.id === id ? { ...job, [field]: value } : job))
    );
  };

  const calculateTotal = () => {
    return selectedJobs.reduce((acc, job) => {
      const rate = JOB_RATES[job.name]?.rate || 0;
      return acc + (job.qty * rate);
    }, 0);
  };

  // 5. WhatsApp Submission Logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJobs.length === 0) {
      alert("Please add at least one line item to your build.");
      return;
    }
    
    setSubmitted(true);

    const breakdown = selectedJobs
      .map(job => {
        const info = JOB_RATES[job.name];
        const subtotal = job.qty * info.rate;
        return `• *${job.name}*: ${job.qty}${info.unit} @ R${info.rate}/u = *R${subtotal.toLocaleString()}*`;
      })
      .join("%0A");

    const whatsappMessage = 
      `*NEW PROJECT QUOTE REQUEST*%0A` +
      `------------------------------------------%0A` +
      `👤 *Client:* ${encodeURIComponent(formData.name)}%0A` +
      `📞 *Phone:* ${encodeURIComponent(formData.phone)}%0A` +
      `📧 *Email:* ${encodeURIComponent(formData.email)}%0A%0A` +
      `*ESTIMATED SCOPE OF WORK:*%0A${breakdown}%0A%0A` +
      `💰 *TOTAL ESTIMATE: R${calculateTotal().toLocaleString()}*%0A` +
      `------------------------------------------%0A` +
      `📝 *Notes:* ${encodeURIComponent(formData.message || "None")}`;

    // Small delay for UX before redirecting
    setTimeout(() => {
      window.open(`https://wa.me/27601133986?text=${whatsappMessage}`, "_blank");
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 bg-slate-50 min-h-screen font-sans">
      <div className="container mx-auto max-w-6xl px-4">
        
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full mb-4 text-blue-600">
            <Construction size={32} />
          </div>
          <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight">Project Cost Builder</h2>
          <p className="text-slate-600 mt-2 max-w-xl mx-auto">
            Select your construction tasks, enter the measurements from your plans, and get an instant estimate.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* LEFT: FORM SECTION */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 1. The Job Builder */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-800">
                <Calculator className="text-blue-500" size={20} /> 1. Add Project Items
              </h3>

              <div className="space-y-4">
                <AnimatePresence>
                  {selectedJobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="grid grid-cols-1 md:grid-cols-12 gap-4 p-5 bg-slate-50 rounded-2xl border border-slate-200 items-end"
                    >
                      <div className="md:col-span-6">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Task Description</label>
                        <select 
                          className="w-full p-3 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                          value={job.name}
                          onChange={(e) => updateJob(job.id, "name", e.target.value)}
                        >
                          {Object.keys(JOB_RATES).map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="md:col-span-3">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Qty ({JOB_RATES[job.name].unit})</label>
                        <input 
                          type="number"
                          step="0.01"
                          className="w-full p-3 border border-slate-200 rounded-xl text-sm text-right focus:ring-2 focus:ring-blue-500 outline-none"
                          placeholder="0.00"
                          onChange={(e) => updateJob(job.id, "qty", parseFloat(e.target.value) || 0)}
                        />
                      </div>

                      <div className="md:col-span-2 text-right">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1 block">Price</label>
                        <p className="text-sm font-bold text-slate-700 h-11 flex items-center justify-end pr-2">
                          R{(job.qty * JOB_RATES[job.name].rate).toLocaleString()}
                        </p>
                      </div>

                      <div className="md:col-span-1 flex justify-end">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full"
                          onClick={() => removeJobRow(job.id)}
                        >
                          <Trash2 size={18} />
                        </Button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                <Button 
                  onClick={addJobRow}
                  variant="outline" 
                  className="w-full border-dashed border-2 py-8 rounded-2xl hover:bg-blue-50 hover:border-blue-300 text-slate-500 transition-all"
                >
                  <Plus className="mr-2 h-5 w-5" /> Add Task from List
                </Button>
              </div>
            </div>

            {/* 2. Contact Details */}
            <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-slate-200">
              <h3 className="text-xl font-bold mb-6 text-slate-800">2. Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-5">
                <div className="space-y-1">
                  <input 
                    placeholder="Full Name" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <input 
                    placeholder="Phone Number" 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <input 
                    placeholder="Email Address" 
                    type="email"
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <textarea 
                    placeholder="Project Site Address or special instructions..." 
                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-sm focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none"
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: STICKY SUMMARY SECTION */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-4">
              <div className="bg-slate-900 text-white p-8 rounded-3xl shadow-2xl relative overflow-hidden">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16" />
                
                <h3 className="text-xl font-bold mb-8 relative z-10 flex justify-between items-center">
                  Quote Summary 
                  <span className="text-xs font-medium bg-white/10 px-3 py-1 rounded-full text-blue-300">
                    {selectedJobs.length} Items
                  </span>
                </h3>
                
                <div className="space-y-4 mb-10 relative z-10 min-h-[100px]">
                  {selectedJobs.length === 0 ? (
                    <p className="text-slate-500 text-sm italic">No items added yet...</p>
                  ) : (
                    selectedJobs.map((job) => (
                      <div key={job.id} className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
                        <span className="text-slate-400 truncate pr-4">{job.name}</span>
                        <span className="font-mono text-blue-200 whitespace-nowrap">
                          R{(job.qty * JOB_RATES[job.name].rate).toLocaleString()}
                        </span>
                      </div>
                    ))
                  )}
                </div>

                <div className="pt-6 relative z-10">
                  <p className="text-slate-400 text-[10px] uppercase tracking-[0.2em] mb-2">Total Estimated Cost</p>
                  <p className="text-5xl font-extrabold text-white mb-8 tracking-tighter">
                    <span className="text-blue-500 text-2xl font-bold mr-1">R</span>
                    {calculateTotal().toLocaleString()}
                  </p>

                  <Button 
                    onClick={handleSubmit}
                    disabled={submitted || selectedJobs.length === 0}
                    className="w-full bg-green-500 hover:bg-green-600 text-white py-8 rounded-2xl text-lg font-bold shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:grayscale"
                  >
                    {submitted ? (
                      <div className="flex items-center gap-2">
                        <CheckCircle size={24} /> Sending...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Send size={20} /> Send Quote to WhatsApp
                      </div>
                    )}
                  </Button>
                  
                  <p className="text-[10px] text-slate-500 mt-6 text-center leading-relaxed italic">
                    * This is a technical estimate based on provided quantities. Final billing occurs after site verification.
                  </p>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="bg-blue-600 p-6 rounded-3xl text-white flex items-center justify-between shadow-lg">
                <div>
                  <p className="text-xs font-bold text-blue-200 uppercase mb-1">Direct Line</p>
                  <p className="text-lg font-bold">060 113 3986</p>
                </div>
                <div className="h-12 w-12 bg-white/20 rounded-2xl flex items-center justify-center">
                  <Construction size={24} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;