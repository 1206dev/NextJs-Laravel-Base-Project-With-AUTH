import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useAuthStore } from "@/stores";
import { TextInput, ButtonCustom } from "@/components";
import styles from "@/styles/Login.module.css";

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error, clearError } = useAuthStore();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        clearError();

        try {
            await login({ username, password });
            router.push("/dashboard");
        } catch {
            // Error is handled in store
        }
    };

    return (
        <>
            <Head>
                <title>Login | Next.js + Laravel</title>
                <meta name="description" content="Sign in to your account" />
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <div className={styles.glowOrb} />

                    <div className={`${styles.card} glass`}>
                        <div className={styles.header}>
                            <h1 className={styles.title}>
                                Welcome <span className="gradient-text">Back</span>
                            </h1>
                            <p className={styles.subtitle}>Sign in to continue to your account</p>
                        </div>

                        <form onSubmit={handleSubmit} className={styles.form}>
                            <TextInput
                                label="Username"
                                placeholder="Enter your username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                autoComplete="username"
                            />

                            <TextInput
                                label="Password"
                                type="password"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                autoComplete="current-password"
                            />

                            {error && <div className={styles.error}>{error}</div>}

                            <ButtonCustom
                                type="submit"
                                variant="primary"
                                loading={isLoading}
                                disabled={isLoading}
                            >
                                {isLoading ? "Signing in..." : "Sign In"}
                            </ButtonCustom>
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}
