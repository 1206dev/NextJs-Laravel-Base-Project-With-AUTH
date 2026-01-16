import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Radio.module.css";

interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

const Radio = forwardRef<HTMLInputElement, RadioProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const inputId = id || `radio-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={`${styles.wrapper} ${className || ""}`}>
                <label className={styles.container} htmlFor={inputId}>
                    <input
                        ref={ref}
                        type="radio"
                        id={inputId}
                        className={styles.input}
                        {...props}
                    />
                    <span className={styles.radiomark} />
                    {label && <span className={styles.label}>{label}</span>}
                </label>
                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Radio.displayName = "Radio";

export default Radio;
