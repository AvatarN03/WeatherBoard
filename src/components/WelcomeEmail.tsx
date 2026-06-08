import * as React from "react";

import {
    Body, Container, Head, Heading, Html,
    Img, Link, Preview, Row, Column, Section, Text,
} from "@react-email/components";
import type { InngestEvent } from "../types";
import { features } from "../constant";




const main: React.CSSProperties = {
  backgroundColor: "#0f0f1a",
  fontFamily: "Arial, sans-serif",
};

const container: React.CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "40px 16px",
};

const card: React.CSSProperties = {
  background: "#1a1a2e",
  borderRadius: "20px",
  padding: "32px",
  marginBottom: "16px",
  border: "1px solid #2a2a3a",
};

const heading: React.CSSProperties = {
  color: "#a78bfa",
  fontSize: "26px",
  margin: "0",
  letterSpacing: "-0.5px",
};

const subtext: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "6px 0 0",
};

const cardTitle: React.CSSProperties = {
  color: "#fff",
  fontSize: "22px",
  margin: "0 0 8px",
};

const bodyText: React.CSSProperties = {
  color: "#9ca3af",
  fontSize: "15px",
  lineHeight: "1.7",
  margin: "0 0 20px",
};

const sectionLabel: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "0 0 12px",
  textTransform: "uppercase",
  letterSpacing: "0.08em",
};

const featureTitle: React.CSSProperties = {
  color: "#fff",
  fontSize: "14px",
  fontWeight: "bold",
  margin: "0",
};

const featureDesc: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "13px",
  margin: "2px 0 0",
};

const ctaButton: React.CSSProperties = {
  display: "inline-block",
  background: "#7c3aed",
  color: "#fff",
  textDecoration: "none",
  padding: "14px 32px",
  borderRadius: "10px",
  fontSize: "15px",
  fontWeight: "bold",
};

const stat: React.CSSProperties = {
  textAlign: "center",
  padding: "0 8px",
};

const statValue: React.CSSProperties = {
  color: "#a78bfa",
  fontSize: "20px",
  fontWeight: "bold",
  margin: "0",
};

const statLabel: React.CSSProperties = {
  color: "#6b7280",
  fontSize: "12px",
  margin: "4px 0 0",
};

const footer: React.CSSProperties = {
  color: "#374151",
  fontSize: "12px",
  lineHeight: "1.6",
  margin: "0",
};

export function WelcomeEmail({ email, city }: InngestEvent) {
    return (
        <Html>
            <Head />
            <Preview>Welcome to WeatherBoard — Your daily weather digest is set! 🌤️</Preview>
            <Body style={main}>
                <Container style={container}>

                    {/* Header */}
                    <Section style={{ textAlign: "center", marginBottom: "32px" }}>
                        <Img
                            src="https://weather-board-js.vercel.app/logo.svg"
                            width={64}
                            height={64}
                            alt="WeatherBoard Logo"
                            style={{ borderRadius: "16px", margin: "0 auto 16px" }}
                        />
                        <Heading style={heading}>WeatherBoard</Heading>
                        <Text style={subtext}>Real-time weather, delivered to you</Text>
                    </Section>

                    {/* Welcome Card */}
                    <Section style={card}>
                        <Heading as="h2" style={cardTitle}>Welcome aboard! 🎉</Heading>
                        <Text style={bodyText}>
                            You've successfully subscribed to WeatherBoard's daily weather digest.
                            Every morning you'll receive a personalized weather report for{" "}
                            <span style={{ color: "#a78bfa", fontWeight: "bold" }}>{city}</span> — so
                            you're always one step ahead of the weather.
                        </Text>

                        <Section style={{ borderTop: "1px solid #2a2a3a", paddingTop: "20px" }}>
                            <Text style={sectionLabel}>What you'll get every day</Text>
                            {features.map(({ icon, title, desc }) => (
                                <Row key={title} style={{ marginBottom: "8px" }}>
                                    <Column style={{ width: "32px", fontSize: "18px" }}>{icon}</Column>
                                    <Column>
                                        <Text style={featureTitle}>{title}</Text>
                                        <Text style={featureDesc}>{desc}</Text>
                                    </Column>
                                </Row>
                            ))}
                        </Section>
                    </Section>

                    {/* CTA */}
                    <Section style={{ ...card, textAlign: "center" }}>
                        <Text style={bodyText}>
                            Your first digest arrives tomorrow at{" "}
                            <strong style={{ color: "#fff" }}>8:00 AM</strong>. Until then, check
                            the live dashboard for real-time weather in {city}.
                        </Text>
                        <Link href="https://weather-board-js.vercel.app/" style={ctaButton}>
                            Open WeatherBoard →
                        </Link>
                    </Section>

                    {/* Stats Strip */}
                    <Section style={card}>
                        <Row>
                            <Column style={stat}>
                                <Text style={statValue}>Daily</Text>
                                <Text style={statLabel}>Digest frequency</Text>
                            </Column>
                            <Column style={{ ...stat, borderLeft: "1px solid #2a2a3a" }}>
                                <Text style={statValue}>8 AM</Text>
                                <Text style={statLabel}>Delivery time (UTC)</Text>
                            </Column>
                            <Column style={{ ...stat, borderLeft: "1px solid #2a2a3a" }}>
                                <Text style={{ ...statValue, fontSize: "16px" }}>{city}</Text>
                                <Text style={statLabel}>Your city</Text>
                            </Column>
                        </Row>
                    </Section>

                    {/* Footer */}
                    <Section style={{ textAlign: "center" }}>
                        <Text style={footer}>
                            You subscribed with <span style={{ color: "#6b7280" }}>{email}</span>
                            <br />
                            Built with ❤️ using React, TypeScript & OpenWeather API
                            <br />
                            <Link href="https://weather-board-js.vercel.app/" style={{ color: "#7c3aed" }}>
                                weather-board-js.vercel.app
                            </Link>
                            <br />
                            <Link
                                href={`https://weather-board-js.vercel.app/unsubscribe?email=${encodeURIComponent(email)}`}
                                style={{ color: "#6b7280", fontSize: "11px" }}
                            >
                                Unsubscribe
                            </Link>
                        </Text>
                    </Section>

                </Container>
            </Body>
        </Html>
    );
}



