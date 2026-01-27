# Development Notes

## File Download Implementation (downloadCode function)

### What it does:

Client-side file downloading implementation in the FLUX project. The `downloadCode` function in `Projects.tsx` enables users to download generated HTML code as files.

### Code Breakdown:

1. **Get code content**: Retrieves code from preview component or project's current code
2. **Validation**: Checks if code exists and isn't currently generating
3. **Create downloadable file**: Uses Blob API to create file-like object with HTML content
4. **Trigger download**: Creates temporary anchor element and programmatically clicks it

### Key Web APIs Used:

- **Blob API**: Creates file-like objects from raw data
- **URL.createObjectURL()**: Generates temporary URLs for blob objects
- **HTML Download Attribute**: Forces browser to download rather than navigate

### Learning Resources to Review:

- [Blob API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Blob)
- [URL.createObjectURL() - MDN](https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL)
- [File API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/File_API)
- [Working with Files in JavaScript - JavaScript.info](https://javascript.info/blob)
- [File Download in React - LogRocket Blog](https://blog.logrocket.com/programmatic-file-downloads-in-the-browser/)

### Use Cases:

- Code editors
- Document generators
- Any app exporting user-created content as downloadable files

---

_Added on January 27, 2026_
