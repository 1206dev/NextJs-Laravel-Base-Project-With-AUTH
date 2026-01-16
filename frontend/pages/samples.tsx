import { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { sampleService, Sample, PaginatedResponse } from "@/services";
import { TableCustom, Column, ButtonCustom } from "@/components";
import styles from "@/styles/Samples.module.css";

interface SamplesPageProps {
    initialData: PaginatedResponse<Sample>;
}

export const getServerSideProps: GetServerSideProps<SamplesPageProps> = async () => {
    try {
        const data = await sampleService.getAll({ size: 10, page: 1 });
        return {
            props: {
                initialData: data,
            },
        };
    } catch {
        return {
            props: {
                initialData: {
                    data: [],
                    total_page: 0,
                    number_item: 0,
                    total_item: 0,
                },
            },
        };
    }
};

export default function SamplesPage({ initialData }: SamplesPageProps) {
    const [samples, setSamples] = useState<Sample[]>(initialData.data);
    const [isLoading, setIsLoading] = useState(false);

    const handleRefresh = async () => {
        setIsLoading(true);
        try {
            const response = await sampleService.getAll({ size: 10, page: 1 });
            setSamples(response.data);
        } catch (error) {
            console.error("Failed to fetch samples:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const columns: Column<Sample>[] = [
        {
            key: "id",
            title: "ID",
            width: 80,
            align: "center",
        },
        {
            key: "name",
            title: "Name",
        },
        {
            key: "description",
            title: "Description",
            render: (value) => (value as string) || "-",
        },
        {
            key: "created_at",
            title: "Created At",
            width: 150,
            render: (value) => new Date(value as string).toLocaleDateString(),
        },
    ];

    return (
        <>
            <Head>
                <title>Samples | Next.js + Laravel</title>
                <meta name="description" content="View and manage sample data with server-side rendering" />
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>
                                <span className="gradient-text">Samples</span>
                            </h1>
                            <p className={styles.description}>
                                Server-side rendered data from Laravel API
                            </p>
                        </div>
                        <Link href="/" className="btn btn-secondary">
                            ← Back to Home
                        </Link>
                    </header>

                    <section className={styles.content}>
                        <div className={styles.toolbar}>
                            <ButtonCustom
                                variant="secondary"
                                onClick={handleRefresh}
                                loading={isLoading}
                            >
                                Refresh Data
                            </ButtonCustom>
                        </div>

                        <TableCustom<Sample>
                            columns={columns}
                            data={samples}
                            loading={isLoading}
                            emptyText="No samples found. Make sure your Laravel backend is running."
                            rowKey="id"
                        />
                    </section>
                </div>
            </main>
        </>
    );
}
