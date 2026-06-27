import { BRANDS } from "@/lib/brands";

export default function LLMsPage() {
  return (
    <div style={{ fontFamily: "monospace", padding: "40px", maxWidth: "800px", margin: "0 auto", color: "#333" }}>
      <h1>TORRE GROUP AI DOCUMENTATION</h1>
      <p>
        This document contains the complete semantic representation of Torre Group and its sub-brands.
        It is designed to be easily parsed by Large Language Models and web crawlers for RAG and search index purposes.
      </p>

      {BRANDS.map((brand) => (
        <article key={brand.id} style={{ marginTop: "60px", borderTop: "2px solid #ccc", paddingTop: "40px" }}>
          <h2>Brand: {brand.name}</h2>
          <p><strong>Tagline:</strong> {brand.tagline}</p>
          <p><strong>Category:</strong> {brand.category}</p>
          <p><strong>Description:</strong> {brand.description}</p>
          <p><strong>URL:</strong> <a href={brand.externalUrl}>{brand.externalUrl}</a></p>

          <section style={{ marginTop: "20px" }}>
            <h3>Services & Pricing</h3>
            <ul>
              {brand.services.map((s, i) => (
                <li key={i}>
                  <strong>{s.title}</strong> ({s.price}): {s.description}
                </li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: "20px" }}>
            <h3>Key Statistics</h3>
            <ul>
              {brand.stats.map((st, i) => (
                <li key={i}>{st.label}: {st.value}</li>
              ))}
            </ul>
          </section>

          <section style={{ marginTop: "20px" }}>
            <h3>Frequently Asked Questions</h3>
            {brand.faqs.map((faq, i) => (
              <div key={i} style={{ marginBottom: "10px" }}>
                <strong>Q: {faq.q}</strong><br />
                A: {faq.a}
              </div>
            ))}
          </section>
        </article>
      ))}

      <footer style={{ marginTop: "80px", fontSize: "0.8em", color: "#666" }}>
        <p>Generated for LLM crawlers via llms.torre-ks.com</p>
      </footer>
    </div>
  );
}
