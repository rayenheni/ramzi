// Importing the sql.js WASM binary via Vite's `?url` suffix. When bundled
// with vite-plugin-singlefile, this asset is inlined as a base64 data: URI
// directly into the single HTML/JS output, so the SQLite engine has no
// external file dependency at runtime (works even if only index.html is
// served).
// eslint-disable-next-line import/no-unresolved
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';

export default wasmUrl;
