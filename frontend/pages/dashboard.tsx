import { GetServerSideProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores";
import { ButtonCustom } from "@/components";
import styles from "@/styles/Dashboard.module.css";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const token = context.req.cookies.access_token;

    if (!token) {
        return {
            redirect: {
                destination: "/login",
                permanent: false,
            },
        };
    }

    return {
        props: {},
    };
};

export default function DashboardPage() {
    const router = useRouter();
    const { user, logout, isLoading } = useAuthStore();

    const handleLogout = async () => {
        await logout();
        router.push("/login");
    };

    return (
        <>
            <Head>
                <title>Dashboard | Next.js + Laravel</title>
                <meta name="description" content="Your personal dashboard" />
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>
                                Welcome, <span className="gradient-text">{user?.username || "User"}</span>
                            </h1>
                            <p className={styles.subtitle}>Here&apos;s your dashboard overview</p>
                        </div>
                        <ButtonCustom
                            variant="secondary"
                            onClick={handleLogout}
                            loading={isLoading}
                        >
                            Logout
                        </ButtonCustom>
                    </header>

                    <div className={styles.grid}>
                        <div className={`${styles.statCard} card`}>
                            <div className={styles.statIcon}>📊</div>
                            <div className={styles.statValue}>1,234</div>
                            <div className={styles.statLabel}>Total Views</div>
                        </div>

                        <div className={`${styles.statCard} card`}>
                            <div className={styles.statIcon}>👥</div>
                            <div className={styles.statValue}>56</div>
                            <div className={styles.statLabel}>Active Users</div>
                        </div>

                        <div className={`${styles.statCard} card`}>
                            <div className={styles.statIcon}>📈</div>
                            <div className={styles.statValue}>89%</div>
                            <div className={styles.statLabel}>Growth Rate</div>
                        </div>

                        <div className={`${styles.statCard} card`}>
                            <div className={styles.statIcon}>⚡</div>
                            <div className={styles.statValue}>42ms</div>
                            <div className={styles.statLabel}>Avg Response</div>
                        </div>
                    </div>

                    <section className={`${styles.recentActivity} glass`}>
                        <h2 className={styles.sectionTitle}>Recent Activity</h2>
                        <div className={styles.activityList}>
                            {[
                                { action: "User logged in", time: "2 minutes ago", icon: "🔐" },
                                { action: "API request completed", time: "5 minutes ago", icon: "⚡" },
                                { action: "Data synchronized", time: "10 minutes ago", icon: "🔄" },
                                { action: "Report generated", time: "1 hour ago", icon: "📄" },
                            ].map((activity, index) => (
                                <div
                                    key={index}
                                    className={styles.activityItem}
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <span className={styles.activityIcon}>{activity.icon}</span>
                                    <span className={styles.activityAction}>{activity.action}</span>
                                    <span className={styles.activityTime}>{activity.time}</span>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </main>
        </>
    );
}
