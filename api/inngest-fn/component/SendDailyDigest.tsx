import * as React from "react";
import {
    Body, Container, Column, Head, Heading, Html,
    Img, Link, Preview, Row, Section, Text,
} from "@react-email/components";
import type { WeatherData } from "../../../src/types.js";


// ── Styles ────────────────────────────────────────────────────────────────────

const body: React.CSSProperties = { margin: 0, padding: 0, background: "#0f0f1a", fontFamily: "Arial, sans-serif" };
const container: React.CSSProperties = { maxWidth: 560, margin: "0 auto", padding: "32px 16px" };
const card: React.CSSProperties = { background: "#1a1a2e", borderRadius: 16, padding: 10, marginBottom: 16 };

const heading: React.CSSProperties = { color: "#a78bfa", fontSize: 22, margin: 0 };
const subtext: React.CSSProperties = { color: "#6b7280", fontSize: 13, margin: "6px 0 0" };
const cityHeading: React.CSSProperties = { color: "#fff", fontSize: 22, margin: 0 };
const conditionText: React.CSSProperties = { color: "#a78bfa", fontSize: 13, margin: "4px 0 0", textTransform: "capitalize" };
const sectionTitle: React.CSSProperties = { color: "#a78bfa", fontSize: 13, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.05em" };

const statLabel: React.CSSProperties = { color: "#6b7280", fontSize: 11, margin: "0 0 4px", textTransform: "uppercase" };
const statValue: React.CSSProperties = { color: "#fff", fontSize: 22, fontWeight: "bold", margin: 0 };
const statSub: React.CSSProperties = { color: "#6b7280", fontSize: 11, margin: "4px 0 0" };

const sunRow: React.CSSProperties = { display: "flex", justifyContent: "space-between", marginTop: 12, padding: "10px 16px", background: "#0f0f1a", borderRadius: 10 };
const sunText: React.CSSProperties = { color: "#aaa", fontSize: 13, margin: 0 };


const ctaButton: React.CSSProperties = {
    display: "inline-block", background: "#7c3aed", color: "#fff",
    textDecoration: "none", padding: "12px 28px", borderRadius: 8,
    fontSize: 14, fontWeight: "bold",
};
const footer: React.CSSProperties = { color: "#374151", fontSize: 11, textAlign: "center", marginTop: 24 };





export function WeatherDigest({ weather }: { weather: WeatherData }) {
    const { location, current, hourly, daily, airQuality, astro } = weather;

    const sunrise = new Date(Number(astro.sunrise) * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit",
    });
    const sunset = new Date(Number(astro.sunset) * 1000).toLocaleTimeString("en-IN", {
        hour: "2-digit", minute: "2-digit",
    });

    const previewText = `Today's weather in ${location.city} — ${current.temp}°C, ${current.weather}`;

    return (
        <Html>
            <Head />
            <Preview>{previewText}</Preview>
            <Body style={body}>
                <Container style={container}>

                    {/* Header */}
                    <Section style={{ textAlign: "center", marginBottom: 24 }}>
                        <Link href={`${process.env.APP_URL}`} style={{ textDecoration: "none" }}>
                        <Img
                            src={`${process.env.APP_URL}/logo.svg`}
                            width={64}
                            height={64}
                            alt="WeatherBoard Logo"
                            style={{ borderRadius: "16px", margin: "0 auto 16px" }}
                        />
                        <Heading style={heading}>🌤️ WeatherBoard</Heading>
                        </Link>
                        <Text style={subtext}>Your daily weather digest</Text>
                    </Section>

                    {/* Current weather card */}
                    <Section style={card}>
                        <Row style={{ marginBottom: 20 }}>
                            <Column style={{ width: 72 }}>
                                <Img
                                    src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
                                    width={64} height={64} alt={current.weather}
                                />
                            </Column>
                            <Column>
                                <Heading as="h2" style={cityHeading}>
                                    {location.city}, {location.country}
                                </Heading>
                                <Text style={conditionText}>{current.weather}</Text>
                            </Column>
                        </Row>

                        {/* Stats row */}
                        <Row>
                            {[
                                { label: "TEMP", value: `${current.temp}°C`, sub: `Feels: ${Math.round(current.feels_like)}°C` },
                                { label: "HUMIDITY", value: `${current.humidity}%`, sub: `Wind: ${Math.round(current.wind_speed * 3.6)} km/h` },
                                { label: "AIR QUALITY", value: airQuality.level, sub: `PM2.5: ${airQuality.pm2_5.toFixed(1)}` },
                            ].map(({ label, value, sub }) => (
                                <Column
                                    key={label}
                                    style={{
                                        width: "33.33%",
                                        padding: "0 6px",
                                        background: "#0f0f1a", borderRadius: 10, textAlign: "center"
                                    }}
                                >
                                    <Text style={statLabel}>{label}</Text>
                                    <Text style={statValue}>{value}</Text>
                                    <Text style={statSub}>{sub}</Text>
                                </Column>
                            ))}
                        </Row>

                        {/* Sunrise / sunset */}
                        <Section style={sunRow}>
                            <Text style={sunText}>🌅 Sunrise: <strong style={{ color: "#fff" }}>{sunrise}</strong></Text>
                            <Text style={sunText}>🌇 Sunset: <strong style={{ color: "#fff" }}>{sunset}</strong></Text>
                        </Section>
                    </Section>

                    {/* Hourly forecast */}
                    <Section style={card}>
                        <Text style={sectionTitle}>NEXT FEW HOURS</Text>
                        {hourly.map((item, i) => (
                            <Row key={i} style={{ borderBottom: "1px solid #2a2a3a", padding: "6px 0" }}>
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13 }}>
                                        {item.time.split(" ")[1].slice(0, 5)}
                                    </Text>
                                </Column>
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: "bold" }}>
                                        {`${item.temp}°C`}
                                    </Text>
                                </Column>
                                <Column style={{ width: "40%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13, textTransform: "capitalize" }}>
                                        {item.weather}
                                    </Text>
                                </Column>
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13 }}>
                                        {`${Math.round(item.wind_speed * 3.6)} km/h`}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* 5-day forecast */}
                    <Section style={{ ...card, marginBottom: 24 }}>
                        <Text style={sectionTitle}>5-DAY FORECAST</Text>

                        {daily.map((item, i) => (
                            <Row
                                key={i}
                                style={{
                                    borderBottom: "1px solid #2a2a3a",
                                    padding: "8px 0",
                                }}
                            >
                                <Column style={{ width: "25%" }}>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 12,
                                            margin: 0,
                                        }}
                                    >
                                        {item.date}
                                    </Text>
                                </Column>

                                <Column style={{ width: "15%" }}>
                                    <Img
                                        src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                                        width={30}
                                        height={30}
                                        alt={item.weather}
                                    />
                                </Column>

                                <Column style={{ width: "25%" }}>
                                    <Text
                                        style={{
                                            color: "#fff",
                                            fontSize: 13,
                                            fontWeight: "bold",
                                            margin: 0,
                                        }}
                                    >
                                        {item.max_temp}° / {item.min_temp}°
                                    </Text>
                                </Column>

                                <Column style={{ width: "35%" }}>
                                    <Text
                                        style={{
                                            color: "#6b7280",
                                            fontSize: 12,
                                            margin: 0,
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {item.weather}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* CTA */}
                    <Section style={{ textAlign: "center" }}>
                        <Link
                            href="https://weather-board-js.vercel.app/"
                            style={ctaButton}
                        >
                            View Full Dashboard →
                        </Link>
                    </Section>

                    <Text style={footer}>
                        You're receiving this because you subscribed to WeatherBoard.
                    </Text>

                    <Text style={{ ...footer, marginTop: 8 }}>
                        <Link
                            href="__UNSUBSCRIBE_URL__"
                            style={{
                                color: "#6b7280",
                                textDecoration: "underline",
                            }}
                        >
                            Unsubscribe
                        </Link>
                    </Text>

                </Container>
            </Body>
        </Html>
    );
}

