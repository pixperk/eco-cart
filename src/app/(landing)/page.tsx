'use client'

import { ShoppingCart, Leaf, Sparkles, List, Users, UserPlus, Star, ArrowRight, PenTool, Bot, Recycle } from 'lucide-react';
import Image from 'next/image';
import { motion } from 'framer-motion';

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900 text-green-900 dark:text-green-100 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-20 pb-32 relative overflow-hidden">
          <div className="text-center space-y-8 relative z-10">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 dark:from-green-400 dark:to-emerald-300 mb-6"
            >
              Smart, Sustainable Shopping with EcoCart
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl sm:text-2xl text-green-700 dark:text-green-300 max-w-3xl mx-auto mb-10"
            >
              Eco-friendly, AI-powered recommendations for conscious shopping. Make a positive impact with every purchase.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-6"
            >
              <button className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl">
                <List className="inline-block mr-2 h-6 w-6" />
                Create Custom List
              </button>
              <button className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl">
                <Sparkles className="inline-block mr-2 h-6 w-6" />
                Try AI Shopping
              </button>
            </motion.div>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-20 relative"
          >
            <Image
              src="/eco.svg"
              alt="EcoCart Illustration"
              width={800}
              height={400}
              className="mx-auto rounded-lg shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-lg"></div>
          </motion.div>

          <div className="absolute top-1/2 left-0 w-64 h-64 bg-green-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 right-0 w-64 h-64 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-64 h-64 bg-lime-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        </section>

        <section id="how-to-use" className="py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-16"
          >
            How to Use EcoCart
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            <HowToCard
              icon={<PenTool className="h-12 w-12 text-green-600 dark:text-green-400" />}
              title="Add Items Manually"
              description="Create your shopping list by adding items manually. Our system will suggest eco-friendly alternatives as you go."
              step="1"
            />
            <HowToCard
              icon={<Bot className="h-12 w-12 text-green-600 dark:text-green-400" />}
              title="AI-Generated Cart"
              description="Let our AI create an eco-friendly cart based on your preferences and shopping history."
              step="2"
            />
            <HowToCard
              icon={<Recycle className="h-12 w-12 text-green-600 dark:text-green-400" />}
              title="Get AI Recommendations"
              description="Receive AI-powered suggestions for eco-friendly alternatives to items in your cart."
              step="3"
            />
          </div>
        </section>

        <section id="features" className="py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-16"
          >
            Features That Make a Difference
          </motion.h2>
          <div className="grid md:grid-cols-2 gap-10 mb-20">
            <FeatureCard
              icon={<ShoppingCart className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="Smart Recommendations"
              description="Get personalized, eco-friendly product suggestions based on your preferences and shopping history."
            />
            <FeatureCard
              icon={<Sparkles className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="AI-Powered Lists"
              description="Let our AI create the perfect eco-friendly shopping list tailored to your needs and preferences."
            />
          </div>
          <div className="grid md:grid-cols-2 gap-10">
            <FeatureCard
              icon={<Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="Collaborative Shopping"
              description="Contribute to your friends' carts and make eco-friendly shopping a group effort."
            />
            <FeatureCard
              icon={<UserPlus className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="Invite Friends"
              description="Spread the eco-friendly movement by inviting friends to join EcoCart."
            />
          </div>
        </section>

        <section id="user-reviews" className="py-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-center text-green-800 dark:text-green-200 mb-16"
          >
            What Our Users Say
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-10">
            <ReviewCard
              name="Sarah L."
              avatar="/sarah.svg"
              review="EcoCart has completely transformed the way I shop. The AI recommendations are spot-on, and I love knowing that my purchases are making a positive impact on the environment."
              rating={5}
            />
            <ReviewCard
              name="Michael T."
              avatar="/michael.svg"
              review="As someone who was always overwhelmed by eco-friendly options, EcoCart made it incredibly easy for me to make sustainable choices. The collaborative shopping feature is a game-changer!"
              rating={5}
            />
            <ReviewCard
              name="Emily R."
              avatar="/emily.svg"
              review="I'm amazed at how much I've learned about sustainability through EcoCart. The sustainability scores have opened my eyes to the impact of my choices, and I feel empowered to make a difference."
              rating={4}
            />
          </div>
        </section>

        <section id="cta" className="py-20 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl font-bold text-green-800 dark:text-green-200 mb-8"
          >
            Ready to Shop Sustainably?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-green-700 dark:text-green-300 mb-12 max-w-2xl mx-auto"
          >
            Join thousands of eco-conscious shoppers and start making a positive impact with every purchase.
          </motion.p>
          <motion.button 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-green-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <ArrowRight className="inline-block ml-2 h-6 w-6" />
          </motion.button>
        </section>
      </main>
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105"
    >
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full mb-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">{title}</h3>
      <p className="text-green-700 dark:text-green-300">{description}</p>
    </motion.div>
  );
}

function HowToCard({ icon, title, description, step }: { icon: React.ReactNode; title: string; description: string; step: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:scale-105 relative overflow-hidden"
    >
      <div className="absolute top-0 left-0 bg-green-500 text-white text-xl font-bold w-12 h-12 flex items-center justify-center rounded-br-xl">
        {step}
      </div>
      <div className="flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-800 rounded-full mb-6 mt-6">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold text-green-800 dark:text-green-200 mb-4">{title}</h3>
      <p className="text-green-700 dark:text-green-300">{description}</p>
    </motion.div>
  );
}

function ReviewCard({ name, avatar, review, rating }: { name: string; avatar: string; review: string; rating: number }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-white dark:bg-green-900 p-8 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
    >
      <div className="flex items-center mb-4">
        <Image
          src={avatar}
          alt={`Avatar of ${name}`}
          width={80}
          height={80}
          className="rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold text-green-800 dark:text-green-200">{name}</h3>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <Star key={i} className="h-5 w-5 text-green-400 fill-current" />
            ))}
          </div>
        </div>
      </div>
      <p className="text-green-700 dark:text-green-300 italic">&ldquo;{review}&rdquo;</p>
    </motion.div>
  );
}