export function encodeConfig(config) {
  try {
    const json = JSON.stringify(config);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    const encoded = base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    console.log(`📊 Encoded config length: ${encoded.length} chars`);
    if (encoded.length > 2000) {
      console.warn("⚠️ Encoded config is very long. Share links may fail on some platforms.");
    }
    return encoded;
  } catch (error) {
    console.error("Failed to encode config", error);
    return "";
  }
}

export function decodeConfig(encoded) {
  try {
    if (!encoded) return null;
    const padded = encoded.padEnd(encoded.length + (4 - (encoded.length % 4)) % 4, "=");
    const base64 = padded.replace(/-/g, "+").replace(/_/g, "/");
    const json = decodeURIComponent(escape(atob(base64)));
    const config = JSON.parse(json);
    console.log("✅ Successfully decoded config from URL");
    return config;
  } catch (error) {
    console.error("Failed to decode config:", error, "Encoded value:", encoded);
    return null;
  }
}
