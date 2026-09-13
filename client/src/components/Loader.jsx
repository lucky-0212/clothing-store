import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="flex items-center justify-center py-32">
      <motion.div
        className="w-8 h-8 border border-ink border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
      />
    </div>
  );
}
