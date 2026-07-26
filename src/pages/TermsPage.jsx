import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
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
          <h1 className="text-3xl sm:text-4xl font-bold text-surface-900 mb-2">Terms of Service</h1>
          <p className="text-sm text-surface-400 mb-10">Last updated: July 26, 2026</p>

          <div className="prose prose-surface max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-surface-600 leading-relaxed">
                By accessing or using JobPilot AI ("Service", "Website"), you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use the Service.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">2. Description of Service</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot is a job search aggregator that uses artificial intelligence to help users search for jobs across multiple third-party platforms. The Service provides:
              </p>
              <ul className="list-disc list-inside text-surface-600 space-y-1 mt-2">
                <li>Natural language job search powered by AI</li>
                <li>Aggregated job listings from third-party platforms</li>
                <li>Direct links to original job postings on source platforms</li>
                <li>AI-generated insights about search results</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">3. Your Responsibilities</h2>
              <p className="text-surface-600 leading-relaxed">When using JobPilot, you agree to:</p>
              <ul className="list-disc list-inside text-surface-600 space-y-1 mt-2">
                <li>Use the Service only for lawful purposes</li>
                <li>Not attempt to disrupt, overload, or abuse the Service</li>
                <li>Not use automated tools (bots, scrapers) to access the Service</li>
                <li>Not attempt to reverse-engineer or extract the source code</li>
                <li>Not use the Service to collect user data for commercial purposes</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">4. Job Listings and Applications</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot aggregates listings from third-party platforms. We do not employ you, nor do we guarantee the accuracy, completeness, or legitimacy of any job listing. When you apply for a job through JobPilot, you are redirected to the original third-party platform, and your application is subject to that platform's terms and conditions.
              </p>
              <p className="text-surface-600 leading-relaxed mt-2">
                We are not responsible for:
              </p>
              <ul className="list-disc list-inside text-surface-600 space-y-1 mt-2">
                <li>The accuracy of job listings or salary information</li>
                <li>The hiring practices of any employer</li>
                <li>The outcome of any job application</li>
                <li>The content of third-party websites</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">5. Intellectual Property</h2>
              <p className="text-surface-600 leading-relaxed">
                The JobPilot website, including its design, code, logos, and content, is owned by JobPilot AI and is protected by copyright and other intellectual property laws. You may not copy, modify, distribute, or reverse-engineer any part of the Service without our written consent.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">6. Disclaimer of Warranties</h2>
              <p className="text-surface-600 leading-relaxed">
                JobPilot is provided "as is" and "as available" without warranties of any kind, whether express or implied. We do not warrant that the Service will be uninterrupted, error-free, or that the job listings are accurate or current.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">7. Limitation of Liability</h2>
              <p className="text-surface-600 leading-relaxed">
                To the maximum extent permitted by law, JobPilot AI shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of or inability to use the Service. Our total liability shall not exceed the amount you paid us (which is $0, since the Service is free).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">8. Third-Party Links</h2>
              <p className="text-surface-600 leading-relaxed">
                The Service contains links to third-party websites. We are not responsible for the content, privacy policies, or practices of any third-party website. Use of third-party websites is at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">9. Service Availability</h2>
              <p className="text-surface-600 leading-relaxed">
                We reserve the right to modify, suspend, or discontinue the Service at any time without notice. The Service relies on third-party APIs, and we are not responsible for any changes or outages on those platforms.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">10. Changes to These Terms</h2>
              <p className="text-surface-600 leading-relaxed">
                We may update these Terms from time to time. Continued use of the Service after changes constitutes acceptance of the new Terms. We will post the updated Terms on this page with a revised date.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">11. Governing Law</h2>
              <p className="text-surface-600 leading-relaxed">
                These Terms shall be governed by and construed in accordance with applicable laws, without regard to conflict of law principles.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-surface-900 mb-3">12. Contact</h2>
              <p className="text-surface-600 leading-relaxed">
                If you have any questions about these Terms, please contact us through our website.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
