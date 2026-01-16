import React, { ReactNode } from "react";
import styles from "./TableCustom.module.css";

export interface Column<T> {
    key: string;
    title: string;
    width?: string | number;
    align?: "left" | "center" | "right";
    render?: (value: unknown, record: T, index: number) => ReactNode;
}

interface TableCustomProps<T> {
    columns: Column<T>[];
    data: T[];
    loading?: boolean;
    emptyText?: string;
    rowKey?: string | ((record: T) => string);
    onRowClick?: (record: T, index: number) => void;
    className?: string;
}

function TableCustom<T extends Record<string, unknown>>({
    columns,
    data,
    loading = false,
    emptyText = "No data available",
    rowKey = "id",
    onRowClick,
    className,
}: TableCustomProps<T>) {
    const getRowKey = (record: T, index: number): string => {
        if (typeof rowKey === "function") {
            return rowKey(record);
        }
        return String(record[rowKey] ?? index);
    };

    const getCellValue = (record: T, key: string): unknown => {
        return key.split(".").reduce<unknown>((obj, k) => {
            if (obj && typeof obj === "object" && k in obj) {
                return (obj as Record<string, unknown>)[k];
            }
            return undefined;
        }, record);
    };

    return (
        <div className={`${styles.wrapper} ${className || ""}`}>
            <table className={styles.table}>
                <thead className={styles.thead}>
                    <tr>
                        {columns.map((column) => (
                            <th
                                key={column.key}
                                className={styles.th}
                                style={{
                                    width: column.width,
                                    textAlign: column.align || "left",
                                }}
                            >
                                {column.title}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className={styles.tbody}>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.loading}>
                                <div className={styles.spinner} />
                                Loading...
                            </td>
                        </tr>
                    ) : data.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length} className={styles.empty}>
                                {emptyText}
                            </td>
                        </tr>
                    ) : (
                        data.map((record, index) => (
                            <tr
                                key={getRowKey(record, index)}
                                className={`${styles.tr} ${onRowClick ? styles.clickable : ""}`}
                                onClick={() => onRowClick?.(record, index)}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={column.key}
                                        className={styles.td}
                                        style={{ textAlign: column.align || "left" }}
                                    >
                                        {column.render
                                            ? column.render(getCellValue(record, column.key), record, index)
                                            : String(getCellValue(record, column.key) ?? "")}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default TableCustom;
