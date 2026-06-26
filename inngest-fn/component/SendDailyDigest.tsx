import * as React from "react";
import {
    Body, Container, Column, Head, Heading, Html,
    Img, Link, Preview, Row, Section, Text,
} from "@react-email/components";
import type { WeatherData } from "../../src/types.js";
import { formatTime } from "../lib/formatTime.js";


// ── Dark theme (default) ──────────────────────────────────────────────────────

const body: React.CSSProperties = {
    margin: 0,
    padding: 0,
    background: "#0f0f1a",
    fontFamily: "Arial, sans-serif",
};
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


// ── Light theme overrides (via @media prefers-color-scheme: light) ────────────
//
// Most modern email clients that support dark mode also honour this media query:
//   Apple Mail, iOS Mail 13+, macOS Mail, Outlook for Mac, Samsung Mail.
// Gmail (web/Android) and Outlook (Windows) do NOT support it reliably, so we
// keep dark colours as the safe default in the inline styles above, and layer
// light values on top for clients that can apply them.
//
// We add a `data-id` attribute to each element we want to target, then write
// matching CSS selectors in the <Head> <style> block below.
// ─────────────────────────────────────────────────────────────────────────────

const lightModeStyles = `
  @media (prefers-color-scheme: light) {
    /* Page background */
    .wb-body   { background-color: #f3f4f6 !important; }

    /* Cards */
    .wb-card   { background-color: #ffffff !important; }

    /* Headings / text */
    .wb-heading       { color: #7c3aed !important; }
    .wb-subtext       { color: #6b7280 !important; }
    .wb-city-heading  { color: #111827 !important; }
    .wb-condition     { color: #7c3aed !important; }
    .wb-section-title { color: #7c3aed !important; }

    /* Stat cells */
    .wb-stat-cell  { background-color: #f9fafb !important; }
    .wb-stat-label { color: #9ca3af !important; }
    .wb-stat-value { color: #111827 !important; }
    .wb-stat-sub   { color: #9ca3af !important; }

    /* Sunrise / sunset bar */
    .wb-sun-row  { background-color: #f9fafb !important; }
    .wb-sun-text { color: #6b7280 !important; }

    /* Hourly & daily rows */
    .wb-row-time    { color: #6b7280 !important; }
    .wb-row-temp    { color: #111827 !important; }
    .wb-row-weather { color: #6b7280 !important; }
    .wb-row-wind    { color: #9ca3af !important; }
    .wb-row-date    { color: #111827 !important; }
    .wb-divider     { border-bottom-color: #e5e7eb !important; }

    /* Footer */
    .wb-footer      { color: #9ca3af !important; }
    .wb-unsub-link  { color: #9ca3af !important; }

    /* Logo: hide dark logo, show light logo */
    .wb-logo-dark  { display: none   !important; max-height: 0 !important; overflow: hidden !important; }
    .wb-logo-light { display: block  !important; max-height: 64px !important; }
  }

  /* Default (dark): hide light logo */
  .wb-logo-light { display: none; max-height: 0; overflow: hidden; }
  .wb-logo-dark  { display: block; }
`;


export function WeatherDigest({ weather }: { weather: WeatherData }) {
    const { location, current, hourly, daily, airQuality, astro } = weather;

    const sunrise = formatTime(astro.sunrise, location.timezone);
    const sunset  = formatTime(astro.sunset,  location.timezone);

    const previewText = `Today's weather in ${location.city} — ${current.temp}°C, ${current.weather}`;

    return (
        <Html>
            <Head>
                {/* Inline <style> is the only reliable way to ship media-query CSS in email */}
                <style dangerouslySetInnerHTML={{ __html: lightModeStyles }} />
            </Head>
            <Preview>{previewText}</Preview>

            {/* data-id props give us CSS hooks without relying on generated class names */}
            <Body style={body} className="wb-body">
                <Container style={container}>

                    {/* ── Header ─────────────────────────────────────────── */}
                    <Section style={{ textAlign: "center", marginBottom: 24 }}>
                        <Link href={`${process.env.APP_URL}`} style={{ textDecoration: "none" }}>

                            {/*
                              * Two logo variants. CSS toggles visibility based on color scheme.
                              * Use separate SVG files:
                              *   logo.svg       — white/light text, for dark backgrounds  (dark mode default)
                              *   logo-light.svg — dark/coloured text, for light backgrounds
                              *
                              * Both must live at APP_URL and be publicly accessible so email
                              * clients can fetch them.
                              */}
                            <Img
                                src={`${process.env.APP_URL}/logo-dark.svg`}
                                width={64} height={64}
                                alt="WeatherBoard Logo"
                                className="wb-logo-dark"
                                style={{ borderRadius: "16px", margin: "0 auto 16px" }}
                            />
                            <Img
                                src={`${process.env.APP_URL}/logo.svg`}
                                width={64} height={64}
                                alt="WeatherBoard Logo"
                                className="wb-logo-light"
                                style={{ borderRadius: "16px", margin: "0 auto 16px" }}
                            />

                            <Heading style={heading} className="wb-heading">
                                🌤️ WeatherBoard
                            </Heading>
                        </Link>
                        <Text style={subtext} className="wb-subtext">Your daily weather digest</Text>
                    </Section>

                    {/* ── Current weather card ────────────────────────────── */}
                    <Section style={card} className="wb-card">
                        <Row style={{ marginBottom: 20 }}>
                            <Column style={{ width: 72 }}>
                                <Img
                                    src={`https://openweathermap.org/img/wn/${current.icon}@2x.png`}
                                    width={64} height={64} alt={current.weather}
                                />
                            </Column>
                            <Column>
                                <Heading as="h2" style={cityHeading} className="wb-city-heading">
                                    {location.city}, {location.country}
                                </Heading>
                                <Text style={conditionText} className="wb-condition">
                                    {current.weather}
                                </Text>
                            </Column>
                        </Row>

                        {/* Stats row */}
                        <Row>
                            {[
                                { label: "TEMP",        value: `${current.temp}°C`,    sub: `Feels: ${Math.round(current.feels_like)}°C` },
                                { label: "HUMIDITY",    value: `${current.humidity}%`, sub: `Wind: ${Math.round(current.wind_speed * 3.6)} km/h` },
                                { label: "AIR QUALITY", value: airQuality.level,       sub: `PM2.5: ${airQuality.pm2_5.toFixed(1)}` },
                            ].map(({ label, value, sub }) => (
                                <Column
                                    key={label}
                                    className="wb-stat-cell"
                                    style={{
                                        width: "33.33%",
                                        padding: "0 6px",
                                        background: "#0f0f1a",
                                        borderRadius: 10,
                                        textAlign: "center",
                                    }}
                                >
                                    <Text style={statLabel} className="wb-stat-label">{label}</Text>
                                    <Text style={statValue} className="wb-stat-value">{value}</Text>
                                    <Text style={statSub}   className="wb-stat-sub">{sub}</Text>
                                </Column>
                            ))}
                        </Row>

                        {/* Sunrise / sunset */}
                        <Section style={sunRow} className="wb-sun-row">
                            <Text style={sunText} className="wb-sun-text">
                                🌅 Sunrise: <strong style={{ color: "#fff" }}>{sunrise}</strong>
                            </Text>
                            <Text style={sunText} className="wb-sun-text">
                                🌇 Sunset: <strong style={{ color: "#fff" }}>{sunset}</strong>
                            </Text>
                        </Section>
                    </Section>

                    {/* ── Hourly forecast ─────────────────────────────────── */}
                    <Section style={card} className="wb-card">
                        <Text style={sectionTitle} className="wb-section-title">NEXT FEW HOURS</Text>
                        {hourly.map((item, i) => (
                            <Row
                                key={i}
                                className="wb-divider"
                                style={{ borderBottom: "1px solid #2a2a3a", padding: "6px 0" }}
                            >
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13 }} className="wb-row-time">
                                        {item.time.split(" ")[1].slice(0, 5)}
                                    </Text>
                                </Column>
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#fff", fontSize: 13, fontWeight: "bold" }} className="wb-row-temp">
                                        {`${item.temp}°C`}
                                    </Text>
                                </Column>
                                <Column style={{ width: "40%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13, textTransform: "capitalize" }} className="wb-row-weather">
                                        {item.weather}
                                    </Text>
                                </Column>
                                <Column style={{ width: "20%" }}>
                                    <Text style={{ margin: 0, color: "#aaa", fontSize: 13 }} className="wb-row-wind">
                                        {`${Math.round(item.wind_speed * 3.6)} km/h`}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* ── 5-day forecast ──────────────────────────────────── */}
                    <Section style={{ ...card, marginBottom: 24 }} className="wb-card">
                        <Text style={sectionTitle} className="wb-section-title">5-DAY FORECAST</Text>
                        {daily.map((item, i) => (
                            <Row
                                key={i}
                                className="wb-divider"
                                style={{ borderBottom: "1px solid #2a2a3a", padding: "8px 0" }}
                            >
                                <Column style={{ width: "25%" }}>
                                    <Text style={{ color: "#fff", fontSize: 12, margin: 0 }} className="wb-row-date">
                                        {item.date}
                                    </Text>
                                </Column>
                                <Column style={{ width: "15%" }}>
                                    <Img
                                        src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                                        width={30} height={30} alt={item.weather}
                                    />
                                </Column>
                                <Column style={{ width: "25%" }}>
                                    <Text style={{ color: "#fff", fontSize: 13, fontWeight: "bold", margin: 0 }} className="wb-row-temp">
                                        {item.max_temp}° / {item.min_temp}°
                                    </Text>
                                </Column>
                                <Column style={{ width: "35%" }}>
                                    <Text style={{ color: "#6b7280", fontSize: 12, margin: 0, textTransform: "capitalize" }} className="wb-row-weather">
                                        {item.weather}
                                    </Text>
                                </Column>
                            </Row>
                        ))}
                    </Section>

                    {/* ── CTA ─────────────────────────────────────────────── */}
                    <Section style={{ textAlign: "center" }}>
                        <Link href="https://weather-board-js.vercel.app/" style={ctaButton}>
                            View Full Dashboard →
                        </Link>
                    </Section>

                    <Text style={footer} className="wb-footer">
                        You're receiving this because you subscribed to WeatherBoard.
                    </Text>
                    <Text style={{ ...footer, marginTop: 8 }}>
                        <Link
                            href="__UNSUBSCRIBE_URL__"
                            className="wb-unsub-link"
                            style={{ color: "#6b7280", textDecoration: "underline" }}
                        >
                            Unsubscribe
                        </Link>
                    </Text>

                </Container>
            </Body>
        </Html>
    );
}