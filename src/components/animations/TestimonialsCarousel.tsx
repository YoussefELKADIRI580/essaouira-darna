"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ChevronLeft, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "بفضل جمعية الصويرة دارنا، تمكنت من إكمال دراستي والحصول على شهادة البكالوريا. الدار كانت لي بمثابة العائلة الحقيقية التي لم أحظَ بها من قبل.",
    author: "ياسين، 19 سنة",
    role: "مستفيد سابق، طالب جامعي حالياً",
  },
  {
    id: 2,
    quote: "زيارتي للدار ورؤية البسمة على وجوه الأطفال جعلتني أدرك حجم الأثر الكبير الذي تتركه التبرعات. المكان يعج بالحب والرعاية والعمل الدؤوب.",
    author: "سارة م.",
    role: "متبرعة ومتطوعة",
  },
  {
    id: 3,
    quote: "العمل مع هؤلاء الأطفال علمنا الكثير عن الصبر وقوة الإرادة. كل طفل هنا لديه إمكانات هائلة، ونحن نوفر لهم البيئة لتزدهر هذه الإمكانات.",
    author: "مريم التازي",
    role: "مربية بالجمعية",
  },
];

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prev) => (prev + newDirection + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 8000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-12 py-8 overflow-hidden select-none">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 text-primary/10">
        <Quote className="w-32 h-32 rotate-180" />
      </div>
      
      <div className="relative h-[280px] sm:h-[220px] flex items-center justify-center mt-8">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ x: { type: "spring", stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);
              if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
              } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
              }
            }}
            className="absolute w-full flex flex-col items-center text-center gap-6 cursor-grab active:cursor-grabbing px-4"
          >
            <p className="text-xl md:text-2xl lg:text-3xl font-heading font-bold leading-relaxed text-charcoal">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex flex-col gap-1 mt-4">
              <span className="font-bold text-primary text-lg">{testimonials[currentIndex].author}</span>
              <span className="text-sm text-charcoal/60 font-medium tracking-wide">
                {testimonials[currentIndex].role}
              </span>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <button
        className="hidden sm:flex absolute top-1/2 right-0 -translate-y-1/2 p-3 rounded-full bg-surface border border-border-custom text-charcoal hover:bg-primary hover:text-white transition-colors z-10 shadow-md"
        onClick={() => paginate(-1)}
        aria-label="Previous testimonial"
      >
        <ChevronRight className="w-6 h-6" />
      </button>
      <button
        className="hidden sm:flex absolute top-1/2 left-0 -translate-y-1/2 p-3 rounded-full bg-surface border border-border-custom text-charcoal hover:bg-primary hover:text-white transition-colors z-10 shadow-md"
        onClick={() => paginate(1)}
        aria-label="Next testimonial"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <div className="flex justify-center gap-3 mt-8">
        {testimonials.map((_, idx) => (
          <button
            key={idx}
            onClick={() => {
              setDirection(idx > currentIndex ? 1 : -1);
              setCurrentIndex(idx);
            }}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              idx === currentIndex ? "bg-primary w-8" : "bg-primary/20 hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
