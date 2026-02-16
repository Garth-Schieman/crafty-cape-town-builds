import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Send, Plus, Trash2, Calculator, CheckCircle } from "lucide-react";

// The "Price Book" based on your document
const JOB_RATES: Record<string, { rate: number; unit: string }> = {
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
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [selectedJobs, setSelectedJobs] = useState<{ id: number; name: string; qty: number }[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const addJobRow = () => {
    setSelectedJobs([...selectedJobs, { id: Date.now(), name: Object.keys(JOB_RATES)[0], qty: 0 }]);
  };

  const removeJobRow = (id: number) => {
    setSelectedJobs(selectedJobs.filter(job => job.id !== id));
  };

  const updateJob = (id: number, field: "name" | "qty", value: any) => {
    setSelectedJobs(selectedJobs.map(job => job.id === id ? { ...job, [field]: value } : job));
  };

  const calculateTotal = () => {
    return selectedJobs.reduce((acc, job) => acc + (job.qty * (JOB_RATES[job.name]?.rate || 0)), 0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedJobs.length === 0) return alert("Please add at least one job item.");
    
    setSubmitted(true);

    const breakdown = selectedJobs
      .map(job => `• *${job.name}*: ${job.qty}${JOB_RATES[job.name].unit} @ R${JOB_RATES[job.name].rate}/u = *R${(job.qty * JOB_RATES[job.name].rate).toLocaleString()}*`)
      .join("%0A");

    const text = 
      `*OFFICIAL QUOTE REQUEST*%0A` +
      `------------------------------------------%0A` +
      `👤 *Client:* ${formData.name}%0A` +
      `📞 *Phone:* ${formData.phone}%0A` +
      `📧 *Email:* ${formData.email}%0A%0A` +
      `*PROJECT SCOPE:*%0A${breakdown}%0A%0A` +
      `💰 *ESTIMATED TOTAL: R${calculateTotal().toLocaleString()}*%0A` +
      `------------------------------------------%0A` +
      `📝 *Notes:* ${formData.message || "None"}`;

    setTimeout(() => {
      window.open(`https://wa.me/27601133986?text=${text}`, "_blank");
    }, 1200);
  };

  return (
    <section className="py-16 bg-slate-50 min-h-screen">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Builder Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Calculator className="text-primary" /> Itemized Project Builder
              </h2>

              <div className="space-y-4 mb-6">
                <AnimatePresence>
                  {selectedJobs.map((job) => (
                    <motion.div 
                      key={job.id}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex flex-wrap md:flex-nowrap items-end gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200"
                    >
                      <div className="flex-1 min-w-[200px]">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Select Job Type</label>
                        <select 
                          className="w-full p-2.5 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-primary"
                          value={job.name}
                          onChange={(e) => updateJob(job.id, "name", e.target.value)}
                        >
                          {Object.keys(JOB_RATES).map(name => (
                            <option key={name} value={name}>{name}</option>
                          ))}
                        </select>
                      </div>

                      <div className="w-24">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Qty ({JOB_RATES[job.name].unit})</label>
                        <input 
                          type="number"
                          className="w-full p-2 border rounded-lg text-sm text-right"
                          placeholder="0.0"
                          onChange={(e) => updateJob(job.id, "qty", Number(e.target.value))}
                        />
                      </div>

                      <div className="w-32 hidden md:block">
                        <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Subtotal</label>
                        <div className="p-2 text-sm font-semibold text-slate-700 bg-white border rounded-lg text-right">
                          R{(job.qty * JOB_RATES[job.name].rate).toLocaleString()}
                        </div>
                      </div>

                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="text-red-500 hover:bg-red-50"
                        onClick={() => removeJobRow(job.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>

              <Button 
                onClick={addJobRow}
                variant="outline" 
                className="w-full border-dashed border-2 py-6 hover:bg-slate-50 text-slate-600"
              >
                <Plus className="mr-2 h-4 w-4" /> Add Line Item
              </Button>
            </div>

            {/* Client Details */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <h3 className="text-lg font-bold mb-4">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <input 
                  placeholder="Your Name" 
                  className="p-3 border rounded-xl text-sm w-full"
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
                <input 
                  placeholder="Phone Number" 
                  className="p-3 border rounded-xl text-sm w-full"
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
                <input 
                  placeholder="Email Address" 
                  className="p-3 border rounded-xl text-sm w-full md:col-span-2"
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
                <textarea 
                  placeholder="Site details or additional requests..." 
                  className="p-3 border rounded-xl text-sm w-full md:col-span-2 h-24"
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                />
              </div>
            </div>
          </div>

          {/* Sticky Summary & Submit */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 bg-slate-900 text-white p-6 rounded-2xl shadow-xl">
              <h3 className="text-xl font-bold mb-6 flex justify-between items-center">
                Summary <span className="text-blue-400 text-sm font-normal">{selectedJobs.length} items</span>
              </h3>
              
              <div className="space-y-3 mb-8">
                {selectedJobs.map((job) => (
                   <div key={job.id} className="flex justify-between text-xs text-slate-400">
                     <span className="truncate max-w-[120px]">{job.name}</span>
                     <span>R{(job.qty * JOB_RATES[job.name].rate).toLocaleString()}</span>
                   </div>
                ))}
              </div>

              <div className="border-t border-slate-700 pt-4 mb-8">
                <p className="text-slate-400 text-xs uppercase mb-1">Total Estimated Amount</p>
                <p className="text-4xl font-bold text-white">R{calculateTotal().toLocaleString()}</p>
              </div>

              <Button 
                onClick={handleSubmit}
                disabled={submitted}
                className="w-full bg-green-500 hover:bg-green-600 text-white py-7 rounded-xl text-lg font-bold shadow-lg transition-transform active:scale-95"
              >
                {submitted ? <CheckCircle className="mr-2" /> : <Send className="mr-2" />}
                {submitted ? "Sending Quote..." : "Send Quote to WhatsApp"}
              </Button>
              
              <p className="text-[10px] text-slate-500 mt-4 text-center">
                *Final pricing subject to official site assessment and material fluctuations.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;