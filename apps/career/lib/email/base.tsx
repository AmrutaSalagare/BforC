import * as React from "react";

interface BaseEmailProps {
  preview: string;
  children: React.ReactNode;
}

const BRAND = "#a84370";
const DARK = "#1a0a12";
const MUTED = "#6b4556";
const BG = "#fff8fb";
const BORDER = "#f0d9e5";

export function BaseEmail({ preview, children }: BaseEmailProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="color-scheme" content="light" />
        <title>{preview}</title>
      </head>
      <body style={styles.body}>
        {/* Preview text (hidden in email body, shown in inbox preview) */}
        <div style={styles.preview}>{preview}</div>

        <table width="100%" cellPadding={0} cellSpacing={0} style={styles.outerTable}>
          <tbody>
            <tr>
              <td align="center" style={{ padding: "40px 16px" }}>
                <table width="100%" cellPadding={0} cellSpacing={0} style={styles.card}>
                  <tbody>
                    {/* Header */}
                    <tr>
                      <td style={styles.header}>
                        <table cellPadding={0} cellSpacing={0}>
                          <tbody>
                            <tr>
                              <td>
                                <span style={styles.logoText}>B</span>
                                <span style={styles.logoTextMuted}>for</span>
                                <span style={styles.logoText}>C</span>
                              </td>
                            </tr>
                            <tr>
                              <td style={styles.tagline}>Empowering Women. Building Careers.</td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {/* Body */}
                    <tr>
                      <td style={styles.content}>{children}</td>
                    </tr>

                    {/* Footer */}
                    <tr>
                      <td style={styles.footer}>
                        <p style={styles.footerText}>
                          © {new Date().getFullYear()} BforC · Empowering Women Across India
                        </p>
                        <p style={styles.footerLinks}>
                          <a href="https://bforc.in" style={styles.footerLink}>Website</a>
                          &nbsp;·&nbsp;
                          <a href="https://bforc.in/careers" style={styles.footerLink}>Careers Portal</a>
                          &nbsp;·&nbsp;
                          <a href="https://bforc.in/legal/privacy" style={styles.footerLink}>Privacy Policy</a>
                        </p>
                        <p style={{ ...styles.footerText, marginTop: "8px", fontSize: "11px" }}>
                          You&apos;re receiving this email because you have an account with BforC Careers.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}

// Reusable components
export function EmailHeading({ children }: { children: React.ReactNode }) {
  return <h1 style={styles.heading}>{children}</h1>;
}

export function EmailParagraph({ children }: { children: React.ReactNode }) {
  return <p style={styles.paragraph}>{children}</p>;
}

export function EmailButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <table cellPadding={0} cellSpacing={0} style={{ margin: "28px 0" }}>
      <tbody>
        <tr>
          <td>
            <a href={href} style={styles.button}>
              {children}
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

export function EmailDivider() {
  return <hr style={styles.divider} />;
}

export function EmailHighlight({ children }: { children: React.ReactNode }) {
  return <div style={styles.highlight}>{children}</div>;
}

export function EmailBadge({ children }: { children: React.ReactNode }) {
  return <span style={styles.badge}>{children}</span>;
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: BG,
    fontFamily: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
    margin: 0,
    padding: 0,
  },
  preview: {
    display: "none",
    maxHeight: 0,
    overflow: "hidden",
    opacity: 0,
    fontSize: "1px",
    color: BG,
  },
  outerTable: {
    backgroundColor: BG,
    maxWidth: "600px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    border: `1px solid ${BORDER}`,
    maxWidth: "560px",
    width: "100%",
    boxShadow: "0 4px 24px rgba(168, 67, 112, 0.08)",
  },
  header: {
    backgroundColor: BRAND,
    borderRadius: "16px 16px 0 0",
    padding: "32px 40px",
    textAlign: "center" as const,
  },
  logoText: {
    color: "#ffffff",
    fontSize: "28px",
    fontWeight: 700,
    letterSpacing: "-0.5px",
    fontFamily: "Georgia, serif",
  },
  logoTextMuted: {
    color: "rgba(255,255,255,0.7)",
    fontSize: "22px",
    fontWeight: 400,
    fontFamily: "Georgia, serif",
  },
  tagline: {
    color: "rgba(255,255,255,0.8)",
    fontSize: "12px",
    letterSpacing: "1.5px",
    textTransform: "uppercase" as const,
    textAlign: "center" as const,
    marginTop: "4px",
  },
  content: {
    padding: "40px",
  },
  heading: {
    color: DARK,
    fontSize: "24px",
    fontWeight: 700,
    margin: "0 0 16px",
    lineHeight: 1.3,
  },
  paragraph: {
    color: MUTED,
    fontSize: "15px",
    lineHeight: 1.7,
    margin: "0 0 16px",
  },
  button: {
    backgroundColor: BRAND,
    color: "#ffffff",
    display: "inline-block",
    fontSize: "15px",
    fontWeight: 600,
    padding: "14px 32px",
    borderRadius: "8px",
    textDecoration: "none",
    letterSpacing: "0.2px",
  },
  divider: {
    border: "none",
    borderTop: `1px solid ${BORDER}`,
    margin: "28px 0",
  },
  highlight: {
    backgroundColor: "#fff0f6",
    border: `1px solid ${BORDER}`,
    borderLeft: `4px solid ${BRAND}`,
    borderRadius: "8px",
    padding: "16px 20px",
    margin: "20px 0",
  },
  badge: {
    backgroundColor: "#fce8f1",
    color: BRAND,
    fontSize: "12px",
    fontWeight: 600,
    padding: "4px 10px",
    borderRadius: "100px",
    letterSpacing: "0.3px",
  },
  footer: {
    backgroundColor: "#fdf4f8",
    borderRadius: "0 0 16px 16px",
    borderTop: `1px solid ${BORDER}`,
    padding: "24px 40px",
    textAlign: "center" as const,
  },
  footerText: {
    color: "#9e7086",
    fontSize: "12px",
    margin: "0 0 6px",
  },
  footerLinks: {
    margin: "8px 0 0",
  },
  footerLink: {
    color: BRAND,
    fontSize: "12px",
    textDecoration: "none",
  },
};
