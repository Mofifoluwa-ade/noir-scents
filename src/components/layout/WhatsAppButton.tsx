'use client'

import { MessageCircle } from 'lucide-react';
import { STORE_CONFIG } from '@/lib/constants';
import styles from './WhatsAppButton.module.css';

// Using inline version of getWhatsAppContactLink to ensure it works even if not yet fully defined
const getWhatsAppContactLink = (phone: string, text: string) => {
  return `https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
};

export default function WhatsAppButton() {
  const whatsappUrl = getWhatsAppContactLink(
    STORE_CONFIG?.whatsappNumber || '1234567890',
    "Hello! I'd like to inquire about Noir Scents products."
  );

  return (
    <a 
      href={whatsappUrl} 
      target="_blank" 
      rel="noopener noreferrer"
      className={styles.button}
      aria-label="Chat on WhatsApp"
    >
      <div className={styles.pulse} />
      <MessageCircle size={28} className={styles.icon} />
    </a>
  );
}
