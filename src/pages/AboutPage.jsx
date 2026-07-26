import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Target, Users, Shield, Globe, ArrowRight, Heart, Lightbulb } from 'lucide-react';

const values = [
  {
    icon: <Target className="w-6 h-6" />,
    title: 'Transparency',
    description: 'Every job listing links directly to its original source. We never hide where a job comes from.',
  },
  {
    icon: <Shield className="w-6 h-6" />,
    title: 'Privacy First',
    description: 'We do not sell your data. Your search history stays on your device. No tracking, no ads.',
  },
  {
    icon: <Lightbulb className="w-6 h-6" />,
    title: 'Innovation',
    description: 'We use cutting-edge AI to understand what you are looking for and find the best matches across the web.',
  },
  {
    icon: <Heart className="w-6 h-6" />,
    title: 'User-Centered',
    description: 'Built by job seekers, for job seekers. Every feature is designed to make your search easier.',
  },
];

const team = [
  {
    name: 'JobPilot Team',
    role: 'Founded 2026',
    description: 'A small team of engineers and designers who got tired of juggling 10 different job boards. We built JobPilot to solve our own problem and decided to share it with everyone.',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50/50 via-transparent to-transparent" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-primary-200/30 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 border border-primary-100 text-primary-700 text-sm font-medium mb-6"
          >
            <Users className="w-4 h-4" />
            About JobPilot
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-5xl font-extrabold text-surface-900 leading-tight mb-6"
          >
            Job searching should not be
            <br />
            <span className="text-gradient">a full-time job</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-surface-500 max-w-2xl mx-auto leading-relaxed"
          >
            We built JobPilot because we were tired of searching for jobs across 10 different websites,
            copying the same filters, and never knowing if we missed the perfect role. One search bar,
            five platforms, real results.
          </motion.p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-3xl border border-surface-100 p-8 sm:p-12"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-surface-900">Our Mission</h2>
            </div>
            <p className="text-surface-600 leading-relaxed text-lg">
              JobPilot exists to simplify the job search process. We aggregate real job listings from multiple
              platforms into a single, searchable interface. Our AI understands natural language so you can
              describe what you want instead of filling out rigid forms. And every result links directly to the
              original posting so you always know exactly where you are applying.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gradient-to-b from-primary-50/30 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-surface-900 text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-surface-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-12 h-12 rounded-xl bg-primary-100 text-primary-600 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{value.title}</h3>
                <p className="text-sm text-surface-500 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-surface-900 text-center mb-12">The Team</h2>
          {team.map((member, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl border border-surface-100 p-8 text-center max-w-lg mx-auto"
            >
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-600 to-accent-500 flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
                JP
              </div>
              <h3 className="text-xl font-semibold text-surface-900">{member.name}</h3>
              <p className="text-sm text-primary-600 font-medium mb-3">{member.role}</p>
              <p className="text-sm text-surface-500 leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gradient-to-b from-primary-50/30 to-transparent">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-surface-900 text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '1', title: 'You Search', desc: 'Type what you want in plain English. "Senior React developer remote $150K"' },
              { step: '2', title: 'AI Understands', desc: 'Groq AI parses your query into structured search parameters in milliseconds.' },
              { step: '3', title: 'Results Appear', desc: 'Real jobs from 5 platforms, ranked by relevance, with direct apply links.' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary-600 text-white flex items-center justify-center text-xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold text-surface-900 mb-2">{item.title}</h3>
                <p className="text-sm text-surface-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-surface-900 mb-6">Job Sources</h2>
          <p className="text-surface-500 mb-8 max-w-lg mx-auto">
            We pull real, live job listings from these platforms. Every result links back to the original source.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'TheMuse', color: 'from-blue-500 to-blue-600' },
              { name: 'Remotive', color: 'from-rose-500 to-rose-600' },
              { name: 'RemoteOK', color: 'from-red-500 to-red-600' },
              { name: 'Jobicy', color: 'from-purple-500 to-purple-600' },
              { name: 'Arbeitnow', color: 'from-amber-500 to-amber-600' },
              { name: 'Adzuna', color: 'from-sky-500 to-sky-600' },
              { name: 'JobsPipe', color: 'from-teal-500 to-teal-600' },
              { name: 'Greenhouse', color: 'from-lime-500 to-lime-600' },
            ].map((source) => (
              <div
                key={source.name}
                className={`px-6 py-3 rounded-xl bg-gradient-to-br ${source.color} text-white font-semibold shadow-lg`}
              >
                {source.name}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-surface-900 mb-4">Ready to try it?</h2>
          <p className="text-surface-500 mb-8">Start your search in natural language. No sign-up required.</p>
          <Link
            to="/search"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-primary-600 to-primary-700 text-white font-semibold hover:from-primary-700 hover:to-primary-800 transition-all shadow-lg shadow-primary-500/25 active:scale-[0.98]"
          >
            Start Searching
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
