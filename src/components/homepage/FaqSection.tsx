
import React from 'react';
import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FaqSection = () => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const faqs = [
    {
      id: "1",
      question: "How accurate are the AI predictions?",
      answer: "Our AI predictions have shown an average accuracy rate of 64-68% across all sports, which is significantly higher than the industry standard. The system continually learns from new data and results, improving its accuracy over time."
    },
    {
      id: "2",
      question: "Do I need to have betting experience to use the platform?",
      answer: "Not at all. Our platform is designed to be user-friendly for both beginners and experienced bettors. We provide clear explanations of predictions, confidence scores, and recommendations that anyone can understand and apply."
    },
    {
      id: "3",
      question: "How often are predictions updated?",
      answer: "For pre-game predictions, our system updates every 4 hours as new data becomes available. During live events, updates occur in real-time based on game developments, typically within 15-30 seconds of significant game events."
    },
    {
      id: "4",
      question: "Can I use the predictions for fantasy sports?",
      answer: "Absolutely! Many of our users apply our predictions to optimize their fantasy sports lineups. The player performance metrics and match outcome predictions are particularly valuable for fantasy sports decisions."
    },
    {
      id: "5",
      question: "Is there a limit to how many predictions I can access?",
      answer: "Free accounts can access up to 5 predictions per day. Premium subscribers have unlimited access to all predictions across all supported sports and leagues, plus additional features like personalized alerts and historical analysis."
    },
    {
      id: "6",
      question: "How does the AI make predictions?",
      answer: "Our AI system analyzes millions of data points including team/player statistics, historical performance, head-to-head records, weather conditions, venue advantages, recent form, and many other factors. It then applies advanced machine learning models to identify patterns and generate predictions with confidence scores."
    },
  ];

  return (
    <section className="py-20 bg-dark-darker">
      <div className="container px-4">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <h2 className="text-3xl font-bold mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Get answers to the most common questions about our AI prediction platform
          </p>
        </motion.div>
        
        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq) => (
              <AccordionItem 
                key={faq.id} 
                value={faq.id}
                className="border border-dark-border rounded-lg overflow-hidden bg-dark-card/50"
              >
                <AccordionTrigger className="px-6 py-4 hover:bg-dark-card/80 hover:no-underline">
                  <span className="text-left font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FaqSection;
