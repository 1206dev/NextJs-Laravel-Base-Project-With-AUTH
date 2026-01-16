import React, { useState, useRef, useEffect, InputHTMLAttributes } from "react";
import styles from "./Datepicker.module.css";

interface DatepickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "value" | "onChange"> {
    label?: string;
    error?: string;
    value?: Date | null;
    onChange?: (date: Date | null) => void;
    dateFormat?: string;
    placeholder?: string;
}

const MONTHS = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];

const DAYS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const Datepicker: React.FC<DatepickerProps> = ({
    label,
    error,
    value,
    onChange,
    placeholder = "Select date",
    className,
    id,
    disabled,
    ...props
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentMonth, setCurrentMonth] = useState(value?.getMonth() || new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(value?.getFullYear() || new Date().getFullYear());
    const containerRef = useRef<HTMLDivElement>(null);
    const inputId = id || `datepicker-${Math.random().toString(36).substr(2, 9)}`;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const getDaysInMonth = (month: number, year: number) => {
        return new Date(year, month + 1, 0).getDate();
    };

    const getFirstDayOfMonth = (month: number, year: number) => {
        return new Date(year, month, 1).getDay();
    };

    const formatDate = (date: Date) => {
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleDateClick = (day: number) => {
        const newDate = new Date(currentYear, currentMonth, day);
        onChange?.(newDate);
        setIsOpen(false);
    };

    const handlePrevMonth = () => {
        if (currentMonth === 0) {
            setCurrentMonth(11);
            setCurrentYear(currentYear - 1);
        } else {
            setCurrentMonth(currentMonth - 1);
        }
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) {
            setCurrentMonth(0);
            setCurrentYear(currentYear + 1);
        } else {
            setCurrentMonth(currentMonth + 1);
        }
    };

    const renderCalendar = () => {
        const daysInMonth = getDaysInMonth(currentMonth, currentYear);
        const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className={styles.emptyDay} />);
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const isSelected = value &&
                value.getDate() === day &&
                value.getMonth() === currentMonth &&
                value.getFullYear() === currentYear;

            const isToday = new Date().getDate() === day &&
                new Date().getMonth() === currentMonth &&
                new Date().getFullYear() === currentYear;

            days.push(
                <button
                    key={day}
                    type="button"
                    className={`${styles.day} ${isSelected ? styles.selected : ""} ${isToday ? styles.today : ""}`}
                    onClick={() => handleDateClick(day)}
                >
                    {day}
                </button>
            );
        }

        return days;
    };

    return (
        <div ref={containerRef} className={`${styles.wrapper} ${className || ""}`}>
            {label && <label htmlFor={inputId} className={styles.label}>{label}</label>}
            <div className={styles.inputWrapper}>
                <input
                    id={inputId}
                    type="text"
                    className={`${styles.input} ${error ? styles.error : ""}`}
                    value={value ? formatDate(value) : ""}
                    placeholder={placeholder}
                    onClick={() => !disabled && setIsOpen(true)}
                    readOnly
                    disabled={disabled}
                    {...props}
                />
                <span className={styles.icon}>📅</span>
            </div>
            {error && <span className={styles.errorText}>{error}</span>}

            {isOpen && (
                <div className={styles.calendar}>
                    <div className={styles.header}>
                        <button type="button" className={styles.navBtn} onClick={handlePrevMonth}>‹</button>
                        <span className={styles.monthYear}>
                            {MONTHS[currentMonth]} {currentYear}
                        </span>
                        <button type="button" className={styles.navBtn} onClick={handleNextMonth}>›</button>
                    </div>
                    <div className={styles.weekdays}>
                        {DAYS.map((day) => (
                            <div key={day} className={styles.weekday}>{day}</div>
                        ))}
                    </div>
                    <div className={styles.days}>
                        {renderCalendar()}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Datepicker;
