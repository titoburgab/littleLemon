import { motion } from "motion/react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <motion.div
        className="relative h-screen flex flex-col"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Hero Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1764397514690-82da4d4c40ed?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
            alt="Mediterranean cuisine"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex-1 flex flex-col justify-between px-6 pt-16 pb-12">
          {/* Brand */}
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-2xl">🍋</span>
              </div>
            </div>
            <h1 className="text-5xl text-white mb-2 tracking-tight">
              Little Lemon
            </h1>
            <p className="text-yellow-400 text-xl">Mediterranean Kitchen</p>
          </motion.div>

          {/* Bottom Content */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-white/90 text-lg mb-8 max-w-sm">
              Fresh flavors from the Mediterranean coast, crafted with passion
              and tradition.
            </p>

            {/* CTA Button */}
            <motion.button
              onClick={() => navigate("/reservation")}
              className="w-full bg-yellow-400 text-black py-4 px-6 rounded-full flex items-center justify-between group"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="text-lg font-medium">Reserve a Table</span>
              <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
