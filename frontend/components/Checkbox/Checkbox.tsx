import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./Checkbox.module.css";

interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
    label?: string;
    error?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const inputId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={`${styles.wrapper} ${className || ""}`}>
                <label className={styles.container} htmlFor={inputId}>
                    <input
                        ref={ref}
                        type="checkbox"
                        id={inputId}
                        className={styles.input}
                        {...props}
                    />
                    <span className={styles.checkmark} />
                    {label && <span className={styles.label}>{label}</span>}
                </label>
                {error && <span className={styles.errorText}>{error}</span>}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;
