import React, { InputHTMLAttributes, forwardRef } from "react";
import styles from "./TextInput.module.css";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
    ({ label, error, helperText, className, id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div className={styles.wrapper}>
                {label && (
                    <label htmlFor={inputId} className={styles.label}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={`${styles.input} ${error ? styles.error : ""} ${className || ""}`}
                    {...props}
                />
                {error && <span className={styles.errorText}>{error}</span>}
                {helperText && !error && <span className={styles.helperText}>{helperText}</span>}
            </div>
        );
    }
);

TextInput.displayName = "TextInput";

export default TextInput;
