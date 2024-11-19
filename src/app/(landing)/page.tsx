'use client'

import { LoginLink } from '@kinde-oss/kinde-auth-nextjs/components';
import { motion } from 'framer-motion';
import { ArrowRight, Leaf, List, ShoppingCart, Sparkles, Star, Users } from 'lucide-react';
import Image from 'next/image';

export default function EnhancedLandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-green-950 dark:to-gray-900 text-green-900 dark:text-green-100 font-sans transition-colors duration-300">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="pt-20 pb-32 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 space-y-8 text-center lg:text-left"
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500 dark:from-green-400 dark:to-emerald-300">
                Smart, Sustainable Shopping with EcoCart
              </h1>
              <p className="text-xl sm:text-2xl text-green-700 dark:text-green-300 max-w-3xl mx-auto lg:mx-0">
                Eco-friendly, AI-powered recommendations for conscious shopping. Make a positive impact with every purchase.
              </p>
              <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-6">
                <LoginLink postLoginRedirectURL='/dashboard' className="bg-green-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  <List className="mr-2 h-6 w-6" />
                  Create Custom List
                </LoginLink>
                <LoginLink postLoginRedirectURL='/dashboard/ai-cart' className="bg-emerald-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-emerald-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
                  <Sparkles className="mr-2 h-6 w-6" />
                  Let AI Do Everything
                </LoginLink>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex-1 mt-10 lg:mt-0"
            >
              <div className="relative aspect-[4/3] w-full max-w-[500px] mx-auto">
                <Image
                  src="/eco.svg"
                  alt="EcoCart App Preview"
                  layout="fill"
                  objectFit="contain"
                  priority
                />
              </div>
            </motion.div>
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
          <div className="grid md:grid-cols-2 gap-10">
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
            <FeatureCard
              icon={<Users className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="Collaborative Shopping"
              description="Contribute to your friends' carts and make eco-friendly shopping a group effort."
            />
            <FeatureCard
              icon={<Leaf className="h-12 w-12 text-emerald-600 dark:text-emerald-400" />}
              title="Eco Impact Tracking"
              description="See the positive environmental impact of your shopping choices in real-time."
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
              review="I'm amazed at how much I've learned about sustainability through EcoCart. The eco impact tracking has opened my eyes to the impact of my choices, and I feel empowered to make a difference."
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
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <LoginLink className="bg-green-600 text-white px-10 py-5 rounded-full text-xl font-semibold hover:bg-green-700 transition-colors transform hover:scale-105 shadow-lg hover:shadow-xl inline-flex items-center justify-center">
              Get Started Now
              <ArrowRight className="ml-2 h-6 w-6" />
            </LoginLink>
          </motion.div>
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
          width={60}
          height={60}
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