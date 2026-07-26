import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-surface-500 hover:text-primary-600 transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-2">Privacy Policy</h1>
          <p className="text-sm text-surface-400 mb-10">Last updated: July 26, 2026</p>

          <div className="prose prose-surface max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Introduction</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot AI ("we", "our", "us") operates the JobPilot website and search service. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
              </p>
              <p className="text-surface-600 leading-relaxed mt-2">
                By using JobPilot, you agree to the collection and use of information in accordance with this policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-medium text-surface-800 mb-2">Information You Provide</h3>
              <ul className="list-disc list-inside text-surface-600 space-y-1 mb-4">
                <li>Search queries you type into the search bar</li>
                <li>Filter preferences you select during your session</li>
              </ul>
              <h3 className="text-lg font-medium text-surface-800 mb-2">Information Collected Automatically</h3>
              <ul className="list-disc list-inside text-surface-600 space-y-1">
                <li>Browser type and version</li>
                <li>Device type (desktop, mobile, tablet)</li>
                <li>Pages visited and time spent on each page</li>
                <li>Referring website or source</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-surface-600 leading-relaxed">We use the collected information to:</p>
              <ul className="list-disc list-inside text-surface-600 space-y-1 mt-2">
                <li>Process your job search queries and return relevant results</li>
                <li>Improve the accuracy and relevance of search results</li>
                <li>Understand how users interact with our service to improve the user experience</li>
                <li>Detect and prevent abuse or security issues</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">4. What We Do NOT Do</h2>
              <ul className="list-disc list-inside text-surface-600 space-y-1">
                <li>We do NOT sell your personal data to third parties</li>
                <li>We do NOT track you across other websites</li>
                <li>We do NOT show advertisements</li>
                <li>We do NOT require account creation or sign-up</li>
                <li>We do NOT store your search history permanently</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Third-Party Job Sources</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot aggregates job listings from third-party platforms including TheMuse, Remotive, RemoteOK, Jobicy, and Arbeitnow. When you click "Apply Now" or click on a job listing, you are redirected to the original third-party platform. We encourage you to review the privacy policies of those platforms, as their practices are outside our control.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">6. AI-Powered Search</h2>
              <p className="text-surface-600 leading-relaxed">
                Your search queries are sent to Groq AI (Llama 3.3 model) to parse natural language into structured search parameters. The queries are processed in real-time and are not stored by Groq beyond what is needed for the API call. The parsed results are used only to construct search queries to the job platforms listed above.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Cookies and Local Storage</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot uses browser local storage to remember your filter preferences during your session. We do not use tracking cookies. You can clear local storage at any time through your browser settings.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Data Security</h2>
              <p className="text-surface-600 leading-relaxed">
                We implement reasonable security measures to protect the information we collect. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">9. Children's Privacy</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot is not intended for individuals under the age of 16. We do not knowingly collect personal information from children under 16.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">10. Changes to This Policy</h2>
              <p className="text-surface-600 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated "Last updated" date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">11. Contact Us</h2>
              <p className="text-surface-600 leading-relaxed">
                If you have any questions about this Privacy Policy, please contact us through our website.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
