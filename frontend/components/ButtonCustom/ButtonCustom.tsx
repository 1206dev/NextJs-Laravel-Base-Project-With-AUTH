import React, { ButtonHTMLAttributes, forwardRef, ReactNode } from "react";
import styles from "./ButtonCustom.module.css";

type ButtonVariant = "primary" | "secondary" | "danger" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonCustomProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    loading?: boolean;
    icon?: ReactNode;
    iconPosition?: "left" | "right";
}

const ButtonCustom = forwardRef<HTMLButtonElement, ButtonCustomProps>(
    (
        {
            children,
            variant = "primary",
            size = "md",
            loading = false,
            icon,
            iconPosition = "left",
            className,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                className={`${styles.button} ${styles[variant]} ${styles[size]} ${className || ""}`}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <>
                        <span className={styles.spinner} />
                        {children}
                    </>
                ) : (
                    <>
                        {icon && iconPosition === "left" && <span className={styles.icon}>{icon}</span>}
                        {children}
                        {icon && iconPosition === "right" && <span className={styles.icon}>{icon}</span>}
                    </>
                )}
            </button>
        );
    }
);

ButtonCustom.displayName = "ButtonCustom";

export default ButtonCustom;
