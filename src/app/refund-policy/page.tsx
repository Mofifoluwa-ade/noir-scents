import type { Metadata } from 'next';
import Link from 'next/link';
import { STORE_CONFIG } from '@/lib/constants';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  RotateCcw, 
  Mail, 
  MessageSquare, 
  HelpCircle,
  FileText,
  AlertCircle
} from 'lucide-react';
import styles from './RefundPolicy.module.css';

export const metadata: Metadata = {
  title: 'Refund Policy & Guarantee | Noir Scents',
  description: 'Read the official Noir Scents Refund and Return Policy. Discover our try-before-you-open sample guarantee and hassle-free returns.',
};

export default function RefundPolicyPage() {
  const whatsappUrl = `https://wa.me/${STORE_CONFIG.whatsappNumber}?text=${encodeURIComponent(
    "Hello, I have a question regarding a return or refund for my order."
  )}`;

  return (
    <main>
      {/* Hero Header */}
      <section className={styles.hero}>
        <span className={styles.heroTag}>Customer Satisfaction Assurance</span>
        <h1 className={styles.heroTitle}>Refund & Return Policy</h1>
        <div className={styles.goldDivider}></div>
        <p className={styles.heroSubtitle}>
          We stand behind the perfection of every extrait de parfum we compound. Explore our transparent return standards and try-before-you-open guarantee.
        </p>
      </section>

      {/* Main Content */}
      <section className={styles.policySection}>
        <div className="container">
          <div className={styles.policyContainer}>
            
            {/* Guarantee Highlight Callout */}
            <div className={styles.guaranteeBanner}>
              <div className={styles.guaranteeIcon}>
                <ShieldCheck size={36} />
              </div>
              <div>
                <h2 className={styles.guaranteeTitle}>The Noir Sample Guarantee</h2>
                <p className={styles.guaranteeText}>
                  Every full-size Noir Scents bottle (50ml, 100ml, 200ml) includes a complimentary 2ml sample vial of the exact same fragrance. 
                  We invite you to test the sample vial on your skin first. If the scent does not perfectly match your chemistry or expectation, 
                  simply return the unopened, sealed full-size bottle within 14 days for a 100% full refund—no questions asked.
                </p>
              </div>
            </div>

            {/* Document Content Card */}
            <div className={styles.documentCard}>
              
              {/* Table of Contents */}
              <div className={styles.toc}>
                <h3 className={styles.tocTitle}>Document Outline</h3>
                <ul className={styles.tocList}>
                  <li className={styles.tocItem}>
                    <a href="#overview">01. Policy Overview</a>
                  </li>
                  <li className={styles.tocItem}>
                    <a href="#eligibility">02. Return Eligibility Criteria</a>
                  </li>
                  <li className={styles.tocItem}>
                    <a href="#process">03. Step-by-Step Return Process</a>
                  </li>
                  <li className={styles.tocItem}>
                    <a href="#timeline">04. Refund Processing & Timelines</a>
                  </li>
                  <li className={styles.tocItem}>
                    <a href="#contact">05. Contact Concierge</a>
                  </li>
                </ul>
              </div>

              {/* Section 1: Overview */}
              <section id="overview" className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>01</div>
                  <h2 className={styles.sectionTitle}>Overview</h2>
                </div>
                <p className={styles.paragraph}>
                  At Noir Scents, we are committed to providing an exceptional luxury fragrance experience. 
                  Because scent is an intimately personal journey, our return policy is designed to protect your investment 
                  and ensure you are entirely delighted with your signature perfume.
                </p>
                <p className={styles.paragraph}>
                  This policy outlines the conditions under which returns, exchanges, and refunds are processed for orders placed 
                  directly through our official website or at our flagship boutique in Owerri, Imo State, Nigeria.
                </p>
              </section>

              {/* Section 2: Eligibility */}
              <section id="eligibility" className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>02</div>
                  <h2 className={styles.sectionTitle}>Eligibility Criteria</h2>
                </div>
                <p className={styles.paragraph}>
                  To qualify for a return and full refund or exchange, the following requirements must be satisfied:
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <CheckCircle2 size={18} className={styles.bulletIcon} />
                    <span><strong>Return Window:</strong> The return request must be submitted within 14 calendar days from the date of package delivery.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <CheckCircle2 size={18} className={styles.bulletIcon} />
                    <span><strong>Unopened Main Bottle:</strong> The full-sized fragrance bottle must remain sealed in its original cellophane wrapper with all security seals intact.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <CheckCircle2 size={18} className={styles.bulletIcon} />
                    <span><strong>Complimentary Sample Retention:</strong> You may keep the complimentary 2ml sample vial even if you return the full-sized bottle.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <CheckCircle2 size={18} className={styles.bulletIcon} />
                    <span><strong>Original Packaging & Receipt:</strong> Items must be returned in their original luxury box with proof of purchase (Order Number or Receipt).</span>
                  </li>
                </ul>
                <div className="error-text" style={{ fontSize: '0.875rem', backgroundColor: '#fff5f5', padding: '0.75rem 1rem', borderRadius: '0.5rem', borderLeft: '3px solid var(--color-danger)' }}>
                  <AlertCircle size={16} style={{ display: 'inline', marginRight: 6 }} />
                  <strong>Non-Returnable Items:</strong> Unsealed/opened main fragrance bottles, custom engraved bottles, discovery sets, or products purchased from unauthorized third-party resellers are non-refundable.
                </div>
              </section>

              {/* Section 3: Process */}
              <section id="process" className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>03</div>
                  <h2 className={styles.sectionTitle}>Return Process</h2>
                </div>
                <p className={styles.paragraph}>
                  Returning a package is simple and handled directly by our concierge team:
                </p>

                <div className={styles.processGrid}>
                  <div className={styles.processStepCard}>
                    <span className={styles.stepNum}>Step 01</span>
                    <h4 className={styles.stepTitle}>Notify Us</h4>
                    <p className={styles.stepDesc}>Email or WhatsApp our concierge with your Order Number.</p>
                  </div>
                  <div className={styles.processStepCard}>
                    <span className={styles.stepNum}>Step 02</span>
                    <h4 className={styles.stepTitle}>Receive Code</h4>
                    <p className={styles.stepDesc}>Receive a Return Authorization (RMA) Code and address label.</p>
                  </div>
                  <div className={styles.processStepCard}>
                    <span className={styles.stepNum}>Step 03</span>
                    <h4 className={styles.stepTitle}>Ship Package</h4>
                    <p className={styles.stepDesc}>Pack the sealed bottle securely and dispatch via tracked courier.</p>
                  </div>
                  <div className={styles.processStepCard}>
                    <span className={styles.stepNum}>Step 04</span>
                    <h4 className={styles.stepTitle}>Get Refunded</h4>
                    <p className={styles.stepDesc}>Refund is issued within 3-5 days after quality inspection.</p>
                  </div>
                </div>
              </section>

              {/* Section 4: Timeline */}
              <section id="timeline" className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>04</div>
                  <h2 className={styles.sectionTitle}>Refund Timeline & Payment Methods</h2>
                </div>
                <p className={styles.paragraph}>
                  Once your returned package is received at our Owerri atelier, our quality assurance team inspects the security seal. 
                  You will receive an email confirmation upon approval.
                </p>
                <ul className={styles.bulletList}>
                  <li className={styles.bulletItem}>
                    <Clock size={18} className={styles.bulletIcon} />
                    <span><strong>Inspection Duration:</strong> 1 to 2 business days after package arrival.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <Clock size={18} className={styles.bulletIcon} />
                    <span><strong>Processing Time:</strong> 3 to 5 business days for bank account credit or payment gateway refund.</span>
                  </li>
                  <li className={styles.bulletItem}>
                    <Clock size={18} className={styles.bulletIcon} />
                    <span><strong>Refund Currency:</strong> All refunds are issued in Nigerian Naira (₦) to the original bank account or card used for payment.</span>
                  </li>
                </ul>
              </section>

              {/* Section 5: Contact */}
              <section id="contact" className={styles.sectionBlock}>
                <div className={styles.sectionHeader}>
                  <div className={styles.sectionNumber}>05</div>
                  <h2 className={styles.sectionTitle}>Need Assistance?</h2>
                </div>
                <p className={styles.paragraph}>
                  If you have any questions regarding returns, exchanges, damaged deliveries, or order inquiries, our concierge team is available 6 days a week.
                </p>

                <div className={styles.contactBox}>
                  <h3 className={styles.contactBoxTitle}>Contact Noir Scents Concierge</h3>
                  <p className={styles.contactBoxText}>
                    Email: {STORE_CONFIG.email} | Phone: {STORE_CONFIG.phone}
                  </p>
                  <div className={styles.contactButtons}>
                    <Link href="/contact" className="btn btn-dark btn-sm">
                      <Mail size={16} /> Contact Form
                    </Link>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-whatsapp btn-sm"
                    >
                      <MessageSquare size={16} /> WhatsApp Concierge
                    </a>
                  </div>
                </div>
              </section>

            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
