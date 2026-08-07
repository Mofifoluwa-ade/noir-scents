'use client';

import React from 'react';
import { Minus, Plus } from 'lucide-react';
import styles from './QuantityStepper.module.css';

interface QuantityStepperProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export default function QuantityStepper({ 
  quantity, 
  onQuantityChange, 
  min = 1, 
  max = 10 
}: QuantityStepperProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className={styles.container}>
      <button 
        type="button" 
        className={styles.button} 
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Decrease quantity"
      >
        <Minus size={16} />
      </button>
      <div className={styles.display}>{quantity}</div>
      <button 
        type="button" 
        className={styles.button} 
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Increase quantity"
      >
        <Plus size={16} />
      </button>
    </div>
  );
}
