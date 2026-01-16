import Head from "next/head";
import Link from "next/link";
import styles from "@/styles/Home.module.css";

export default function Home() {
    return (
        <>
            <Head>
                <title>Next.js + Laravel Boilerplate</title>
                <meta name="description" content="A modern fullstack boilerplate with Next.js 15 and Laravel 11" />
                <meta name="keywords" content="Next.js, Laravel, React, TypeScript, Fullstack" />
            </Head>

            <main className={styles.main}>
                <div className={styles.hero}>
                    <div className={styles.glowOrb} />
                    <div className={styles.glowOrb2} />

                    <h1 className={styles.title}>
                        <span className="gradient-text">Next.js + Laravel</span>
                        <br />
                        Fullstack Boilerplate
                    </h1>

                    <p className={styles.description}>
                        A modern, production-ready boilerplate featuring Next.js 15 with Server-Side Rendering
                        and Laravel 11 API backend. Built for performance, SEO, and developer experience.
                    </p>

                    <div className={styles.cta}>
                        <Link href="/login" className="btn btn-primary">
                            Get Started
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                        </Link>
                        <Link href="/samples" className="btn btn-secondary">
                            View Samples
                        </Link>
                    </div>
                </div>

                <section className={styles.features}>
                    <div className={`${styles.featureCard} card animate-slideUp`} style={{ animationDelay: "0.1s" }}>
                        <div className={styles.featureIcon}>⚡</div>
                        <h3>Server-Side Rendering</h3>
                        <p>Optimized for SEO with Next.js Pages Router and getServerSideProps</p>
                    </div>

                    <div className={`${styles.featureCard} card animate-slideUp`} style={{ animationDelay: "0.2s" }}>
                        <div className={styles.featureIcon}>🔐</div>
                        <h3>Authentication Ready</h3>
                        <p>Secure JWT authentication with Laravel Sanctum and automatic token refresh</p>
                    </div>

                    <div className={`${styles.featureCard} card animate-slideUp`} style={{ animationDelay: "0.3s" }}>
                        <div className={styles.featureIcon}>🎨</div>
                        <h3>Modern UI</h3>
                        <p>Beautiful dark mode design with glassmorphism, smooth animations and transitions</p>
                    </div>

                    <div className={`${styles.featureCard} card animate-slideUp`} style={{ animationDelay: "0.4s" }}>
                        <div className={styles.featureIcon}>📦</div>
                        <h3>TypeScript</h3>
                        <p>Full TypeScript support with strict type checking for a better developer experience</p>
                    </div>
                </section>

                <footer className={styles.footer}>
                    <p>Built with ❤️ using Next.js 15 and Laravel 11</p>
                </footer>
            </main>
        </>
    );
}
